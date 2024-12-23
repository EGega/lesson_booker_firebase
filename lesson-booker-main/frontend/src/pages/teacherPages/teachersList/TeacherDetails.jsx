import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../../components/navbar/Navbar'
import styled from './TeacherDetails.module.css'
import { SubmitButton } from '../../../components/styled/styledbuttons/buttons'
import { useNavigate } from 'react-router-dom'
import maleAvatar from "../../../assets/maleAvatar.jpg"
import femaleAvatar from "../../../assets/femaleAvatar.png"
import introVideo from "../../../assets/videos/introVideo.webm"
import { AiOutlineClose } from "react-icons/ai";
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebase/firebase'
const TeacherDetails = () => {
  const {userId} = useParams()
  const navigate = useNavigate()
  const [teacher, setTeacher] = useState(null)
  const [video, setVideo] = useState(false)

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const docRef = doc(db, "teachers", userId
        );  
        const docSnap = await getDoc(docRef);  
        if (docSnap.exists()) {
          setTeacher(docSnap.data());  
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    fetchTeacherData();
    console.log(teacher);
    console.log(userId);
    
  }, []);
  
  return (
    <>

      <Navbar />
      <div className={styled.container}>
        <div className={styled.infoSide}>
          <img className={styled.img} src={teacher?.gender === "Male" ?  maleAvatar : femaleAvatar } alt="" />
          <h3>{  teacher?.gender === "Male" ? `Mr. ${teacher?.firstName} ${teacher?.lastName}` :  `Mrs. ${teacher?.firstName} ${teacher?.lastName}`}</h3>
          <h3>{teacher?.gender}</h3>
          <h3>{new Date().getFullYear() - teacher?.birthYear} Years Old</h3>
          {/* <h3><a href="https://www.youtube.com/watch?v=cWcId6ZoaWs&ab_channel=YanelisaBokveld" target='_blank' >Link</a></h3> */}
          <SubmitButton onClick={() => {
            navigate(-1)
          }} className={styled.goBackBtn}> &#x2190; Go Back </SubmitButton>
        </div>
        <div className={styled.commentSide}>
         <h3>Completed Lessons: </h3>
         <div className={styled.inputDiv}>
          <label>Leave a comment</label>
          <textarea className={styled.comment} type="text" id='comment'  > </textarea>
          <SubmitButton >Submit</SubmitButton>
          <div className={styled.introVideo}>
          {
          <div className={styled.video}>
            <h3>Intro Video</h3>
            <iframe 
              width="640" 
              height="360" 
              src={teacher?.introVideo} 
              title="Intro Video" 
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
             ></iframe>
          </div> 

          }
          </div>
         </div>
        </div>
      </div>
    </>
  )
}

export default TeacherDetails