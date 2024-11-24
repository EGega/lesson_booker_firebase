import React from 'react'
import { useParams } from 'react-router-dom'
import {students} from '../../data/data.js'
import Navbar from '../../components/navbar/Navbar.jsx'
import styled from "./StudentDetails.module.css"
import { SubmitButton } from '../../components/styled/styledbuttons/buttons.js'
import { useNavigate } from 'react-router-dom'
const StudentDetails = () => {
  const { id } = useParams();
  const student = students.find((s) => s.id === parseInt(id));
  console.log(student);
  const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <div className={styled.container}>
        <div className={styled.infoSide}>
          <img className={styled.img} src={student.img} alt="" />
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
          <textarea className={styled.comment} type="text" id='comment' > </textarea>
          <SubmitButton >Submit</SubmitButton>
         </div>
        </div>
      </div>
    </>
  )
}

export default StudentDetails