import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import '../../../../calendars/LessonCalendar.css';
 import styled from "../../../calendars/LessonCalendar.module.css";
import Navbar from "../../../../components/navbar/Navbar.jsx";
import { auth, db } from "../../../../firebase/firebase.js";
import {FaTrash, FaEdit} from "react-icons/fa"
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";

const localizer = momentLocalizer(moment);
const TeacherClasses = () => {
  const eventCollectionRef = collection(db, "events");

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchStudentEvents = async () => {
      try {
        const teacherID = auth.currentUser.uid; 
        const q = query(eventCollectionRef, where("teacherID", "==", teacherID));
        const querySnapshot = await getDocs(q);
  
        const fetchedEvents = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id, 
            start: data.start.toDate(), 
            end: data.end.toDate(), 
          };
        });
  
        setEvents(fetchedEvents); 
        console.log("Fetched and formatted teacher events:", fetchedEvents);
      } catch (error) {
        console.error("Error fetching teacher events:", error);
      }
    };
  
    fetchStudentEvents(); 
  }, []);
  const removeEvent = async (eventId, eventStartTime) => {
    const currentTime = new Date();
    const timeDifference = new Date(eventStartTime) - currentTime;
  
    if (timeDifference <= 2 * 60 * 60 * 1000) {
      alert("You cannot delete an event less than 2 hours before its start time.");
      return;
    }
      try {
        const eventRef = doc(db, "events", eventId);
        await deleteDoc(eventRef);
        setEvents(events.filter((event) => event.id !== eventId)); 
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    };

  const CustomEvent = ({ event }) => (
    <div>
      <strong>{event.title}</strong>
      <FaTrash className={styled.trashBin} onClick={() => removeEvent(event.id, event.start)} />
    </div>
  );

  return (
    <>
      <Navbar />
      <div className={styled.app}>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
          events={events.map((event) => ({
            ...event,
            start: new Date(event.start), 
            end: new Date(event.end),
          }))}
          selectable={false}
          step={30}
          timeslots={1}
          style={{ height: "100vh" }}
          formats={{
            timeGutterFormat: (date, culture, localizer) =>
              localizer.format(date, "HH:mm", culture),
          }}
          components={{
            event: CustomEvent,
          }}
        />
      </div>
    </>
  );
}

export default TeacherClasses