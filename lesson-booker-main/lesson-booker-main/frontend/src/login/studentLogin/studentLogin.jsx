
// import { FormStyle, LoginContainer, InputStyle, LoginInnerContainer, LoginBtn, NotAnUser } from '../../components/styled/LoginStyle.styled'
// import {TbUserCircle} from "react-icons/tb"
// import {RiLockPasswordFill} from "react-icons/ri"
// import { loginIcons } from '../../components/styled/iconStylers'
// import { useNavigate } from 'react-router-dom'
// import { loginActions } from '../../store'
// import { useDispatch } from 'react-redux'
// const StudentLogin = ({setLogin}) => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   // loginhandler
//   const loginHandler = () => {
//     dispatch(loginActions.loginToggler("student")) 
//     navigate('/')
//   }
//   return (
//     <LoginContainer >
//       <LoginInnerContainer>
//         <FormStyle>
//         <h3> Student Login</h3>
//           <InputStyle>
//           <TbUserCircle style={loginIcons} />
//           <input type="text" id='email' placeholder='Type your email'/>
//           </InputStyle>
//           <InputStyle>
//           <RiLockPasswordFill style={loginIcons}/>
//           <input type="password" id='password'  placeholder='Type your password' />
//           </InputStyle>
//           <LoginBtn onClick={loginHandler}> Login </LoginBtn>
//         </FormStyle>
//         {/* Not a user */}
//         <NotAnUser >
//          <div>
//           <p>Not a User?</p>
//           <LoginBtn onClick={(e) => {
//             e.preventDefault()
//             navigate('/register')
//           }}> Register Here </LoginBtn>
//          </div>
//          <div>
//           <p>Are You a Teacher?</p>
//           <LoginBtn onClick={() => {
//             setLogin("teacher")
//           }}> Login Here </LoginBtn>
//          </div>
//         </NotAnUser>
//       </LoginInnerContainer> 
//     </LoginContainer >
    
//   )
// }

// export default StudentLogin

import { useState, useEffect } from 'react'
import { FormStyle, LoginContainer, InputStyle, LoginInnerContainer, LoginBtn, NotAnUser } from '../../components/styled/LoginStyle.styled'
import {TbUserCircle} from "react-icons/tb"
import {RiLockPasswordFill} from "react-icons/ri"
import { loginIcons } from '../../components/styled/iconStylers'
import { useNavigate } from 'react-router-dom'
import { loginActions, updateUserFullName } from '../../store'
import { useDispatch } from 'react-redux'
import axios from "axios"
import styled from "./styles.module.css"
const StudentLogin = ({setLogin}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data, setData] = useState({email: "", password: ""})
  const [error, setError] = useState("")

  const handleChange = ({currentTarget: input}) => {
    setData({...data, [input.name]: input.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const url = "http://localhost:8080/api/auth"
      const {data: res} = await axios.post(url, data)
      // will have to change the localStorage
      localStorage.setItem("token", res.data)
      console.log(res);
      dispatch(loginActions.loginToggler("student")) 
      dispatch(updateUserFullName({ firstName: res.user.firstName, lastName: res.user.lastName }));
      navigate('/')
    } catch (error) {
      if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
    }
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
        <FormStyle>
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
          <LoginBtn onClick={handleSubmit}> Login </LoginBtn>
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