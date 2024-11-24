import  {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from '../login/Login'
import Register from '../login/Register';
import PrivateRouter from './PrivateRouter';
import TeacherRouter from "./TeacherRouter";
import StudentRouter from "./StudentRouter";
import { useSelector } from "react-redux";
const RouterProvider = () => {
const { logged, role } = useSelector((state) => state.login);
  
  return (
    <>
 <BrowserRouter >
    <Routes>
      <Route element={<PrivateRouter />}>
      { role === "teacher" ? < Route path='/*' element={<TeacherRouter />} /> :  < Route path='/*' element={<StudentRouter />} /> }  
      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register />}>
      </Route>
    </Routes>

 </BrowserRouter>
    </>
  )
}

export default RouterProvider