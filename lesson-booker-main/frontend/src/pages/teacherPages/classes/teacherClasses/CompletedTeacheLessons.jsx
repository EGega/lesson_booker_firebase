import React from 'react'
import Navbar from '../../../../components/navbar/Navbar'
import styled from './CompletedTeacherLessons.module.css' 
import { collection, query, where, getDocs} from "firebase/firestore";
import { auth, db } from '../../../../firebase/firebase';
import { useState, useEffect } from 'react';
const CompletedTeacherLessons = () => {

const eventCollectionRef = collection(db, "events")
const [events, setEvents] = useState([]);


  useEffect(() => {
    const fetchTeacherEvents = async () => {
      try {
        const teacherID = auth.currentUser.uid; 
        const q = query(eventCollectionRef, where("teacherID", "==", teacherID));
        const querySnapshot = await getDocs(q);
      const now = new Date()
        const fetchedEvents = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id, 
            start: data.start.toDate(), 
            end: data.end.toDate(), 
          };
        }).filter((event) => event.end < now);
  
        setEvents(fetchedEvents); 
        console.log("Fetched and formatted teacher events:", fetchedEvents);
      } catch (error) {
        console.error("Error fetching teacher events:", error);
      }
    };
  
    fetchTeacherEvents(); 
    console.log(events);
    
  }, []);


 
  return ( 
    <>
    <Navbar></Navbar>
    <div className={styled.container}>
    <h4>Total Completed Lessons: {events.length} </h4>
    <div className={styled.lesson}>
      {events.map((event) => {
        return (
            <div className={styled.event}>
            <p>{event?.studentName}</p> 
            <p> {event?.start.toLocaleDateString('en-GB')}  {event?.start.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} - {event?.end.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p> 
            </div>
        )
      })}
    </div>
    </div>
    </>
  )
}

export default CompletedTeacherLessons