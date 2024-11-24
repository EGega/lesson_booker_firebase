import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import style from './StudentHome.module.css'
import teachers from '../../assets/teachers.png'
import classes from '../../assets/classes.jpg'
import books from '../../assets/books.jpg'
import videos from '../../assets/videos.jpg'
import administration from '../../assets/administration.jpg'
import review from '../../assets/review.jpg'
import { useNavigate } from 'react-router-dom'
const StudentHome = () => {
    const navigate = useNavigate()
  return (
     <>
     <Navbar />
     <div className={style.container}>
        <div>
        <img src={teachers} alt="teachers" />
        <button onClick={() => navigate('/teachers') }>Teachers</button>
        </div>
        <div>
        <img src={classes} alt="classes" />
        <button onClick={() => navigate('/student-classes')} >Classes</button>
        </div>
        <div>
        <img src={books} alt="books" />
        <button onClick={() => navigate("/books")}>Books</button>
        </div>
        <div>
        <img src={videos} alt="videos" />
        <button>Videos</button>
        </div>
        <div>
        <img src={administration} alt="administration" />
        <button>Administration</button>
        </div>
        <div>
        <img src={review}  alt="review" />
        <button onClick={() => navigate("/feedback") }>Feedback</button>
        </div>
     </div>

    </>
  )
}

export default StudentHome