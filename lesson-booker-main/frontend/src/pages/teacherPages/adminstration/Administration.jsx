import React from 'react'
import { db } from '../../../firebase/firebase'
import { getDocs, collection } from 'firebase/firestore'
import { useEffect,useState } from 'react'
const Administration = () => {
    const [studentsList, setStudentsList] = useState([])
    const studentCollectionRef = collection(db, "students")
    useEffect(() => {
    const getStudentList = async () => {
    console.log(studentCollectionRef);
        
   // READ THE DATA
  
   try {
    const data = await getDocs(studentCollectionRef)
    console.log(data);
   } catch (error) {
    console.error(error)
   }   
}
getStudentList()
    }, [])
    

  return (
    <div>administration</div>
  )
}

export default Administration