import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './LessonCalendar.css'
import styled from "./LessonCalendar.module.css";
import { SubmitButton, ExitButton } from "../../components/styled/styledbuttons/buttons.js";
import {FaTrash, FaEdit} from "react-icons/fa"
import Navbar from "../../components/navbar/Navbar.jsx";
const localizer = momentLocalizer(moment);

const LessonCalendar = () => {
  const [module, setModule] = useState(false);
  const [events, setEvents] = useState([]);
  const [stName, setStName] = useState("");
  const [timeSlotInfo, setTimeSlotInfo] = useState();
  const [lessons] = useState([
    "Maths", "English", "German", "Programming", "Robotics", "Drama",
  ]);
  const [lessonSelected, setLessonSelected] = useState(lessons[0]);
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);

  const handleSelectSlot = (slotInfo) => {
    setModule(true);
    setTimeSlotInfo(slotInfo);
  };

  const exitHandler = () => {
    setModule(false);
  };

  const submitHandler = () => {
    setModule(false);

    const newEvent = {
      title: `${stName} - ${lessonSelected}`,
      start: timeSlotInfo.start,
      end: timeSlotInfo.end,
      lesson: lessonSelected,
      studentName: stName,
    };

    setEvents([...events, newEvent]);
  };

  // const editHandler = (eventId) => {
  //   setModule(true)
  //   const selectedEvent = events.filter((event, index) => index === eventId);
  // }
  const editHandler = (eventId) => {
    setModule(true);
    setSelectedEventIndex(eventId);
    const selectedEvent = events.find((event, index) => index === eventId);

    // Populate the input fields with the selected event's information
    setStName(selectedEvent.studentName);
    setLessonSelected(selectedEvent.lesson);
  };

  const updateHandler = () => {
    setModule(false);

    const updatedEvents = events.map((event, index) => {
      if (index === selectedEventIndex) {
        // Update the selected event with new information
        return {
          ...event,
          title: `${stName} - ${lessonSelected}`,
          lesson: lessonSelected,
          studentName: stName,
        };
      }
      return event;
    });

    setEvents(updatedEvents);
    // Reset selectedEventIndex after updating the event
    setSelectedEventIndex(null);
  };

  const removeEvent = (eventId) => {
    const updatedEvents = events.filter((event, index) => index !== eventId);
    setEvents(updatedEvents);
  };

  const CustomEvent = ({ event }) => { 
    return ( 
    <div>
      <strong>{event.title}</strong>
      <FaTrash className={styled.trashBin} onClick={() => removeEvent(event.id)} />
      <FaEdit className={styled.editIcon} onClick={() => editHandler(event.id)} /> 
    </div>
    // Significant changes needed on the edit button since it doesn't work properly currently
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

          <select
            name=""
            id={styled.lessons}
            value={lessonSelected}
            onChange={(e) => setLessonSelected(e.target.value)}
          >
            {lessons.map((lesson, index) => (
              <option key={index} value={lesson}>
                {lesson}
              </option>
            ))}
          </select>

          <SubmitButton onClick={selectedEventIndex !== null ? updateHandler : submitHandler}>Submit</SubmitButton>
          <ExitButton onClick={exitHandler}>X</ExitButton>
        </div>
      )}

      <div className={styled.app}>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
          events={events.map((event, index) => ({ ...event, id: index }))}
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
      </div>
    </>
  );
};

export default LessonCalendar;
