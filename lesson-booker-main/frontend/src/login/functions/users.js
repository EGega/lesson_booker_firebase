import { db } from "../../firebase/firebase"; 
import { collection, addDoc } from "firebase/firestore";

export const addStudentUser = async (firstName, lastName, userId, ) => {
  try {
    const usersRef = collection(db, "students");
    
    await addDoc(usersRef, {
      firstName,
      lastName,
      userId,
      createdAt: new Date(),
    });
    
  } catch (error) {
    console.error("Error adding user: ", error);
  }
};
export const addTeacherUser = async (firstName, lastName, userId ) => {
  try {
    const usersRef = collection(db, "teachers");
    
    await addDoc(usersRef, {
      firstName,
      lastName,
      userId,
      createdAt: new Date(),
    });
    
  } catch (error) {
    console.error("Error adding user: ", error);
  }
};