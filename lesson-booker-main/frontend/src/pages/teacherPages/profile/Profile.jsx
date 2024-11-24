import styled from "./Profile.module.css"
import Navbar from "../../../components/navbar/Navbar"
import Toefl from "../../../assets/certificates/TOEFL_Certificate.png"
import teachingCert from "../../../assets/certificates/English_Teacher_Certificate.png"
import { useState } from "react"
import CertificateModal from "./CertificateModal"
import { Link } from "react-router-dom"
import ProfileEditor from "./profileEditor/ProfileEditor"
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
            <div>
            <h3>Completed Lessons: </h3>
            <h3>Awaiting Lessons</h3>
            <h3>Students</h3>
            <Link to={"/lessoninfo"} className={styled.tdLessons}> <h4>Today's Lessons</h4></Link>
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