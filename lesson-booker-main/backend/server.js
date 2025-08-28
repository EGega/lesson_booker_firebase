import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";
import admin from "firebase-admin";

dotenv.config();


const app = express();
app.use(express.json());
app.use(
cors({
origin: process.env.ALLOWED_ORIGIN?.split(",") || true,
credentials: true,
})
);


// ---------- Firebase Admin ----------
if (!admin.apps.length) {
admin.initializeApp({
credential: admin.credential.cert({
projectId: process.env.FIREBASE_PROJECT_ID,
clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
}),
});
}
const db = admin.firestore();

// ---------- Auth middleware (verify Firebase ID token from frontend) ----------
async function requireFirebaseAuth(req, res, next) {
try {
const authHeader = req.headers.authorization || "";
const idToken = authHeader.startsWith("Bearer ")
? authHeader.substring(7)
: null;
if (!idToken) return res.status(401).json({ error: "Missing ID token" });


const decoded = await admin.auth().verifyIdToken(idToken);
req.user = decoded; // uid, email, etc.
next();
} catch (e) {
console.error("Auth error:", e);
return res.status(401).json({ error: "Invalid ID token" });
}
}

// ---------- Zoom S2S OAuth token ----------
async function getZoomAccessToken() {
const url = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${process.env.ZOOM_ACCOUNT_ID}`;
const basic = Buffer.from(
`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
).toString("base64");


const r = await fetch(url, {
method: "POST",
headers: { Authorization: `Basic ${basic}` },
});
const data = await r.json();
if (!r.ok) {
throw new Error(`Zoom token error: ${r.status} ${data?.reason || r.statusText}`);
}
return data.access_token; // expires in ~3600s
}

// ---------- Helper: create Zoom meeting ----------
async function createZoomMeeting({ topic, start_time, duration = 60, timezone = "UTC" }) {
const accessToken = await getZoomAccessToken();
const resp = await fetch("https://api.zoom.us/v2/users/me/meetings", {
method: "POST",
headers: {
Authorization: `Bearer ${accessToken}`,
"Content-Type": "application/json",
},
body: JSON.stringify({
topic: topic || "Lesson",
type: 2, // scheduled
start_time,
duration,
timezone,
settings: {
join_before_host: false,
waiting_room: true,
approval_type: 2, // no registration
},
}),
});
const data = await resp.json();
if (!resp.ok) {
throw new Error(`Zoom create error: ${resp.status} ${data?.message || resp.statusText}`);
}
return data; // includes join_url, start_url, id, etc.
}

// ---------- Route: book lesson -> create Zoom -> write Firestore ----------
app.post("/create-zoom-meeting", requireFirebaseAuth, async (req, res) => {
try {
const {
start_time, // ISO string from frontend
end_time, // optional ISO; if missing, compute via duration
topic,
duration, // minutes, optional (default 60)
timezone, // optional, default UTC
teacherID,
teacherName,
studentID, // for integrity, we'll cross-check with req.user.uid
studentName,
} = req.body;


if (!start_time || !teacherID || !teacherName || !studentID || !studentName) {
return res.status(400).json({ error: "Missing required fields" });
}


// Ensure caller is the same as studentID
if (req.user?.uid !== studentID) {
return res.status(403).json({ error: "User mismatch" });
}


// 1) Create Zoom meeting
const zoom = await createZoomMeeting({ topic, start_time, duration, timezone });


// 2) Build event doc
const startDate = new Date(start_time);
const endDate = end_time
? new Date(end_time)
: new Date(startDate.getTime() + (duration || 30) * 60 * 1000);


const eventDoc = {
title: `${studentName} - ${teacherName}`,
start: startDate,
end: endDate,
studentName,
studentID,
teacherID,
teacherName,
zoomLink: zoom.join_url, // student link
zoomStartLink: zoom.start_url, // teacher link
zoomMeetingId: zoom.id,
createdAt: admin.firestore.FieldValue.serverTimestamp(),
};


const ref = await db.collection("events").add(eventDoc);


return res.json({ id: ref.id, ...eventDoc });
} catch (err) {
console.error(err);
return res.status(500).json({ error: err.message || "Failed to create meeting" });
}
});

async function deleteZoomMeeting(meetingId) {
  const accessToken = await getZoomAccessToken();
  const resp = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  
  if (!resp.ok) {
    const errorData = await resp.json().catch(() => ({}));
    throw new Error(`Zoom delete error: ${resp.status} ${errorData?.message || resp.statusText}`);
  }
  
  return true; // Successfully deleted
}

app.delete("/delete-zoom-meeting/:eventId", requireFirebaseAuth, async (req, res) => {
  try {
    const { eventId } = req.params;
    
    if (!eventId) {
      return res.status(400).json({ error: "Event ID is required" });
    }

    const eventDoc = await db.collection("events").doc(eventId).get();
    
    if (!eventDoc.exists) {
      return res.status(404).json({ error: "Event not found" });
    }

    const eventData = eventDoc.data();
    
 
    if (req.user?.uid !== eventData.studentID) {
      return res.status(403).json({ error: "Not authorized to delete this event" });
    }


    const eventStartTime = eventData.start.toDate();
    const currentTime = new Date();
    const timeDifference = eventStartTime - currentTime;
    
    if (timeDifference <= 2 * 60 * 60 * 1000) {
      return res.status(400).json({ error: "Cannot delete event less than 2 hours before start time" });
    }

    if (eventData.zoomMeetingId) {
      try {
        await deleteZoomMeeting(eventData.zoomMeetingId);
        console.log(`Zoom meeting ${eventData.zoomMeetingId} deleted successfully`);
      } catch (zoomError) {
        console.error("Failed to delete Zoom meeting:", zoomError);
      }
    }

    // 5) Delete from Firestore
    await db.collection("events").doc(eventId).delete();

    return res.json({ success: true, message: "Event and Zoom meeting deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ error: err.message || "Failed to delete meeting" });
  }
});


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend listening on :${port}`));

