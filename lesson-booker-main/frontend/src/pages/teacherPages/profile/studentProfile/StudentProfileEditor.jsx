import { useState, useEffect } from 'react'
import Navbar from '../../../../components/navbar/Navbar'
import { db, auth } from '../../../../firebase/firebase'
import { updateDoc, doc, onSnapshot } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import avatar from "../../../../assets/maleAvatar.jpg"
import styled from './StudentProfileEditor.module.css'
import { IoIosCloudUpload } from 'react-icons/io'

const StudentProfileEditor = () => {
  const [studentInfo, setStudentInfo] = useState({
    firstName: "",
    lastName: "",
    birthYear: "",
    gender: "",
    profileImage: ""
  })

  const [editing, setEditing] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  // Fetch student data
  useEffect(() => {
    const studentDocRef = doc(db, "students", auth.currentUser.uid)
    const unsubscribe = onSnapshot(studentDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setStudentInfo(docSnap.data())
      }
    })
    return () => unsubscribe()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsUpdating(true)

    try {
      const studentDocRef = doc(db, "students", auth.currentUser.uid)
      await updateDoc(studentDocRef, studentInfo)
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
      const storageRef = ref(storage, `studentProfileImages/${auth.currentUser.uid}/${Date.now()}_${file.name}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)

      // Delete old image if exists
      if (studentInfo.profileImage) {
        try {
          const oldImageRef = ref(storage, studentInfo.profileImage)
          await deleteObject(oldImageRef)
        } catch (error) {
          console.log("Error deleting old image:", error)
        }
      }

      const updatedInfo = { ...studentInfo, profileImage: url }
      setStudentInfo(updatedInfo)

      const studentDocRef = doc(db, "students", auth.currentUser.uid)
      await updateDoc(studentDocRef, updatedInfo)
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
            src={studentInfo.profileImage || avatar} 
            className={styled.image} 
            alt="Profile" 
            onError={(e) => { e.target.src = avatar }}
          />
          <h3>{studentInfo.firstName}</h3>
          <h3>{studentInfo.lastName}</h3>
          <h3>{studentInfo.birthYear}</h3>
          <h3>{studentInfo.gender}</h3>
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
            onChange={(e) => setStudentInfo({ ...studentInfo, firstName: e.target.value })}
            placeholder="Your name"
            value={studentInfo.firstName}
            className={styled.inputField}
            disabled={isUpdating}
          />
          <input
            type="text"
            value={studentInfo.lastName}
            onChange={(e) => setStudentInfo({ ...studentInfo, lastName: e.target.value })}
            placeholder="Your surname"
            className={styled.inputField}
            disabled={isUpdating}
          />
          <input
            type="number"
            placeholder="Birth Year"
            value={studentInfo.birthYear}
            onChange={(e) => setStudentInfo({ ...studentInfo, birthYear: e.target.value })}
            className={styled.inputField}
            disabled={isUpdating}
          />
          <select
            onChange={(e) => setStudentInfo({ ...studentInfo, gender: e.target.value })}
            name="gender"
            value={studentInfo.gender}
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
            {isUpdating ? 'Saving...' : 'Submit'}
          </button>
        </form>
      )}
    </>
  )
}

export default StudentProfileEditor
