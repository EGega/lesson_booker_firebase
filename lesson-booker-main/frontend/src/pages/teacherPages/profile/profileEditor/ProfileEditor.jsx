import { useState, useEffect } from 'react'
import avatar from '../../../../assets/maleAvatar.jpg'
import styled from './ProfileEditor.module.css'
import Navbar from '../../../../components/navbar/Navbar'
import { db, auth } from '../../../../firebase/firebase'
import { updateDoc, doc, onSnapshot } from "firebase/firestore" 
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { IoIosCloudUpload } from 'react-icons/io'
import { setProfileImage } from '../../../../store'
import { useDispatch } from 'react-redux'


const ProfileEditor = () => {
  const dispatch = useDispatch()
  const [teacherInfo, setTeacherInfo] = useState({
    firstName: "",
    lastName: "",
    profession: "",
    birthYear: "",
    country: "",
    introVideo: "",
    gender: "",
    profileImage: ""
  })
  const [editing, setEditing] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  // Fetch teacher data
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "teachers", auth.currentUser.uid), (docSnap) => {
      if (docSnap.exists()) {
        setTeacherInfo(docSnap.data())
      }
    })
    return () => unsubscribe()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsUpdating(true)
    try {
      await updateDoc(doc(db, "teachers", auth.currentUser.uid), teacherInfo)
      setEditing(false)
    } catch (error) {
      console.error("Error updating document: ", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 1 * 1024 * 1024) {
      alert("Maximum image size is 1MB")
      return
    }

    setIsUpdating(true)
    try {
      const storage = getStorage()
      const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}/${Date.now()}_${file.name}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)

      if (teacherInfo.profileImage) {
        try {
          const oldImageRef = ref(storage, teacherInfo.profileImage)
          await deleteObject(oldImageRef)
        } catch (error) {
          console.log("Error deleting old image:", error)
        }
      }

      const updatedInfo = { ...teacherInfo, profileImage: url }
      setTeacherInfo(updatedInfo)
      await updateDoc(doc(db, "teachers", auth.currentUser.uid), updatedInfo)

      dispatch(setProfileImage(url));
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <>
      {!editing ? (
        <div className={styled.profileContainer}>
          <img 
            src={teacherInfo.profileImage || avatar} 
            className={styled.image} 
            alt="Profile" 
            onError={(e) => { e.target.src = avatar }}
          />
          <h3 className={styled.name}>{teacherInfo.firstName} {teacherInfo.lastName}</h3>
          <h3 className={styled.detail}>{teacherInfo.profession}</h3>
          <h3 className={styled.detail}>{teacherInfo.country}</h3>
          <h3 className={styled.detail}>{teacherInfo.profession}</h3>
          <h3 className={styled.detail}>{new Date().getFullYear() - teacherInfo?.birthYear}</h3>
          {teacherInfo.introVideo && (
            <a className={styled.videoLink} href={teacherInfo.introVideo} target="_blank" rel="noreferrer">
              Intro Video
            </a>
          )}
          <button 
            onClick={() => setEditing(true)} 
            className={styled.editProfile}
            disabled={isUpdating}
          >
            {isUpdating ? 'Loading...' : 'Edit Profile'}
          </button>
        </div>
      ) : (
        <form className={styled.form} onSubmit={handleSubmit}>
          <Navbar />
          <button 
            type="button" 
            className={styled.closeBtn} 
            onClick={() => !isUpdating && setEditing(false)}
            disabled={isUpdating}
          >
            X
          </button>
          
          <label className={styled.fileInputLabel}>
            <IoIosCloudUpload className={styled.uploadIcon}/> Change Profile Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isUpdating}
              className={styled.fileInput}
            />
          </label>

          <input 
            type="text"
            value={teacherInfo.firstName}
            onChange={(e) => setTeacherInfo({...teacherInfo, firstName: e.target.value })}
            placeholder="First Name"
            className={styled.inputField}
            disabled={isUpdating}
          />
          
          <input 
            type="text"
            value={teacherInfo.lastName}
            onChange={(e) => setTeacherInfo({...teacherInfo, lastName: e.target.value })}
            placeholder="Last Name"
            className={styled.inputField}
            disabled={isUpdating}
          />
          
          <input 
            type="text"
            value={teacherInfo.profession}
            onChange={(e) => setTeacherInfo({...teacherInfo, profession: e.target.value })}
            placeholder="Profession"
            className={styled.inputField}
            disabled={isUpdating}
          />
          
          <input 
            type="number"
            value={teacherInfo.birthYear}
            onChange={(e) => setTeacherInfo({...teacherInfo, birthYear: e.target.value })}
            placeholder="Birth Year"
            className={styled.inputField}
            disabled={isUpdating}
          />
          
          <input 
            type="text"
            value={teacherInfo.country}
            onChange={(e) => setTeacherInfo({...teacherInfo, country: e.target.value })}
            placeholder="Country"
            className={styled.inputField}
            disabled={isUpdating}
          />
          
          <input 
            type="text"
            value={teacherInfo.introVideo}
            onChange={(e) => setTeacherInfo({...teacherInfo, introVideo: e.target.value })}
            placeholder="Intro Video URL"
            className={styled.inputField}
            disabled={isUpdating}
          />

          <select
            value={teacherInfo.gender}
            onChange={(e) => setTeacherInfo({...teacherInfo, gender: e.target.value })}
            className={styled.selectField}
            disabled={isUpdating}
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <button 
            type="submit" 
            className={styled.submitBtn}
            disabled={isUpdating}
          >
            {isUpdating ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      )}
    </>
  )
}

export default ProfileEditor