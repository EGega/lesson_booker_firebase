import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../../../../calendars/LessonCalendar.css';
import styled from "../../../../calendars/LessonCalendar.module.css";
import Navbar from "../../../../../components/navbar/Navbar.jsx";
import { auth, db } from "../../../../../firebase/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";

const localizer = momentLocalizer(moment);

const MyLessons = () => {
  const eventCollectionRef = collection(db, "events");

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchStudentEvents = async () => {
      try {
        const studentID = auth.currentUser.uid; 
        const q = query(eventCollectionRef, where("studentID", "==", studentID));
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
        console.log("Fetched and formatted student events:", fetchedEvents);
      } catch (error) {
        console.error("Error fetching student events:", error);
      }
    };
  
    fetchStudentEvents(); 
  }, []);

  const CustomEvent = ({ event }) => (
    <div>
      <strong>{event.title}</strong>
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
};

export default MyLessons;
