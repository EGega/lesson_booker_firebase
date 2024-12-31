import { getDoc, doc } from "firebase/firestore"; 
import { db } from "../../firebase/firebase";

export const fetchTeacherName = async (teacherID) => {
  try {
    const teacherDocRef = doc(db, "teachers", teacherID); 
    const teacherDoc = await getDoc(teacherDocRef);
    if (teacherDoc.exists()) {
      const teacherData = teacherDoc.data();
      return `${teacherData.firstName} ${teacherData.lastName}`; 
    } else {
      console.error("No such teacher found!");
      return "Unknown Teacher";
    }
  } catch (error) {
    console.error("Error fetching teacher details:", error);
    return "Error";
  }
};
