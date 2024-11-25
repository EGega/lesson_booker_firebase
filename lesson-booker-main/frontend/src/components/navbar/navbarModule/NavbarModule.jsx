import React from 'react'
import styled from "./NavbarModule.module.css"
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase/firebase'
const NavbarModule = ({img}) => {
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
    </>
  )
}

export default NavbarModule