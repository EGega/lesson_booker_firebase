import React from 'react'
import styled from "./NavbarModule.module.css"
import { useNavigate } from 'react-router-dom'
const NavbarModule = ({img}) => {
    const navigate = useNavigate()
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
            <li onClick={() => {
            navigate('/login')
            }}>Log Out</li>
        </ul>
      </div>
    </>
  )
}

export default NavbarModule