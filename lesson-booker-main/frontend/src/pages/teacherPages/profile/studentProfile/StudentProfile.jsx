import styled from "./StudentProfile.module.css"
import Navbar from "../../../../components/navbar/Navbar"
import { useState } from "react"
import { Link } from "react-router-dom"
import StudentProfileEditor from "./StudentProfileEditor"
const StudentProfile = () => {
    return (
      <>
      <Navbar />
      <div className={styled.container}>
           <div className={styled.personalInfo}>
            <div className={styled.leftSide}>
            <StudentProfileEditor />
            </div>
            <div className={styled.rightSide}>
              <h2>General Info</h2>
              <div className={styled.lists}>
              <li> <Link to="/completed-lessons">Completed Lessons</Link> </li>
              <li><Link to="/awaiting-lessons">Awaiting Lessons</Link></li>
              <li> <Link to="/personal-students">Students</Link> </li>
              <li>
              <Link to={"/lessoninfo"} className={styled.tdLessons}> Today's Lessons</Link>
              </li> 
              </div>
            </div>
           </div>
      </div>
      </>
    )
}

export default StudentProfile