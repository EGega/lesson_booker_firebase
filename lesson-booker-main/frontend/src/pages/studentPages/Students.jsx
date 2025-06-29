import { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import styled from './Students.module.css'
import { Link } from 'react-router-dom';
import { db, auth } from '../../firebase/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import React from 'react';
const Students = () => {
 const studentCollectionRef = collection(db, "students");
 const [studentList, setstudentList] = useState([]) 

const getStudentList = async () => {
  try {
    const teacherID = auth.currentUser.uid;

    // Step 1: Get all events for this teacher
    const eventSnapshot = await getDocs(collection(db, "events"));
    const studentIDsWithEvents = new Set();

    eventSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.teacherID === teacherID && data.studentID) {
        studentIDsWithEvents.add(data.studentID);
      }
    });

    // Step 2: Get students who match the IDs
    const studentSnapshot = await getDocs(collection(db, "students"));
    const filteredData = studentSnapshot.docs
      .map(doc => ({ ...doc.data(), id: doc.id }))
      .filter(student => studentIDsWithEvents.has(student.userId));

    setstudentList(filteredData);
    console.log("Filtered Students for teacher:", filteredData);
  } catch (error) {
    console.error("Error fetching students with events:", error);
  }
};


useEffect(() => {
  getStudentList();
}, []);
  return (
    <>
   <Navbar/>
   <div className={styled.container}>
   {studentList.map((student) => {
    const {uid, firstName, lastName, gender, img, age} = student
    return(
   <div className={styled.card} key={uid}>
      <img className={styled.img} src={img} alt="" />
      <div className={styled.name}>
        <h2>{firstName}</h2>
        <h2>{lastName}</h2>
      </div>
      <div className={styled.genAge}>
        <h3>{gender}</h3>
        <h3>{age}</h3>
      </div>
     
       <Link to={`/students/${uid}`} className={styled.btn}>
              Details
      </Link>
     
    </div>
    )
   })
    }
   </div>
    </>
  )
}

export default Students