import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import { teachers } from '../../data/teachersList'
import styled from './Feedback.module.css'
import { IoIosStar,  IoIosStarOutline } from 'react-icons/io';
import femaleAvatar from "../../assets/femaleAvatar.png"
import maleAvatar from "../../assets/maleAvatar.jpg"
import { useState } from 'react';
const Feedback = () => {
const [teacherRatings, setTeacherRatings] = useState({});


const handleStar = (teacherId, index) => {
  setTeacherRatings((prevRatings) => ({
    ...prevRatings,
    [teacherId]: {
      sum: (prevRatings[teacherId]?.sum || 0) + index,
      num: (prevRatings[teacherId]?.num || 0) + 1,
    },
  }))
}

const generateStars = (teacherId) => {
  const {sum = 0, num = 0} = teacherRatings[teacherId] || {}
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (i <= (sum / num) + 0.5) {
      stars.push(<IoIosStar key={i} className={styled.fullStar} onClick={() => handleStar(teacherId, i)} />);
    } else {
      stars.push(<IoIosStarOutline key={i} className={styled.emptyStar} onClick={() => handleStar(teacherId, i)} />);
    }
  }
  return stars;
}

  return (
    <>
    <Navbar />
    <div className={styled.container}>
       {teachers?.map((teacher, index) => {
        const {name, birthyear, gender, id } = teacher
       return (
           <div className={styled.card} key={id}>
            <img src={gender === "Male" ? maleAvatar : femaleAvatar } alt={name} className={styled.img} />
              <h3>{name}</h3>
              <h3>{new Date().getFullYear() - birthyear}</h3>
              <h3>{gender}</h3>
              <h3>Rate Your Teacher</h3>
              <h3 className={styled.teacherRate}>{(Math.round((teacherRatings[id]?.sum / teacherRatings[id]?.num || 0) * 100) / 100).toFixed(2)} <IoIosStar className={styled.teacherStar}></IoIosStar></h3>
              <button className={styled.generateStarsBtn}>{generateStars(id)}</button>
           </div>
           )
       })}
    </div>
    </>
  )
}

export default Feedback

