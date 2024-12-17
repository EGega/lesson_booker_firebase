// import { Outlet, Navigate } from 'react-router-dom';
// import React from 'react'
// import { useSelector } from 'react-redux';
// import TeacherRouter from './TeacherRouter';
// import StudentRouter from './StudentRouter';
// const PrivateRouter = () => {
// const { logged, role } = useSelector((state) => state.login);

// return (
//   logged ? (
//     role === 'teacher' ? <TeacherRouter /> : <StudentRouter />
//   ) : (
//     <Navigate to='/login' />
//   ) 
// );
// } 

// export default PrivateRouter

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Use the Auth Context to get user info
import TeacherRouter from './TeacherRouter';
import StudentRouter from './StudentRouter';

const PrivateRouter = () => {
  const { user } = useAuth(); // Use auth state
  const role = user?.role || 'student'; // Assume 'student' as default role if not specified

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Role-based routing
  return role === 'teacher' ? <TeacherRouter /> : <StudentRouter />;
};

export default PrivateRouter;
