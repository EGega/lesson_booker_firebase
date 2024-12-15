import React from 'react'
import {db} from "../../firebase/firebase"
import { getDocs, collection, addDoc, deleteDoc,doc } from "firebase/firestore" 
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

const deleteStudent = async (id) => {
     const studentDoc = doc(db, "students", id)
     await deleteDoc(studentDoc)
     setstudentList((prevList) => prevList.filter((student) => student.id !== id));
}

const onSubmitStudent = async () => {
    
   try {
    await addDoc(studentCollectionRef, {
        Name: newStName,
        Last_Name: newStSurname,
        YearBorn: bornYear,
        hasPaid: hasPaid,
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
    <div>
        {studentList.map((student) => {
            return (
                <div>
                <h6>{student.Name}</h6>
                <h6>{student.Last_Name}</h6>
                <h6>{student.hasPaid ? "Paying Student": "Non Paying Student"}</h6>
                <button onClick={() => deleteStudent(student.id)}>Delete Student</button>
            </div>
            )
        })}
    </div>
    </>

  )
}

export default StudentList