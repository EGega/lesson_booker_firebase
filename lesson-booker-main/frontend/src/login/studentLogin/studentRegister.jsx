import {useState,useEffect}from 'react'
import { FormStyle, LoginContainer, InputStyle, LoginInnerContainer, LoginBtn, NotAnUser } from '../../components/styled/LoginStyle.styled'
import {TbUserCircle} from "react-icons/tb"
import {RiLockPasswordFill} from "react-icons/ri"
import {BsFillPersonVcardFill} from "react-icons/bs"
import {BsPersonVcard} from "react-icons/bs"
import { loginIcons } from '../../components/styled/iconStylers'
import { useNavigate } from 'react-router-dom'
// import { updateUserFullName } from '../../store'
import { useDispatch } from 'react-redux'
// import axios from "axios"
import { auth } from '../../firebase/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

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

    e.preventDefault()
    try {
     const userCredentials = await createUserWithEmailAndPassword(auth, data.email, data.password)
     const user = userCredentials.user
     await updateProfile(user, {
      displayName: `${data.firstName} ${data.lastName}`
     })
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


