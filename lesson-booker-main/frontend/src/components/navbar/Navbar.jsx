import React from 'react'
import maleAvatar from "../../assets/maleAvatar.jpg"
import { NavbarStyle } from '../styled/navbarStyled/navbar'
import { Link } from 'react-router-dom'
import styles from "./Navbar.module.css"
import { LoginBtn } from '../styled/LoginStyle.styled'
import {useState} from 'react'
import { useSelector } from 'react-redux'
import NavbarModule from './navbarModule/NavbarModule'
import Numerator from '../../shopping/numerator/Numerator'
import { auth } from '../../firebase/firebase'
import { useTeacher } from '../../context/TeacherProvider'
const Navbar = () => {
const {logged, role,} =  useSelector((state) => state.login)
const {user} = useSelector((state) => state)

  const [navbarModuleVisibility, setNavbarModuleVisibility] = useState(false)
  const { setTeacherID } = useTeacher();
  return (
    <> 
    {role === "student" ? 
    <NavbarStyle>
     <div className={styles.linkDiv}>
      <li><Link to="/student-profile">Profile</Link></li>
      <li><Link to="/student-classes"> My Lessons</Link></li>
      <li onClick={() => setTeacherID(null)}><Link to="/calendar">Book a Lesson</Link></li>
     </div>
     <div className={styles.imgDiv}>
      <LoginBtn><Link to="/">Home</Link></LoginBtn>
      <Link to="/student-profile"> {auth.currentUser.displayName}</Link>
      <div className={styles.imageDiv}>
       <img className={styles.avatarImage} onClick={() => {
         setNavbarModuleVisibility((prevValue) => !prevValue)
       }} src={auth.currentUser.photoURL ?? maleAvatar} alt={auth.currentUser.displayName}/>
       <Numerator/>
      </div> 
     </div>
      {/* The code below is just another way to create an "effective toggler that I just came up with"  */}
      {/* { navbarModule % 2 === 0 ? <NavbarModule className={styles.navbarModule} /> : null} */}

      {navbarModuleVisibility && <NavbarModule img={auth.currentUser.photoURL ?? maleAvatar} className={styles.navbarModule} />}

    </NavbarStyle> 
    :
    <NavbarStyle>
    <div className={styles.linkDiv}>
     <li><Link to="/profile">Profile</Link></li>
     <li><Link to="/classes">Bookings</Link></li>
     <li><Link to="/slots">Slots</Link></li>
    </div>
    <div className={styles.imgDiv}>
     <LoginBtn><Link to="/">Home</Link></LoginBtn>
     <Link to="/profile"> { `Teacher ${auth.currentUser.displayName}`}</Link>
     <div className={styles.imageDiv}>
      <img className={styles.avatarImage} onClick={() => {
        setNavbarModuleVisibility((prevValue) => !prevValue)
      }} src={auth.currentUser.photoURL ?? maleAvatar} alt={auth.currentUser.displayName}/>
      <Numerator/>
     </div> 
    </div>
     {/* The code below is just another way to create an "effective toggler that I just came up with"  */}
     {/* { navbarModule % 2 === 0 ? <NavbarModule className={styles.navbarModule} /> : null} */}

     {navbarModuleVisibility && <NavbarModule img={auth.currentUser.photoURL ?? maleAvatar} className={styles.navbarModule} />}

   </NavbarStyle>
    
  }

    </>

  )
}

export default Navbar

