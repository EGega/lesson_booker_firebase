import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './LessonCalendar.css'
import styled from "./LessonCalendar.module.css";
import { SubmitButton, ExitButton, CancelButton } from "../../components/styled/styledbuttons/buttons.js";
import {FaTrash, FaEdit} from "react-icons/fa"
import Navbar from "../../components/navbar/Navbar.jsx";
import { auth, db } from "../../firebase/firebase.js";
import { collection, getDocs, where, query, addDoc, doc, deleteDoc, } from "firebase/firestore";
import SelectTeacher from "./SelectTeacher.jsx"
import { fetchTeacherName } from "./functions.js";
import { useTeacher } from "../../context/TeacherProvider.jsx";

async function getIdToken() {
const user = auth.currentUser;
if (!user) throw new Error("Not authenticated");
return await user.getIdToken();
}

const localizer = momentLocalizer(moment);

const LessonCalendar = () => {
  // To show only the days from today and on
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  // Collection References

const [calendarKey, setCalendarKey] = useState(0);

const refreshCalendar = () => {
  setCalendarKey((prevKey) => prevKey + 1); 
  // Force refresshing a calendar. 
}
const teacherCollectionRef = collection(db, "teachers")
const eventCollectionRef = collection(db, "events")
const { teacherID } = useTeacher();
console.log(teacherID);


  const [module, setModule] = useState(false);
  const [teacherSelected, setTeacherSelected] = useState(false)
  const [teacherName, setTeacherName] = useState("");
  const [selectedTeacherID, setSelectedTeacherID] = useState("")
  const [teacherEvents, setTeacherEvents] = useState([])
  const [events, setEvents] = useState([]);
  const [slots, setSlots] = useState([]);
  const [stName, setStName] = useState("");
  const [timeSlotInfo, setTimeSlotInfo] = useState();

  // const [selectedEventIndex, setSelectedEventIndex] = useState(null);
 
 const fetchEventsforSelectedTeacher = async () => {
    try {
      const q = query(collection(db, "events"), where("teacherID", "==", selectedTeacherID));
      const data = await getDocs(q);
      const fetchedEvents = data.docs.map((doc) => {
        const eventData = doc.data();
        const isCurrentStudent = eventData.studentID === auth.currentUser.uid;
        return {
          id: doc.id,
          title: isCurrentStudent
          ? `${eventData.studentName} - ${eventData.teacherName}`
          : "This slot is booked",
          start: eventData.start?.toDate(),
          end: eventData.end?.toDate(),
          isCurrentStudent
        };
      });
      setTeacherEvents(fetchedEvents);
      setEvents(fetchedEvents); // Sync both states
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchSlotsForSelectedTeacher = async () => {
    try {
    const slotQuery = query(collection(db, "slots"), where("teacherID", "==", selectedTeacherID))
    const data = await getDocs(slotQuery)
    const fetchedSlots = data.docs.map((doc) => {
      const eventData = doc.data();
      return {
        id: doc.id,
        start: eventData.start?.toDate(),
        end: eventData.end?.toDate(),
      }
    })
    setSlots(fetchedSlots)
    
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  } 

  useEffect(() => {
    if (teacherID) {
      setSelectedTeacherID(teacherID);
      console.log(teacherID);
    }
  }, [teacherID]);

  
useEffect(() => {
  const fetchData = async () => {
    if (selectedTeacherID) {
      try {
        // teacher's name
        const name = await fetchTeacherName(selectedTeacherID);
        setTeacherName(name);

        // teacher's events
        await fetchEventsforSelectedTeacher(selectedTeacherID);
        await fetchSlotsForSelectedTeacher(selectedTeacherID) 
      } catch (error) {
        console.error("Error fetching teacher data or events:", error);
      }
    }
  };

  fetchData();
}, [selectedTeacherID]);

const today = new Date();
today.setHours(0, 0, 0, 0); // Start of today

const [currentDate, setCurrentDate] = useState(today); 

const handleNavigate = (newDate, view) => {
  if (newDate >= today) {
    setCurrentDate(newDate);
  }
};


  const handleSelectSlot = (slotInfo) => {
    if (slotInfo.start < new Date()) {
      alert("You cannot select a time in the past.");
      return;
    }
    const isAvailable = slots.some(
      (slot) =>
        slot.start.getTime() === slotInfo.start.getTime() &&
        slot.end.getTime() === slotInfo.end.getTime()
    );
    if (!isAvailable) {
      alert("This slot is not available. Please choose an available slot.");
      return;
    }
    setModule(true);
    setTimeSlotInfo(slotInfo);
  };

  const exitHandler = () => {
    setModule(false);
  };
  const slotPropGetter = (date) => {
    const isAvailable = slots.some(
      (slot) =>
        slot.start.getTime() === date.getTime() // Match slot times
    );
  
    if (!isAvailable) {
      return {
        style: {
          backgroundColor: "lightgray",
          pointerEvents: "none", // Disable pointer events
          cursor: "not-allowed",
        },
      };
    }
  
    return {
      style: {
        backgroundColor: "white",
      },
    };
  };
  
  // const submitHandler = async () => {
  //   setModule(false);
  
  //   const newEvent = {
  //     title: ` ${auth?.currentUser.displayName} - ${teacherName} `,
  //     start: timeSlotInfo.start,
  //     end: timeSlotInfo.end,
  //     studentName: auth.currentUser.displayName,
  //     studentID: auth.currentUser.uid,
  //     teacherID: selectedTeacherID,
  //     teacherName,
  //   };
  
  //   try {
  //     const docRef = await addDoc(eventCollectionRef, newEvent);
  //     const createdEvent = { ...newEvent, id: docRef.id,  isCurrentStudent: true };
  //     setEvents((prevEvents) => [...prevEvents, createdEvent]);
  //     refreshCalendar();
  //   } catch (error) {
  //     console.error("Error adding event:", error);
  //   }
  // };

const submitHandler = async () => {
try {
setModule(false);


// Prepare payload
const startISO = timeSlotInfo.start.toISOString();
const endISO = timeSlotInfo.end?.toISOString?.();


const payload = {
start_time: startISO,
end_time: endISO, // optional; backend will compute if missing
topic: `${auth?.currentUser?.displayName} - ${teacherName}`,
duration: 25,
timezone: "UTC", 
teacherID: selectedTeacherID,
teacherName,
studentID: auth.currentUser.uid,
studentName: auth.currentUser.displayName,
};


const idToken = await getIdToken();


const resp = await fetch("http://localhost:4000/create-zoom-meeting", {
method: "POST",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${idToken}`,
},
body: JSON.stringify(payload),
});


if (!resp.ok) {
const err = await resp.json().catch(() => ({}));
throw new Error(err.error || `HTTP ${resp.status}`);
}


const createdEvent = await resp.json();
 

setEvents((prev) => [
...prev,
{
...createdEvent,
 start: new Date(createdEvent.start),
    end: new Date(createdEvent.end),
    isCurrentStudent: true,
},
]);
refreshCalendar();
} catch (error) {
console.error("Error creating event:", error);
alert(error.message || "Failed to book lesson");
}
};


  // const removeEvent = async (eventId, eventStartTime) => {
  //   const currentTime = new Date();
  //   const timeDifference = new Date(eventStartTime) - currentTime;
  
  //   if (timeDifference <= 2 * 60 * 60 * 1000) {
  //     alert("You cannot delete an event less than 2 hours before its start time.");
  //     return;
  //   }
  //   try {
  //     const eventRef = doc(db, "events", eventId);
  //     await deleteDoc(eventRef);
  //     setEvents(events.filter((event) => event.id !== eventId)); 
  //   } catch (error) {
  //     console.error("Error deleting event:", error);
  //   }
  // };


const removeEvent = async (eventId, eventStartTime) => {
  const currentTime = new Date();
  const start = eventStartTime instanceof Date ? eventStartTime : new Date(eventStartTime);
  const timeDifference = start.getTime() - currentTime.getTime();

  if (timeDifference <= 2 * 60 * 60 * 1000) {
    alert("You cannot delete an event less than 2 hours before its start time.");
    return;
  }

  if (!window.confirm("Are you sure you want to delete this lesson? This will also cancel the Zoom meeting.")) {
    return;
  }

  try {
    const idToken = await getIdToken();
    const resp = await fetch(`http://localhost:4000/delete-zoom-meeting/${eventId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${resp.status}`);
    }
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    refreshCalendar();
    alert("Event and Zoom meeting deleted successfully.");
  } catch (error) {
    console.error("Error deleting event:", error);
    alert(error.message || "Failed to delete event");
  }
};


  // const CustomEvent = ({ event }) => { 
  //   return ( 
  //   <div>
  //     <strong>{event.title}</strong>
  //     {event.isCurrentStudent && (
  //       <FaTrash
  //         className={styled.trashBin}
  //         onClick={() => removeEvent(event.id, event.start)}
  //       />
  //     )}
  //   </div>
  // )};
  // // console.log(events);


const CustomEvent = ({ event }) => (
  <div>
    <strong>{event.title}</strong>

    {event.isCurrentStudent && (
      <div>
        {event.start > new Date() && (
          <a href={event.zoomLink} target="_blank" rel="noreferrer">
            Join Zoom
          </a>
        )}
        <FaTrash
          className={styled.trashBin}
          onClick={() => removeEvent(event.id, event.start)}
        />
      </div>
    )}
  </div>
);

  

  return (
    <> 
    <Navbar />
      {module && (
        <div className={styled.module}>
          <SubmitButton onClick={submitHandler}>Book This Lesson</SubmitButton>
          <CancelButton onClick={exitHandler}>Cancel</CancelButton>
          <ExitButton onClick={exitHandler}>X</ExitButton>
        </div>
      )}

      <div className={styled.app}>
        { teacherSelected || teacherID  ? 
 
        <Calendar
          key={calendarKey}
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
          events={events}
          selectable={true}
          onSelectSlot={handleSelectSlot}
          onSelecting={(slot) => false}
          step={30}
          timeslots={1}
          min={todayStart}
          slotPropGetter={slotPropGetter}
          onNavigate={handleNavigate}
          date={currentDate}
          style={{ height: "100vh" }}
          formats={{
            timeGutterFormat: (date, culture, localizer) =>
              localizer.format(date, "HH:mm", culture),
          }}
          components={{
            event: CustomEvent,
          }}
        /> 
        
        : 
        <SelectTeacher   setTeacherSelected={setTeacherSelected}  setSelectedTeacherID={setSelectedTeacherID} setTeacherEvents={setTeacherEvents} /> 
        }
      </div>
    </>
  );
};

export default LessonCalendar;

