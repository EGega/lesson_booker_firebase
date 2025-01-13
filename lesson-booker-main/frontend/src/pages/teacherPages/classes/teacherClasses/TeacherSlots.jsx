import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../../../firebase/firebase";
import { Calendar, momentLocalizer } from "react-big-calendar";
import Navbar from "../../../../components/navbar/Navbar";
import moment from "moment";
import style from "./TeacherSlots.module.css"
import "react-big-calendar/lib/css/react-big-calendar.css";
import { SubmitButton, CancelButton, ExitButton } from "../../../../components/styled/styledbuttons/buttons";

const localizer = momentLocalizer(moment);

const TeacherSlots = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [module, setModule] = useState(false);

  const teacherID = auth.currentUser.uid; 

  const slotsCollectionRef = collection(db, "slots");

  // Fetch teacher's available slots
  const fetchSlots = async () => {
    try {
      const q = query(slotsCollectionRef, where("teacherID", "==", teacherID));
      const data = await getDocs(q);
      const fetchedSlots = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        start: doc.data().start.toDate(),
        end: doc.data().end.toDate(),
      }));
      setSlots(fetchedSlots);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const addSlot = async () => {
    setModule(false)
    if (!selectedSlot) {
      alert("Please select a slot to add.");
      return;
    }
    try {
      const newSlot = {
        teacherID,
        start: selectedSlot.start,
        end: selectedSlot.end,
        isBooked: false,
      };
      const docRef = await addDoc(slotsCollectionRef, newSlot);
      setSlots([...slots, { ...newSlot, id: docRef.id }]);
      setSelectedSlot(null);
    } catch (error) {
      console.error("Error adding slot:", error);
    }
  };

  const removeSlot = async (slotId) => {
    try {
      await deleteDoc(doc(db, "availableSlots", slotId));
      setSlots(slots.filter((slot) => slot.id !== slotId));
    } catch (error) {
      console.error("Error removing slot:", error);
    }
  };

  const handleSelectSlot = (slotInfo) => {
    if (slotInfo.start < new Date()) {
      alert("Cannot select a past slot.");
      return;
    }
    setModule(true)
    setSelectedSlot(slotInfo);
  };
  const exitHandler = () => {
    setModule(false);
  };
  return (
    <>
      <Navbar />
      {module && (
        <div className={style.module}>
          <SubmitButton onClick={addSlot}>Add This Slot</SubmitButton>
          <CancelButton onClick={exitHandler} >Cancel</CancelButton>
          <ExitButton onClick={exitHandler} >X</ExitButton>
        </div>
      )}
      <div className={style.app}>
      <Calendar
        localizer={localizer}
        events={slots}
        selectable
        onSelectSlot={handleSelectSlot}
        step={30}
        timeslots={1}
        style={{ height: "100vh" }}
        defaultView="week"
        
      />
      </div>
    </>
  );
};

export default TeacherSlots;
