import { createContext, useState, useContext } from "react";

const TeacherContext = createContext();

export const TeacherProvider = ({ children }) => {
  const [teacherID, setTeacherID] = useState(null);
  return (
    <TeacherContext.Provider value={{ teacherID, setTeacherID }}>
      {children}
    </TeacherContext.Provider>
  );
};

export const useTeacher = () => useContext(TeacherContext);
