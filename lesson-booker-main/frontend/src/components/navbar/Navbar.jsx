import React from 'react'
import maleAvatar from "../../assets/maleAvatar.jpg"
import { NavbarStyle } from '../styled/navbarStyled/navbar'
import { Link } from 'react-router-dom'
import styles from "./Navbar.module.css"
import { LoginBtn } from '../styled/LoginStyle.styled'
import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import NavbarModule from './navbarModule/NavbarModule'
import Numerator from '../../shopping/numerator/Numerator'
import { auth, db } from '../../firebase/firebase'
import {doc, getDoc} from 'firebase/firestore'
import { useTeacher } from '../../context/TeacherProvider'

const Navbar = () => {
const {logged, role,} =  useSelector((state) => state.login)
const {user} = useSelector((state) => state)
// const profileImage = useSelector((state) => state.user.profileImage);
const { profileImage } = useSelector((state) => state.teacher);

  const [navbarModuleVisibility, setNavbarModuleVisibility] = useState(false)
  const { setTeacherID } = useTeacher();
  // const [teacherPhotoUrl, setTeacherPhotoUrl] = useState(null)
  const avatarSrc = profileImage ?? auth.currentUser?.photoURL ?? maleAvatar;


  const [profileImageUrl, setProfileImageUrl] = useState(null);

  useEffect(() => {
    // Fetch the teacher's profile image URL
    const fetchTeacherProfileImage = async () => {
      try {
        const teacherDocRef = doc(db, "teachers", auth.currentUser.uid);
        const docSnap = await getDoc(teacherDocRef);
        
        if (docSnap.exists()) {
          const teacherData = docSnap.data();
          const teacherProfileImageUrl = teacherData.profileImage; // Assuming `profileImage` is the field name
          setProfileImageUrl(teacherProfileImageUrl); // Set the profile image URL in state
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching teacher profile image:", error);
      }
    };

    fetchTeacherProfileImage();
  }, []);

  return (
    <> 
      {role === "student" ? 
        <NavbarStyle>
          <div className={styles.linkDiv}>
            <li><Link to="/student-profile">Profile</Link></li>
            <li><Link to="/student-classes">My Lessons</Link></li>
            <li onClick={() => setTeacherID(null)}><Link to="/calendar">Book a Lesson</Link></li>
          </div>
          <div className={styles.imgDiv}>
            <LoginBtn><Link to="/">Home</Link></LoginBtn>
            <Link to="/student-profile">{auth.currentUser.displayName}</Link>
            <div className={styles.imageDiv}>
              <img 
                className={styles.avatarImage} 
                onClick={() => setNavbarModuleVisibility(prev => !prev)} 
                src={avatarSrc} 
                alt={auth.currentUser.displayName}
              />
              <Numerator/>
            </div> 
          </div>
          {navbarModuleVisibility && <NavbarModule img={avatarSrc} className={styles.navbarModule} />}
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
            <Link to="/profile">{`Teacher ${auth.currentUser.displayName}`}</Link>
            <div className={styles.imageDiv}>
              <img 
                className={styles.avatarImage} 
                onClick={() => setNavbarModuleVisibility(prev => !prev)} 
                src={avatarSrc} 
                alt={auth.currentUser.displayName}
              />
              <Numerator/>
            </div> 
          </div>
          {navbarModuleVisibility && <NavbarModule img={avatarSrc} className={styles.navbarModule} />}
        </NavbarStyle>
      }
    </>
  );
}

export default Navbar

