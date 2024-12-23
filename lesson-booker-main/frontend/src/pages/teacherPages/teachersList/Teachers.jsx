import React from 'react'
import Navbar from '../../../components/navbar/Navbar'
import styled from './Teachers.module.css'
import {teachers} from '../../../data/teachersList'
import { Link } from 'react-router-dom'
import maleAvatar from "../../../assets/maleAvatar.jpg"
import femaleAvatar from "../../../assets/femaleAvatar.png"
import { db, auth } from '../../../firebase/firebase'
import { getDocs, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react'
const Teachers = () => {
   const [teacherList, setTeacherList] = useState([]) 
  
   const teacherCollectionRef = collection(db, "teachers");
   
   const getTeacherList = async () => {
       const data = await getDocs(teacherCollectionRef)
       const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
       setTeacherList(filteredData)
       console.log(filteredData);
     }
        useEffect(() => {
          getTeacherList()
        }, []);
  return (
  <>
  /*
  <Navbar />
  <div className={styled.container}>
   {teacherList.map((teacher) => {
    const {userId, firstName, lastName, gender, birthYear} = teacher
 
    return (
        <div className={styled.card} key={userId}>
        <img className={styled.img} src={gender === "Male" ? maleAvatar : femaleAvatar} />
        <div className={styled.name}>
          <h2>{ gender === "Male" ? `Mr. ${firstName} ${lastName}` :  `Mrs. ${firstName} ${lastName}`}</h2>
        </div>
        <div className={styled.genAge}>
          <h3>{new Date().getFullYear() - birthYear}</h3>
          <h3>{gender}</h3>
        </div>
       
         <Link to={`/teachers/${userId}`} className={styled.btn}>
                Details
        </Link>
       
      </div>
    )
   })}
  </div>
  </>
  )
}

export default Teachers