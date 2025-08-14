
import React, { createContext, useContext, useState } from "react";


const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courseName, setCourseName] = useState("");

  return (
    <CourseContext.Provider value={{ courseName, setCourseName }}>
      {children}
    </CourseContext.Provider>
  );
};


export const useCourse = () => useContext(CourseContext);
