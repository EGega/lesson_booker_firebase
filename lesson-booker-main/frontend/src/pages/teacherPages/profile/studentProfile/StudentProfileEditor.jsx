import { useState, useEffect } from 'react'
import Navbar from '../../../../components/navbar/Navbar'
import { db, auth } from '../../../../firebase/firebase'
import { updateDoc, doc, onSnapshot } from "firebase/firestore"
import avatar from "../../../../assets/maleAvatar.jpg" 
import styled from './StudentProfileEditor.module.css'

const StudentProfileEditor = () => {
    // const updateDocument = async (collectionName, docId, updatedData) => {
    //     try {
    //       const docRef = doc(db, collectionName, docId);
    //       await updateDoc(docRef, updatedData);
    //       console.log("Document updated successfully!");
    //     } catch (error) {
    //       console.error("Error updating document: ", error);
    //     }
    //   };
    
      const [studentInfo, setStudentInfo] = useState({
        firstName: "",
        lastName: "",
        birthYear: "",
        introVideo: "",
        gender: ""
      });
    
      const getStudent = () => {
        const studentDocRef = doc(db, "students", auth.currentUser.uid);
        console.log(studentDocRef);
        
        const unsubscribe = onSnapshot(studentDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setStudentInfo(docSnap.data());
          } else {
            console.log("No such document!");
          }
        });
        return unsubscribe;
      };
    
      useEffect(() => {
        getStudent();
      }, []);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const studentDocRef = doc(db, "students", auth.currentUser.uid);
    
        try {
          await updateDoc(studentDocRef, studentInfo);
          console.log("Document updated successfully!");
          setEditing(false);
        } catch (error) {
          console.error("Error updating document: ", error);
        }
      };
    
      const [editing, setEditing] = useState(false);
      return (
        <>
          {!editing ? 
          <div>
            <img src={avatar} className={styled.image} alt="" />
            <h3>{studentInfo.firstName}</h3>
            <h3>{studentInfo.lastName}</h3>
            <h3>{studentInfo.profession}</h3>
            <h3>{studentInfo.country}</h3>
            <a className={styled.videoLink} href={studentInfo.introVideo} target="blank">Intro Video</a>
            <button onClick={() => setEditing(true)} className={styled.editProfile}>Edit Profile</button>
          </div> : 
          <form className={styled.form} onSubmit={handleSubmit} action="">
            <Navbar />
            <button className={styled.closeBtn} onClick={() => setEditing(false)}>X</button>
            <input
              type="text"
              onChange={(e) => setStudentInfo({ ...studentInfo, firstName: e.target.value })}
              placeholder="Your name"
              value={studentInfo.firstName}
            />
            <input
              type="text"
              value={studentInfo.lastName}
              onChange={(e) => setStudentInfo({ ...studentInfo, lastName: e.target.value })}
              placeholder="Your surname"
            />
            <input
              type="number"
              placeholder="BirthYear"
              onChange={(e) => setStudentInfo({ ...studentInfo, birthYear: e.target.value })}
            />
            <input
              type="text"
              placeholder="Video Link"
              onChange={(e) => setStudentInfo({ ...studentInfo, introVideo: e.target.value })}
            />
            {/* <label for="gender">Gender</label> */}
            <select
              onChange={(e) => setStudentInfo({ ...studentInfo, gender: e.target.value })}
              name="gender"
              id="gender"
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <button className={styled.submitBtn}>Submit</button>
          </form>}
        </>
      );
}

export default StudentProfileEditor