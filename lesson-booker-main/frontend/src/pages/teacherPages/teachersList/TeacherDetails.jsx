import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { teachers } from '../../../data/teachersList'
import Navbar from '../../../components/navbar/Navbar'
import styled from './TeacherDetails.module.css'
import { SubmitButton } from '../../../components/styled/styledbuttons/buttons'
import { useNavigate } from 'react-router-dom'
import maleAvatar from "../../../assets/maleAvatar.jpg"
import femaleAvatar from "../../../assets/femaleAvatar.png"
import introVideo from "../../../assets/videos/introVideo.webm"
import { AiOutlineClose } from "react-icons/ai";
const TeacherDetails = () => {
  const {id} = useParams()
  const teacher = teachers.find((teacher) => teacher.id === parseInt(id))
  const navigate = useNavigate()
  const [video, setVideo] = useState(false)
  const videoHandler = () => {
   setVideo((prev) => !prev)
   console.log(video);
  }
  return (
    <>
      <Navbar />
      <div className={styled.container}>
        <div className={styled.infoSide}>
          <img className={styled.img} src={teacher.gender === "Male" ?  maleAvatar : femaleAvatar } alt="" />
          <h3>{ teacher.gender === "Male" ? "Mr. " + teacher.name : "Ms. " + teacher.name }</h3>
          <h3>{teacher.gender}</h3>
          <h3>{new Date().getFullYear() - teacher.birthyear} Years Old</h3>
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
          {video 
          ?
          <div className={styled.video}>
            <video width="640" height="360" controls>
            <source src={introVideo} type="video/webm" />
          </video>
           <AiOutlineClose onClick={videoHandler} className={styled.xButton}></AiOutlineClose>
          </div> 

          :  
         <SubmitButton onClick={videoHandler}>Intro Video</SubmitButton> }
          </div>
         </div>
        </div>
      </div>
    </>
  )
}

export default TeacherDetails