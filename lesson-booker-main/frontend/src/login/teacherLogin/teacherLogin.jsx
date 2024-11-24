import React from 'react'
import { FormStyle, LoginContainer, InputStyle, LoginInnerContainer, LoginBtn, NotAnUser } from '../../components/styled/LoginStyle.styled'
import {TbUserCircle} from "react-icons/tb"
import {RiLockPasswordFill} from "react-icons/ri"
import { loginIcons } from '../../components/styled/iconStylers'
import { useNavigate } from 'react-router-dom'
import { loginActions } from '../../store'
import { useDispatch } from 'react-redux'
import { auth } from '../../firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState,useEffect } from 'react'
const TeacherLogin = ({setLogin}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data, setData] = useState({email: "", password: ""})
  const [error, setError] = useState("")

  const loginHandler = async (e) => {
  e.preventDefault()
try {
  await signInWithEmailAndPassword(auth, data.email, data.password)
  dispatch(loginActions.loginToggler("teacher"))
  navigate('/') 
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
  
   
    console.log(auth.currentUser.displayName);
  
  return (
    <LoginContainer > 
      <LoginInnerContainer>
        <FormStyle action='submit'> 
        <h3>Teacher Login</h3>
          <InputStyle>
          <TbUserCircle style={loginIcons} />
          <input type="text" id='email' placeholder='Type your email' onChange={handleChange} value={data.email} required name='email'/>
          </InputStyle>
          <InputStyle>
          <RiLockPasswordFill style={loginIcons}/>
          <input type="password" id='password'  placeholder='Type your password' name='password' onChange={handleChange} value={data.password} required/>
          </InputStyle>
          <LoginBtn onClick={loginHandler}> Login </LoginBtn>
        </FormStyle>
        {/* Not a user */}
        <NotAnUser >
         <div>
          <p>Not a user?</p>
          <LoginBtn onClick={(e) => {
            e.preventDefault()
            navigate('/register')
          }}> Register Here </LoginBtn>
         </div>
         <div>
          <p>Are You a Student?</p>
          <LoginBtn onClick={() => {
            setLogin("student")
          }}> Login Here </LoginBtn>
         </div>
        </NotAnUser>
      </LoginInnerContainer> 
    </LoginContainer >
  )
}

export default TeacherLogin