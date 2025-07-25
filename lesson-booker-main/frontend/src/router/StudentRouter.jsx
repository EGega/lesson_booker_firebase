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
import StudentList from '../home/studentHome/StudentList';
import MyLessons from "../pages/teacherPages/classes/studentClasses/studentLessons/MyLessons"
import CompletedLessons from '../pages/teacherPages/classes/studentClasses/CompletedLessons';
import TeachingVideos from '../pages/teacherPages/videos/TeachingVideos';
import StudentProfile from '../pages/teacherPages/profile/studentProfile/StudentProfile';
import AwaitingLessons from '../pages/teacherPages/classes/studentClasses/AwaitingLessons';
import TodayLessons from '../pages/teacherPages/classes/studentClasses/TodayLessons';
import Reviews from '../pages/teacherPages/classes/studentClasses/Reviews';
const StudentRouter = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<StudentHome />}/>
        <Route path='/teachers' element={<Teachers/>}/>
        <Route path='/teachers/:userId' element={<TeacherDetails />} />
        <Route path='/student-classes' element={<StudentClasses/>}/>
        <Route path='/student-list' element={<StudentList/>}/>
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
        <Route path='/my-lessons' element={<MyLessons />} />
        <Route path='/completed-lessons' element={<CompletedLessons />} />
        <Route path='/teaching-videos' element={<TeachingVideos />} />
        <Route path='/student-profile' element={<StudentProfile />} />
        <Route path='/awaiting-lessons' element={<AwaitingLessons />} />
        <Route path='/todays-lessons' element={<TodayLessons />} />
        <Route path='/reviews' element={<Reviews />} />
    </Routes>
    </>
  )
}

export default StudentRouter