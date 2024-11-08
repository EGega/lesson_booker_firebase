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

const TeacherRegister = ({setRegister}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const registerHandler = () => {
    dispatch(loginActions.loginToggler())
    navigate('/')
  }
  return (
    <LoginContainer >
      <LoginInnerContainer>
        <FormStyle>
        <h3> Teacher Register</h3>
          <InputStyle>
          <BsFillPersonVcardFill style={loginIcons} />
          <input type="text" id='firstname' placeholder='Type your first name'/>
          </InputStyle>
          <InputStyle>
          <BsPersonVcard style={loginIcons} />
          <input type="text" id='lastname' placeholder='Type your last name'/>
          </InputStyle>
          <InputStyle>
          <TbUserCircle style={loginIcons} />
          <input type="text" id='email' placeholder='Type your email'/>
          </InputStyle>
          <InputStyle>
          <RiLockPasswordFill style={loginIcons}/>
          <input type="password" id='password'  placeholder='Type your password' />
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