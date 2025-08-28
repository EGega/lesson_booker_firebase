import Navbar from '../../../../components/navbar/Navbar'
import styled from './CompletedTeacherLessons.module.css' 
import { collection, query, where, getDocs} from "firebase/firestore";
import { auth, db } from '../../../../firebase/firebase';
import { useState, useEffect } from 'react';

const TodaysTeacherLessons = () => {

const eventCollectionRef = collection(db, "events")
const [events, setEvents] = useState([]);
const today =  new Date().toDateString();

useEffect(() => {
  const fetchTeacherEvents = async () => {
    try {
      const teacherID = auth.currentUser.uid;
      const q = query(eventCollectionRef, where("teacherID", "==", teacherID));
      const querySnapshot = await getDocs(q);
      
      const now = new Date();

      // Start of today: 00:00:00
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      // End of today: 23:59:59
      const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

      const fetchedEvents = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            start: data.start.toDate(),
            end: data.end.toDate(),
          };
        })
        .filter((event) => event.start >= startOfToday && event.start <= endOfToday);

      setEvents(fetchedEvents);
      console.log("Today's teacher events:", fetchedEvents);
    } catch (error) {
      console.error("Error fetching teacher events:", error);
    }
  };

  fetchTeacherEvents();
}, []);

  return (
    <>
    <Navbar></Navbar>
    <div className={styled.container}>
    <h4>Today's ({today}) Lessons:  {events.length} </h4>
    <div className={styled.lesson}>
      {events.map((event) => {
        return (
            <div className={styled.event}>
            <p>{event?.studentName}</p> 
            <p> {event?.start.toLocaleDateString('en-GB')}  {event?.start.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} - {event?.end.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p> 
             {event?.start > new Date() && <p><a target='blank' className={styled.link} rel="noreferrer" href={event?.zoomLink} >Join Zoom </a> </p> } 
            </div>
        )
      })}
    </div>
    </div>
    </>
  )
}

export default TodaysTeacherLessons