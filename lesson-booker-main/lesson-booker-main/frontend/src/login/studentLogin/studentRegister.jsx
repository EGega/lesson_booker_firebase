// import React from 'react'
// import { FormStyle, LoginContainer, InputStyle, LoginInnerContainer, LoginBtn, NotAnUser } from '../../components/styled/LoginStyle.styled'
// import {TbUserCircle} from "react-icons/tb"
// import {RiLockPasswordFill} from "react-icons/ri"
// import {BsFillPersonVcardFill} from "react-icons/bs"
// import {BsPersonVcard} from "react-icons/bs"
// import { loginIcons } from '../../components/styled/iconStylers'
// import { useNavigate } from 'react-router-dom'
// import { loginActions } from '../../store'
// import { useDispatch } from 'react-redux'


// const StudentRegister = ({setRegister}) => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const registerHandler = () => {
//     dispatch(loginActions.loginToggler())
//     navigate('/')
//   }
//   return (
//     <LoginContainer >
//       <LoginInnerContainer>
//         <FormStyle>
//         <h3> Student Register</h3>
//           <InputStyle>
//           <BsFillPersonVcardFill style={loginIcons} />
//           <input type="text" id='firstname' placeholder='Type your first name'/>
//           </InputStyle>
//           <InputStyle>
//           <BsPersonVcard style={loginIcons} />
//           <input type="text" id='lastname' placeholder='Type your last name'/>
//           </InputStyle>
//           <InputStyle>
//           <TbUserCircle style={loginIcons} />
//           <input type="text" id='email' placeholder='Type your email'/>
//           </InputStyle>
//           <InputStyle>
//           <RiLockPasswordFill style={loginIcons}/>
//           <input type="password" id='password'  placeholder='Type your password' />
//           </InputStyle>
//           <LoginBtn onClick={registerHandler}> Register </LoginBtn>
//         </FormStyle>
//         {/* Not a user */}
//         <NotAnUser >
//          <div>
//           <p>Already a User?</p>
//           <LoginBtn onClick={() => {
//             navigate("/login")
//           }} > Login Here </LoginBtn>
//          </div>
//          <div>
//           <p>Are You a Teacher?</p>
//           <LoginBtn onClick={() => {
//             setRegister("teacher")
//           }}> Register Here </LoginBtn>
//          </div>
//         </NotAnUser>
//       </LoginInnerContainer> 
//     </LoginContainer >
    
//   )
// }

// export default StudentRegister


import {useState}from 'react'
import { FormStyle, LoginContainer, InputStyle, LoginInnerContainer, LoginBtn, NotAnUser } from '../../components/styled/LoginStyle.styled'
import {TbUserCircle} from "react-icons/tb"
import {RiLockPasswordFill} from "react-icons/ri"
import {BsFillPersonVcardFill} from "react-icons/bs"
import {BsPersonVcard} from "react-icons/bs"
import { loginIcons } from '../../components/styled/iconStylers'
import { useNavigate } from 'react-router-dom'
// import { updateUserFullName } from '../../store'
import { useDispatch } from 'react-redux'
import axios from "axios"


const StudentRegister = ({setRegister}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState("")
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // userType: "student"
   })


  const registerHandler = async (e) => {
    // dispatch(loginActions.loginToggler())
    // navigate('/')
    console.log(data);
    e.preventDefault()
    try {
      const url = "http://localhost:8080/api/users";
      const {data: res} = await axios.post(url, data)
      // dispatch(updateUserFullName({ firstName: data.firstName, lastName: data.lastName }));
      navigate("/login")
      console.log(res);
    } catch (error) {
      if(error.response && error.response.status >= 400 && error.response.status <= 500 ) {
        setError(error.response.data.message)
      }
    }
  }

   const handleChange = ({currentTarget: input}) => {
    setData({...data, [input.name]: input.value})
  }
  

  return (
    <LoginContainer >
      <LoginInnerContainer>
        <FormStyle>
        <h3> Student Register</h3>
          <InputStyle>
          <BsFillPersonVcardFill style={loginIcons} />
          <input 
          type="text"
          id='firstname'
          placeholder='Type your first name'
          name="firstName"
          value={data.firstName}
          onChange={handleChange}
          required
          />
          </InputStyle>
          <InputStyle>
          <BsPersonVcard style={loginIcons} />
          <input
           type="text"
           id='lastname'
           placeholder='Type your last name'
           name="lastName"
           value={data.lastName}
           onChange={handleChange}
           required
           />
          </InputStyle>
          <InputStyle>
          <TbUserCircle style={loginIcons} />
          <input type="email"
           id='email'
           placeholder='Type your email'
           name='email'
           value={data.email}
           required
           onChange={handleChange}
           />
          </InputStyle>
          <InputStyle>
          <RiLockPasswordFill style={loginIcons}/>
          <input type="password"
           id='password'
           name='password'
           placeholder='Type your password'
           onChange={handleChange}
           value={data.password}
           required
           />
          </InputStyle>
          
          { // don't forget to style the error
          error && <div >{error}</div>}
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
          <p>Are You a Teacher?</p>
          <LoginBtn onClick={() => {
            setRegister("teacher")
          }}> Register Here </LoginBtn>
         </div>
        </NotAnUser>
      </LoginInnerContainer> 
    </LoginContainer >
    
  )
}

export default StudentRegister


