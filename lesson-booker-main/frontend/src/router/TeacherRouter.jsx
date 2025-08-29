import React from 'react'
import  {BrowserRouter, Routes, Route} from "react-router-dom";
import TeacherHome from "../home/teacherHome/TeacherHome";
import Students from "../pages/studentPages/Students";
import StudentDetails from "../pages/studentPages/StudentDetails";
import TeacherClasses from '../pages/teacherPages/classes/teacherClasses/TeacherClasses';
import Books from "../pages/teacherPages/books/Books";
import BookDetails from "../pages/teacherPages/books/BookDetails";
import LessonCalendar from "../pages/calendars/LessonCalendar";
import Profile from "../pages/teacherPages/profile/Profile";
import LessonInfo from "../pages/teacherPages/lessonInfo/LessonInfo";
import Feedback from "../pages/feedback/Feedback";
import Administration from '../pages/teacherPages/adminstration/Administration';
import TeacherSlots from '../pages/teacherPages/classes/teacherClasses/TeacherSlots'
import CompletedTeacherLessons from '../pages/teacherPages/classes/teacherClasses/CompletedTeacheLessons';
import AwaitingTeacherLessons from '../pages/teacherPages/classes/teacherClasses/AwaitingTeacherLessons';
import TodaysTeacherLessons from '../pages/teacherPages/classes/teacherClasses/TodaysTeacherLessons';
import GoogleDriveBooks from '../pages/teacherPages/books/googleDriverBooks/GoogleDriveBooks';
const TeacherRouter = () => {
  return (
 <> 
   <Routes>
        <Route path='' element={<TeacherHome/>}/> 
        <Route path='/students' element={<Students/>}/>
        <Route path='/students/:id' element={<StudentDetails />} />
        <Route path='/classes' element={<TeacherClasses/>}/>
        <Route path='/books' element={<GoogleDriveBooks/>}/>
        <Route path='/books/:id' element={<BookDetails/>}/>
        <Route path='/calendar' element={<LessonCalendar />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/lessoninfo' element={<LessonInfo />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/administration' element={<Administration />} />
        <Route path='/slots' element={<TeacherSlots />}/>
        <Route path='completed-teacher-lessons' element={<CompletedTeacherLessons />}/>
        <Route path='awaiting-teacher-lessons' element={<AwaitingTeacherLessons />}/>
        <Route path='today-teacher-lessons' element={<TodaysTeacherLessons />}/>
   </Routes>
 </>
    )
}

export default TeacherRouter