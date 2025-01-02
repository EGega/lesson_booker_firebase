import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './LessonCalendar.css'
import styled from "./LessonCalendar.module.css";
import { SubmitButton, ExitButton } from "../../components/styled/styledbuttons/buttons.js";
import {FaTrash, FaEdit} from "react-icons/fa"
import Navbar from "../../components/navbar/Navbar.jsx";
import { auth, db } from "../../firebase/firebase.js";
import { collection, getDocs, where, query, addDoc, doc, deleteDoc } from "firebase/firestore";
import SelectTeacher from "./SelectTeacher.jsx"
import { fetchTeacherName } from "./functions.js";



const localizer = momentLocalizer(moment);

const LessonCalendar = () => {

  // Collection References

const teacherCollectionRef = collection(db, "teachers")
const eventCollectionRef = collection(db, "events")

  const [module, setModule] = useState(false);
  const [teacherSelected, setTeacherSelected] = useState(false)
  const [teacherName, setTeacherName] = useState("");
  const [selectedTeacherID, setSelectedTeacherID] = useState("")
  const [teacherEvents, setTeacherEvents] = useState([])
  const [events, setEvents] = useState([]);
  const [stName, setStName] = useState("");
  const [timeSlotInfo, setTimeSlotInfo] = useState();

  const [selectedEventIndex, setSelectedEventIndex] = useState(null);

 const fetchEventsforSelectedTeacher = async () => {
    try {
      const q = query(collection(db, "events"), where("teacherID", "==", selectedTeacherID));
      const data = await getDocs(q);
      const fetchedEvents = data.docs.map((doc) => {
        const eventData = doc.data();
        return {
          id: doc.id,
          title: eventData.title || "No Title",
          start: eventData.start?.toDate(),
          end: eventData.end?.toDate(),
        };
      });
      setTeacherEvents(fetchedEvents);
      setEvents(fetchedEvents); // Sync both states
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };



  
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

  const handleSelectSlot = (slotInfo) => {
    setModule(true);
    setTimeSlotInfo(slotInfo);
  };

  const exitHandler = () => {
    setModule(false);
  };

  const submitHandler = async () => {
    setModule(false);
  
    const newEvent = {
      title: `${auth?.currentUser.displayName} - ${teacherName} `,
      start: timeSlotInfo.start,
      end: timeSlotInfo.end,
      studentName: auth.currentUser.displayName,
      studentID: auth.currentUser.uid,
      teacherID: selectedTeacherID,
      teacherName,
    };
  
    try {
      await addDoc(eventCollectionRef, newEvent);
      setEvents([...events, newEvent]);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const editHandler = (eventId) => {
    setModule(true);
    setSelectedEventIndex(eventId);
    const selectedEvent = events.find((event, index) => index === eventId);
    setStName(selectedEvent.studentName);
  };

  const updateHandler = () => {
    setModule(false);

    const updatedEvents = events.map((event, index) => {
      if (index === selectedEventIndex) {
        // Update the selected event with new information
        return {
          ...event,
          title: `${stName}`,
          studentName: stName,
        };
      }
      return event;
    });

    setEvents(updatedEvents);
    // Reset selectedEventIndex after updating the event
    setSelectedEventIndex(null);
  };

  const removeEvent = async (eventId) => {
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
      <FaTrash className={styled.trashBin} onClick={() => removeEvent(event.id)} />
      <FaEdit className={styled.editIcon} onClick={() => editHandler(event.id)} /> 
    </div>
  )};

  return (
    <> 
    <Navbar />
      {module && (
        <div className={styled.module}>
          <input
            type="text"
            className={styled.nameInput}
            onChange={(e) => setStName(e.target.value)}
            placeholder="Enter Your Name"
          />

          <SubmitButton onClick={selectedEventIndex !== null ? updateHandler : submitHandler}>Submit</SubmitButton>
          <ExitButton onClick={exitHandler}>X</ExitButton>
        </div>
      )}

      <div className={styled.app}>
        { teacherSelected ?
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
          // events={events.map((event, index) => ({ ...event, id: index }))}
          events={events}
          selectable={true}
          onSelectSlot={handleSelectSlot}
          onSelecting={(slot) => false}
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
        : 
        <SelectTeacher   setTeacherSelected={setTeacherSelected}  setSelectedTeacherID={setSelectedTeacherID} setTeacherEvents={setTeacherEvents} /> 
        }
      </div>
    </>
  );
};

export default LessonCalendar;

