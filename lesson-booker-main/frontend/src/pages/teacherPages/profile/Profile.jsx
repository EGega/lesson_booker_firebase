import styled from "./Profile.module.css"
import Navbar from "../../../components/navbar/Navbar"
import Toefl from "../../../assets/certificates/TOEFL_Certificate.png"
import teachingCert from "../../../assets/certificates/English_Teacher_Certificate.png"
import { useState } from "react"
import CertificateModal from "./CertificateModal"
import { Link } from "react-router-dom"
import ProfileEditor from "./profileEditor/ProfileEditor"
import CompletedTeacheLessons from "../classes/teacherClasses/CompletedTeacheLessons"

const Profile = () => {
  const [enlargedImg, setenlargedImg] = useState(null)

  const openCertModal = (imageURl) => {
    setenlargedImg(imageURl)
  }
  const closeCertModal = () => {
    setenlargedImg(null)
  }
  return (
    <>
    <Navbar />
    <div className={styled.container}>
         <div className={styled.personalInfo}>
          <div className={styled.leftSide}>
          <ProfileEditor />
          </div>
          <div className={styled.middleSide}>
            <h2>Certificates</h2>
            <img src={Toefl} alt="" onClick={ () => openCertModal(Toefl)} />
            <img src={teachingCert} alt="" onClick={ () => openCertModal(teachingCert)} />
          </div>
          <div className={styled.rightSide}>
            <h2>General Info</h2>
            <div className={styled.lists}>
            <li> <Link to="/completed-teacher-lessons">Completed Lessons</Link> </li>
            <li><Link to="/awaiting-teacher-lessons">Awaiting Lessons</Link></li>
            <li> <Link to="/personal-students">Students</Link> </li>
            <li>
            <Link to={"/lessoninfo"} className={styled.tdLessons}> Today's Lessons</Link>
            </li> 
            </div>
          </div>
         </div>
    </div>
      {enlargedImg && (
        <CertificateModal imageUrl={enlargedImg} onClose={closeCertModal} />
      )}
    </>
  )
}

export default Profile