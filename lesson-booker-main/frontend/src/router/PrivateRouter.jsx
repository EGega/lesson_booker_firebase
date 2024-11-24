import { Outlet, Navigate } from 'react-router-dom';
import React from 'react'
import { useSelector } from 'react-redux';
import TeacherRouter from './TeacherRouter';
import StudentRouter from './StudentRouter';
const PrivateRouter = () => {
const { logged, role } = useSelector((state) => state.login);

return (
  logged ? (
    role === 'teacher' ? <TeacherRouter /> : <StudentRouter />
  ) : (
    <Navigate to='/login' />
  ) 
);
} 

export default PrivateRouter