import TeacherRegister from "./teacherLogin/teacherRegister"
import StudentRegister from "./studentLogin/studentRegister"
import { useState } from "react"
const Register = () =>  {
const [register, setRegister] = useState("student")
  return (
    <>
     { register === "student" ? <StudentRegister setRegister={setRegister}/> : <TeacherRegister setRegister={setRegister}/> } 
    </>
  )
}

export default Register