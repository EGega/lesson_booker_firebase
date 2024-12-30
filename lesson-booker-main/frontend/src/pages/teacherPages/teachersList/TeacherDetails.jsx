import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../../components/navbar/Navbar'
import styled from './TeacherDetails.module.css'
import { SubmitButton } from '../../../components/styled/styledbuttons/buttons'
import { useNavigate } from 'react-router-dom'
import maleAvatar from "../../../assets/maleAvatar.jpg"
import femaleAvatar from "../../../assets/femaleAvatar.png"
import { AiOutlineClose } from "react-icons/ai";
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { auth, db} from '../../../firebase/firebase'
const TeacherDetails = () => {
  const {userId} = useParams()
  const navigate = useNavigate()
  const [teacher, setTeacher] = useState(null)
  const [comment, setComment] = useState("")

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
    console.log(auth.currentUser.displayName);
    
  }, [userId]);
  
  const handleCommentSubmit = async () => {
    if (comment.trim() === "") {
      alert("Comment cannot be empty!");
      return;
    }

    try {
      const docRef = doc(db, "teachers", userId);
      await updateDoc(docRef, {
        comments: arrayUnion(` ${comment} --- Comment done by student: ${auth.currentUser.displayName} 
  with ID: ${auth.currentUser.uid} 
  `), 
      });
      alert("Comment submitted successfully!");
      setComment(""); 
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };
  
  return (
    <>

      <Navbar />
      <div className={styled.container}>
        <div className={styled.infoSide}>
          <img className={styled.img} src={teacher?.gender === "Male" ?  maleAvatar : femaleAvatar } alt="" />
          <h3>{  teacher?.gender === "Male" ? `Mr. ${teacher?.firstName} ${teacher?.lastName}` :  `Mrs. ${teacher?.firstName} ${teacher?.lastName}`}</h3>
          <h3>{teacher?.gender}</h3>
          <h3>{new Date().getFullYear() - teacher?.birthYear} Years Old</h3>
          <div>
          <SubmitButton>
            Book a Lesson
          </SubmitButton>
          </div>
          <SubmitButton onClick={() => {
            navigate(-1)
          }} className={styled.goBackBtn}> &#x2190; Go Back </SubmitButton>
        </div>
        <div className={styled.commentSide}>
         <h3>Completed Lessons: </h3>
         <div className={styled.inputDiv}>
          <label>Leave a comment</label>
          <textarea onChange={(e) => setComment(e.target.value)} value={comment}  className={styled.comment} type="text" id='comment' maxLength="1500"  > </textarea>
          <SubmitButton onClick={handleCommentSubmit} >Submit</SubmitButton>
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