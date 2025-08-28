import React from 'react'
import Navbar from '../../../../components/navbar/Navbar'
import styled from './CompletedLessons.module.css'
import { collection, query, where, getDocs} from "firebase/firestore";
import { auth, db } from '../../../../firebase/firebase';
import { useState, useEffect } from 'react';

const AwaitingLessons = () => {
    const eventCollectionRef = collection(db, "events")
    const [events, setEvents] = useState([]);
    
    
      useEffect(() => {
        const fetchStudentEvents = async () => {
          try {
            const studentID = auth.currentUser.uid; 
            const q = query(eventCollectionRef, where("studentID", "==", studentID));
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
            }).filter((event) => event.end > now);
      
            setEvents(fetchedEvents); 
            console.log("Fetched and formatted student events:", fetchedEvents);
          } catch (error) {
            console.error("Error fetching student events:", error);
          }
        };
      
        fetchStudentEvents(); 
        console.log(events);
        
      }, []);
    
    
    
      return (
        <>
        <Navbar></Navbar>
        <div className={styled.container}>
        <h4>Total Awaiting Lessons: {events.length} </h4>
        <div className={styled.lesson}>
          {events.map((event) => {
            return (
                <div className={styled.event}>
                <p>{event?.teacherName}</p> 
                <p> {event?.start.toLocaleDateString('en-GB')}  {event?.start.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} - {event?.end.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p> 
                <p><a target='blank' href={event?.zoomLink} >Join Zoom </a> </p>   
                </div>
            )
          })}
        </div>
        </div>
        </>
      )
}

export default AwaitingLessons