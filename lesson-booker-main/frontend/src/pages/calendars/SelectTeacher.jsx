import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import styled from '../teacherPages/teachersList/Teachers.module.css'
import { Link } from 'react-router-dom'
import maleAvatar from "../../assets/maleAvatar.jpg"
import femaleAvatar from "../../assets/femaleAvatar.png"
import { db, auth } from '../../firebase/firebase'
import { getDocs, collection, query, where } from 'firebase/firestore';   
import { useEffect, useState } from 'react'
import { SubmitButton } from '../../components/styled/styledbuttons/buttons'
import { useTeacher } from '../../context/TeacherProvider'
const SelectTeachers = ({ setTeacherSelected, setSelectedTeacherID, setTeacherEvents}) => {
  const { setTeacherID } = useTeacher();
   const [teacherList, setTeacherList] = useState([]) 
  
   const teacherCollectionRef = collection(db, "teachers");
   
   const getTeacherList = async () => {
       const data = await getDocs(teacherCollectionRef)
       const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
       setTeacherList(filteredData)
     }

    const handleTeacherSelect = (teacherID) => {
        // setTeacherSelected(true)
        setTeacherID(teacherID)
        setSelectedTeacherID(teacherID)
        console.log("Teacher Selected:", teacherID);      
    }
    
  useEffect(() => {
        getTeacherList()
      }, []);
  return (
  <>
  
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
        <SubmitButton style={{ width: '80%', marginBottom: "10px" }} onClick={ () => handleTeacherSelect(userId)} >Book a Lesson</SubmitButton>
      </div>
    )
   })}
  </div>
  </>
  )
}

export default SelectTeachers