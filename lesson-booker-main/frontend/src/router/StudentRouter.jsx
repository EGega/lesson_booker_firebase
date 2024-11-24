import React from 'react'
import  {BrowserRouter, Routes, Route} from "react-router-dom";
import StudentHome from '../home/studentHome/StudentHome';
import Teachers from '../pages/teacherPages/teachersList/Teachers';
import TeacherDetails from '../pages/teacherPages/teachersList/TeacherDetails';
import StudentClasses from '../pages/teacherPages/classes/studentClasses/StudentClasses';
import Books from "../pages/teacherPages/books/Books";
import BookDetails from "../pages/teacherPages/books/BookDetails";
import LessonCalendar from "../pages/calendars/LessonCalendar";
import Profile from "../pages/teacherPages/profile/Profile";
import LessonInfo from "../pages/teacherPages/lessonInfo/LessonInfo";
import Feedback from "../pages/feedback/Feedback";
import Cart from '../shopping/cart/Cart';
import CheckoutPage from '../shopping/checkout/CheckoutPage';
import Success from '../payments/Success';
import Cancel from '../payments/Cancel';
const StudentRouter = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<StudentHome />}/>
        <Route path='/teachers' element={<Teachers/>}/>
        <Route path='/teachers/:id' element={<TeacherDetails />} />
        <Route path='/student-classes' element={<StudentClasses/>}/>
        <Route path='/books' element={<Books/>}/>
        <Route path='/books/:id' element={<BookDetails/>}/>
        <Route path='/calendar' element={<LessonCalendar />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/lessoninfo' element={<LessonInfo />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/success' element={<Success />} />
        <Route path='/cancel' element={<Cancel />} />
    </Routes>
    </>
  )
}

export default StudentRouter