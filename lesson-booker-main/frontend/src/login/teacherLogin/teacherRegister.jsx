import React from 'react'
import { FormStyle, LoginContainer, InputStyle, LoginInnerContainer, LoginBtn, NotAnUser } from '../../components/styled/LoginStyle.styled'
import {TbUserCircle} from "react-icons/tb"
import {RiLockPasswordFill} from "react-icons/ri"
import {BsFillPersonVcardFill} from "react-icons/bs"
import {BsPersonVcard} from "react-icons/bs"
import { loginIcons } from '../../components/styled/iconStylers'
import { useNavigate } from 'react-router-dom'
import { loginActions } from '../../store'
import { useDispatch } from 'react-redux'
import { auth } from '../../firebase/firebase'
import { useState,useEffect } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { db } from '../../firebase/firebase'
import { addTeacherUser } from '../functions/users' 
const TeacherRegister = ({setRegister}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState("")
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: ""
    // userType: "student"
   })
  const registerHandler = async (e) => {
    e.preventDefault()
    try {
     const userCredentials = await createUserWithEmailAndPassword(auth, data.email, data.password)
     const user = userCredentials.user
     await updateProfile(user, {
      displayName: `${data.firstName} ${data.lastName}`
     })
     await addTeacherUser(data.firstName, data.lastName, user.uid, data.gender)
      navigate('/login') 
      console.log(auth);
    } catch (err) {
      console.log(err);
      setError(err.message);
      
  }
  }
  const handleChange = ({currentTarget: input}) => {
    setData({...data, [input.name]: input.value})
  }
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer); 
    }
  }, [error]);
  return (
    <LoginContainer >
      <LoginInnerContainer>
        <FormStyle>
        <h3> Teacher Register</h3>
          <InputStyle>
          <BsFillPersonVcardFill style={loginIcons} />
          <input type="text" id='firstname' placeholder='Type your first name'           name="firstName"
          value={data.firstName}
          onChange={handleChange}
          required/>
          </InputStyle>
          <InputStyle>
          <BsPersonVcard style={loginIcons} />
          <input type="text" id='lastname' placeholder='Type your last name'          name="lastName"
           value={data.lastName}
           onChange={handleChange}
           required/>
          </InputStyle>
          <InputStyle>
          <TbUserCircle style={loginIcons} />
          <input type="text" id='email' placeholder='Type your email'  name='email'
           value={data.email}
           required
           onChange={handleChange}/>
          </InputStyle>
          <InputStyle>
          <RiLockPasswordFill style={loginIcons}/>
          <input type="password" id='password' placeholder='Type your password' name='password'
           onChange={handleChange}
           value={data.password}
           required/>
          </InputStyle>
          <LoginBtn onClick={registerHandler}> Register </LoginBtn>
        </FormStyle>
        {/* Not a user */} 
        <NotAnUser >
         <div>
          <p>Already a User?</p>
          <LoginBtn onClick={() => {
            navigate("/login")
          }} > Login Here </LoginBtn>
         </div>
         <div>
          <p>Are You a Student?</p>
          <LoginBtn onClick={() => {
            setRegister("student")
          }}> Register Here </LoginBtn>
         </div>
        </NotAnUser>
      </LoginInnerContainer> 
    </LoginContainer >
    
  )
}

export default TeacherRegister