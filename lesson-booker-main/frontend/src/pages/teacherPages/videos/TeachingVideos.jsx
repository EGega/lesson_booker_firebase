import React from 'react'
import { collection, query, where, getDocs} from "firebase/firestore";
import { auth, db } from '../../../firebase/firebase';

const TeachingVideos = () => {
  const videosCollectionRef = collection(db, "events")
  return (
    <>
    <div></div>
    </>
  )
}

export default TeachingVideos