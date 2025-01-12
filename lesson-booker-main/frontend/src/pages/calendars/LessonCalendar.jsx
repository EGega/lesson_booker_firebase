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
import { collection, getDocs, where, query, addDoc, doc, deleteDoc, docre } from "firebase/firestore";
import SelectTeacher from "./SelectTeacher.jsx"
import { fetchTeacherName } from "./functions.js";
import { useTeacher } from "../../context/TeacherProvider.jsx";


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

  const [module, setModule] = useState(false);
  const [teacherSelected, setTeacherSelected] = useState(false)
  const [teacherName, setTeacherName] = useState("");
  const [selectedTeacherID, setSelectedTeacherID] = useState("")
  const [teacherEvents, setTeacherEvents] = useState([])
  const [events, setEvents] = useState([]);
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

// Filter out days before today in the week view
const filterDays = (date) => {
  const startOfWeek = moment(date).startOf("week").toDate(); // Start of the week
  if (startOfWeek < today) {
    return today; // Force the start date to today
  }
  return startOfWeek;
};
  const handleSelectSlot = (slotInfo) => {
    if (slotInfo.start < new Date()) {
      alert("You cannot select a time in the past.");
      return;
    }
    setModule(true);
    setTimeSlotInfo(slotInfo);
  };

  const exitHandler = () => {
    setModule(false);
  };

  const submitHandler = async () => {
    setModule(false);
  
    const newEvent = {
      title: ` ${auth?.currentUser.displayName} - ${teacherName} `,
      start: timeSlotInfo.start,
      end: timeSlotInfo.end,
      studentName: auth.currentUser.displayName,
      studentID: auth.currentUser.uid,
      teacherID: selectedTeacherID,
      teacherName,
    };
  
    try {
      const docRef = await addDoc(eventCollectionRef, newEvent);
      const createdEvent = { ...newEvent, id: docRef.id,  isCurrentStudent: true };
      setEvents((prevEvents) => [...prevEvents, createdEvent]);
      refreshCalendar();
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };


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

  const CustomEvent = ({ event }) => { 
    return ( 
    <div>
      <strong>{event.title}</strong>
      {event.isCurrentStudent && (
        <FaTrash
          className={styled.trashBin}
          onClick={() => removeEvent(event.id, event.start)}
        />
      )}
    </div>
  )};
  console.log(events);
  

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
        { teacherSelected || teacherID ?
        // Added or since it wouldn't display the calendar
 
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

