import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import { students } from '../../data/data'
import styled from './Students.module.css'
import { Link } from 'react-router-dom';
// for the moment I am creating a fake students website and will put user generated students for backend
const Students = () => {
  return (
    <>
   <Navbar/>
   <div className={styled.container}>
   {students.map((student) => {
    const {id, firstName, lastName, gender, img, age} = student
    return(
   <div className={styled.card} key={id}>
      <img className={styled.img} src={img} alt="" />
      <div className={styled.name}>
        <h2>{firstName}</h2>
        <h2>{lastName}</h2>
      </div>
      <div className={styled.genAge}>
        <h3>{gender}</h3>
        <h3>{age}</h3>
      </div>
     
       <Link to={`/students/${id}`} className={styled.btn}>
              Details
      </Link>
     
    </div>
    )
   })
    }
   </div>
    </>
  )
}

export default Students