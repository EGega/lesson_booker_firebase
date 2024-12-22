import { db } from "../../firebase/firebase"; 
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

export const addStudentUser = async (firstName, lastName, userId ) => {
  try {
    const userDocRef = doc(db, "students", userId); // Use userId as the document ID

    await setDoc(userDocRef, {
      firstName,
      lastName,
      userId,
      createdAt: new Date(),
    }); 
    
  } catch (error) {
    console.error("Error adding studentuser: ", error);
  }
};
export const addTeacherUser = async (firstName, lastName, userId ) => {
  try {
    const userDocRef = doc(db, "teachers", userId); // Use userId as the document ID

    await setDoc(userDocRef, {
      firstName,
      lastName,
      userId,
      createdAt: new Date(),
    }); 
    
  } catch (error) {
    console.error("Error adding teacher user: ", error);
  }
};