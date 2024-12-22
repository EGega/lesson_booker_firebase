import{ useState, useEffect } from 'react'
import eneaPic from "../../../../assets/enea.jpg"
import styled from './ProfileEditor.module.css'
import Navbar from '../../../../components/navbar/Navbar'
import { db, auth } from '../../../../firebase/firebase'
import { updateDoc, doc, collection, getDocs, getDoc, query, where } from "firebase/firestore" 
const ProfileEditor = () => {
  const updateDocument = async (collectionName, docId, updatedData) => {
    try {
        const docRef = doc(db, collectionName, docId); 
        await updateDoc(docRef, updatedData);
        console.log("Document updated successfully!");
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};
const [teacherInfo, setTeacherInfo] = useState({
  firstName: "",
  lastName: "",
  profession: "",
  age: "",
  country: "",
  introVideo: ""
})

 const getTeacher = async () => {
  const teacherRef = collection(db,"teachers")
  const snap = await getDoc(doc(db, "teachers", auth.currentUser.uid)) 
  if (snap.exists()) {
    setTeacherInfo(snap.data())
    console.log(snap.data())
    console.log(teacherInfo);
  }
  else {
    console.log("No such document")
  }
 }
useEffect(() => {
 getTeacher()
}, [])


const [editing, setEditing] = useState(false)
  return (
    <>
    {!editing ? 
    <div>
     <img src={eneaPic}  className={styled.image} alt="" />
       <h3>{teacherInfo.firstName}</h3>
       <h3>{teacherInfo.lastName}</h3>
       <h3>{teacherInfo.profession}</h3>
       <h3>{teacherInfo.country}</h3>
       <a className={styled.videoLink} href={teacherInfo.introVideo} target='blank'>Intro Video</a>
       <button onClick={() => {
      setEditing(true)
     }} className={styled.editProfile}>Edit Profile</button>
     </div> : 
     <form className={styled.form} action="">
      <Navbar />
      <button className={styled.closeBtn} onClick={() => {
      setEditing(false)
     }}>X</button>
      <input type="text" onChange={(e) => {
        setTeacherInfo({...teacherInfo, name: e.target.value })
      }} placeholder='Your name' />
      <input type="text" placeholder='Profession' onChange={(e) => {
        setTeacherInfo({...teacherInfo, profession: e.target.value })
      }} />
      <input type="number" placeholder='Age' onChange={(e) => {
        setTeacherInfo({...teacherInfo, age: e.target.value })
      }} />
      <input type="text" placeholder='Country' onChange={(e) => {
        setTeacherInfo({...teacherInfo, country: e.target.value })
      }} />
      <input type="text" placeholder='Video Link' onChange={(e) => {
        setTeacherInfo({...teacherInfo, introVideo: e.target.value })
      }} />
      <button className={styled.submitBtn} onClick={() => {
      setEditing(false)
     }} >Submit</button>
     </form>}
       </>
  )
}

export default ProfileEditor