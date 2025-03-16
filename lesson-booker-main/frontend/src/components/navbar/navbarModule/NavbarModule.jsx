import React from 'react'
import styled from "./NavbarModule.module.css"
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase/firebase'
import { useSelector } from 'react-redux'
const NavbarModule = ({img}) => {
  const {logged, role,} =  useSelector((state) => state.login)
    const navigate = useNavigate()
    const logOut = async () => {
         try {
          await signOut(auth)
          navigate("/login")
         } catch (error) {
          console.log(error);
          
         }
    }
  return (
    <>
    {role === "student" ?
          <div className={styled.container}>
          <img src={img} className={styled.img} />
          <ul>
              <li onClick={() => {
              navigate('/student-profile')
              }} >Profile</li>
              <li>Settings</li>
              <li>Contact</li>
              <li onClick={logOut}>Log Out</li>
          </ul>
        </div>
        :
    
        <div className={styled.container}>
        <img src={img} className={styled.img} />
        <ul>
            <li onClick={() => {
            navigate('/profile')
            }} >Profile</li>
            <li>Settings</li>
            <li>Contact</li>
            <li onClick={logOut}>Log Out</li>
        </ul>
      </div>
    } 

    </>
  )
}

export default NavbarModule