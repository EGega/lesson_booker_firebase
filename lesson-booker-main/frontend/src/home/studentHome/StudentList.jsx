import React from 'react'
import {db} from "../../firebase/firebase"
import { getDocs, collection, addDoc, deleteDoc } from "firebase/firestore" 
import { useState, useEffect } from "react"

const StudentList = () => {
const [studentList, setstudentList] = useState([])

// New student registering

const [newStName, setNewStName] = useState("")
const [newStSurname, setNewStSurname] = useState("")
const [hasPaid, setHasPaid] = useState(false)
const [bornYear, setBornYear] = useState(0)



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

const deleteStudent = async () => {
    const movieDoc = doc (db, "movies")
    await deleteDoc
}

const onSubmitStudent = async () => {
    
   try {
    await addDoc(studentCollectionRef, {
        Name: newStName,
        Last_Name: newStSurname,
        YearBorn: bornYear,
        hasPaid: true,
      })
   } catch (error) {
    console.error(error);
    
   }

}
  return (
    <>
    <div>
      <input type="text" placeholder='Student Name' onChange={(e) => setNewStName(e.target.value)} />
      <input type="text" placeholder='Student Surname' onChange={(e) => setNewStSurname( e.target.value)} />
      <input type="number" placeholder='Year Born' onChange={(e) => setBornYear(Number(e.target.value))} />
      <input type="checkbox" name="" id="" checked={hasPaid} onChange={(e) => setHasPaid(e.target.checked)} />
      <label htmlFor="">Paid Courses</label>
      <button type="submit" onClick={() => {
        console.log(newStName, newStSurname, bornYear, hasPaid)
        onSubmitStudent()
        
      }}>
        Submit the Student
        </button>

    </div>
    </>

  )
}

export default StudentList