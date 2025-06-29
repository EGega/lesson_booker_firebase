import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar.jsx'
import styled from "./StudentDetails.module.css"
import { SubmitButton } from '../../components/styled/styledbuttons/buttons.js'
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebase';
import avatar from "../../assets/avatar.jpg"
const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [student, setStudent] = useState(null);
  const [comment, setComment] = useState("");
  // const student = students.find((s) => s.id === parseInt(id));
    useEffect(() => {
    const fetchStudent = async () => {
      try {
        const docRef = doc(db, "students", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStudent({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such student document!");
        }
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchStudent();
  }, [id]);
    const handleCommentSubmit = async () => {
    if (comment.trim() === "") {
      alert("Comment cannot be empty!");
      return;
    }

    try {
      const studentRef = doc(db, "students", id);
      await updateDoc(studentRef, {
        comments: arrayUnion(` ${comment} --- Comment done by teacher: ${auth.currentUser.displayName} 
  with ID: ${auth.currentUser.uid} 
  `),
      });
      alert("Comment submitted successfully!");
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (!student) return <p>Loading student...</p>;
  return (
    <>
      <Navbar />
      <div className={styled.container}>
        <div className={styled.infoSide}>
          <img className={styled.img} src={avatar} alt="" />
          <h3>{student.firstName} {student.lastName}</h3>
          <h3>{student.gender}</h3>
          <h3>{student.age}</h3>
          <SubmitButton onClick={() => {
            navigate(-1)
          }} className={styled.goBackBtn}> &#x2190; Go Back </SubmitButton>
        </div>
        <div className={styled.commentSide}>
         <h3>Completed Lessons: </h3>
         <div className={styled.inputDiv}>
          <label>Leave a comment</label>
          <textarea className={styled.comment} type="text" value={comment} id='comment' onChange={(e) => setComment(e.target.value)} maxLength="1500" > </textarea>
          <SubmitButton onClick={handleCommentSubmit}>Submit</SubmitButton>
         </div>
        </div>
      </div>
    </>
  )
}

export default StudentDetails