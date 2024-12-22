import{ useState, useEffect } from 'react'
import eneaPic from "../../../../assets/enea.jpg"
import styled from './ProfileEditor.module.css'
import Navbar from '../../../../components/navbar/Navbar'
import { db, auth } from '../../../../firebase/firebase'
import { updateDoc, doc, onSnapshot } from "firebase/firestore" 
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
  birthYear: "",
  country: "",
  introVideo: "",
  gender:""
})


const getTeacher = () => {
  const teacherDocRef = doc(db, "teachers", auth.currentUser.uid);
  const unsubscribe = onSnapshot(teacherDocRef, (docSnap) => {
    if (docSnap.exists()) {
      setTeacherInfo(docSnap.data());
    } else {
      console.log("No such document!");
    }
  });

  return unsubscribe;
};


useEffect(() => {
 getTeacher()
}, [])

const handleSubmit = async (e) => {
  e.preventDefault(); 

  const teacherDocRef = doc(db, "teachers", auth.currentUser.uid);

  try {
    await updateDoc(teacherDocRef, teacherInfo);
    console.log("Document updated successfully!");
    setEditing(false); 
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};


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
     <form className={styled.form} onSubmit={handleSubmit} action="">
      <Navbar />
      <button className={styled.closeBtn} onClick={() => {
      setEditing(false)
     }}>X</button>
      <input type="text" onChange={(e) => {
        setTeacherInfo({...teacherInfo, firstName: e.target.value })
      }} placeholder='Your name' value={teacherInfo.firstName}/>
      <input type="text" value={teacherInfo.lastName} onChange={(e) => {
        setTeacherInfo({...teacherInfo, lastName: e.target.value })
      }} placeholder='Your surname' />
      <input type="text" placeholder='Profession' onChange={(e) => {
        setTeacherInfo({...teacherInfo, profession: e.target.value })
      }} />
      <input type="number" placeholder='BirthYear' onChange={(e) => {
        setTeacherInfo({...teacherInfo, birthYear: e.target.value })
      }} />
      <input type="text" placeholder='Country' onChange={(e) => {
        setTeacherInfo({...teacherInfo, country: e.target.value })
      }} />
      <input type="text" placeholder='Video Link' onChange={(e) => {
        setTeacherInfo({...teacherInfo, introVideo: e.target.value })
      }} />
{/* <     label for="gender">Gender</label> */}
      <select onChange={(e) => {
        setTeacherInfo({...teacherInfo, gender: e.target.value })
      }}
      name="gender" id="gender">
          <option value=""  disabled >Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
     </select>
      <button className={styled.submitBtn} >Submit</button>
     </form>}
       </>
  )
}

export default ProfileEditor