import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import TeacherRouter from './TeacherRouter';
import StudentRouter from './StudentRouter';

const PrivateRouter = () => {
  const { logged, role } = useSelector((state) => state.login)
  const { user } = useAuth(); // Use auth state


  if (!user) {
    return <Navigate to="/login" />;
  }

  return role === 'teacher' ? <TeacherRouter /> : <StudentRouter />;
};

export default PrivateRouter;
