import React from 'react'
import Navbar from '../../../../components/navbar/Navbar'
import styled from './StudentClasses.module.css'
import bookNow from "../../../../assets/classes/bookNow.jpg"
import buyBooks from "../../../../assets/classes/buyBooks.png"
import subscribe from "../../../../assets/classes/subscribe.jpg"
import refer from  "../../../../assets/classes/refer.jpg"
import completedLessons from "../../../../assets/classes/completedLessons.jpg"
import goToLesson from "../../../../assets/classes/goToYourLesson.jpg"
import { ClickButton } from '../../../../components/styled/styledbuttons/buttons'
import { BsFillMouse2Fill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
const StudentClasses = () => {

  const navigate = useNavigate()
  return (
     <>
     <Navbar />
      <div className={styled.container}>
        <div className={styled.goToLessons}>
          <img src={goToLesson} alt="Enter Your Lesson" />  
          <ClickButton >Enter Your Lesson <BsFillMouse2Fill /> </ClickButton>
        </div>
        <div className={styled.bookAlesson}>
          <img src={bookNow} alt="Book Now" />  
          <ClickButton onClick={() => {
           navigate("/calendar")
          }}>Book a Lesson <BsFillMouse2Fill /> </ClickButton>
        </div>
        <div className={styled.completedLessons}>
          <img src={completedLessons} alt="completed Lessons" />
          <ClickButton>Completed Lessons <BsFillMouse2Fill /> </ClickButton>
        </div>
        <div className={styled.subscribe }>
          <img src={subscribe} alt="Subscribe" />
          <ClickButton>Full Time Courses <BsFillMouse2Fill /> </ClickButton>
        </div>
        <div className={styled.buyBook}>
          <img src={buyBooks} alt="BuyBooks" />
          <ClickButton onClick={() => {
            navigate('/books')
          }}>Buy Books <BsFillMouse2Fill /> </ClickButton>
        </div>
        <div className={styled.refer}>
        <img src={refer} alt="refer" />
        <ClickButton>Refer & Earn <BsFillMouse2Fill /> </ClickButton>
        </div>
      </div>
     </>
  )
}

export default StudentClasses