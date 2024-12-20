import { useState, useEffect } from 'react'
import { FormStyle, LoginContainer, InputStyle, LoginInnerContainer, LoginBtn, NotAnUser } from '../../components/styled/LoginStyle.styled'
import {TbUserCircle} from "react-icons/tb"
import {RiLockPasswordFill} from "react-icons/ri"
import { loginIcons } from '../../components/styled/iconStylers'
import { useNavigate } from 'react-router-dom'
import { loginActions, updateUserFullName } from '../../store'
import { useDispatch } from 'react-redux'
import styled from "./styles.module.css"
import { auth, googleProvider } from '../../firebase/firebase'
import { signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'

const StudentLogin = ({setLogin}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data, setData] = useState({email: "", password: ""})
  const [error, setError] = useState("")

  
const loginHandler = async (e) => {
  e.preventDefault()
try {
  await signInWithEmailAndPassword(auth, data.email, data.password)
  dispatch(loginActions.loginToggler("student"))
  navigate('/') 
} catch (err) {
  console.log(err);
  setError(err.message);
  
}

  
}
const googleLoginHandler = async (e) => {
  e.preventDefault()
  try {
    await signInWithPopup(auth, googleProvider)
    navigate('/') 
  } catch (error) {
    console.log(error);
    
  }
}



  const handleChange = ({currentTarget: input}) => {
    setData({...data, [input.name]: input.value})
  }


  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 4000);
      return () => clearTimeout(timer); 
    }
  }, [error]);
  return (
    <LoginContainer >
      <LoginInnerContainer>
        <FormStyle className={styled.form}>
        <h3> Student Login</h3>
          <InputStyle>
          <TbUserCircle style={loginIcons} />
          <input type="email" id='email' name='email' placeholder='Type your email' onChange={handleChange} value={data.email} required/>
          </InputStyle>
          <InputStyle>
          <RiLockPasswordFill style={loginIcons}/>
          <input type="password" id='password' name='password'  placeholder='Type your password' onChange={handleChange} value={data.password} required />
          </InputStyle>
          {error &&  <div className={styled.error_msg}>{error}</div>}
          <div className={styled.loginDiv}>
          <LoginBtn onClick={loginHandler}> Login </LoginBtn>
          <LoginBtn onClick={googleLoginHandler}> Google Login </LoginBtn>
          </div>
        </FormStyle>
        {/* Not a user */}
        <NotAnUser >
         <div>
          <p>Not a User?</p>
          <LoginBtn onClick={(e) => {
            e.preventDefault()
            navigate('/register')
          }}> Register Here </LoginBtn>
         </div>
         <div>
          <p>Are You a Teacher?</p>
          <LoginBtn onClick={() => {
            setLogin("teacher")
          }}> Login Here </LoginBtn>
         </div>
        </NotAnUser>
      </LoginInnerContainer> 
    </LoginContainer >
    
  )
}

export default StudentLogin