import { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import styled from './Students.module.css'
import { Link } from 'react-router-dom';
import { db, auth } from '../../firebase/firebase';
import { getDocs, collection } from 'firebase/firestore';
import React from 'react';
const Students = () => {
 const [studentList, setstudentList] = useState([]) 

 const studentCollectionRef = collection(db, "students");
 
 const getStudentList = async () => {
     const data = await getDocs(studentCollectionRef)
     const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
     setstudentList(filteredData)
     console.log(filteredData);
   }
   useEffect(() => {
       getStudentList()
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