
import React, { createContext, useContext, useState } from "react";


const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courseName, setCourseName] = useState("");
    const [socialStatus, setSocialStatus] = useState(""); // NEW

  return (
    <CourseContext.Provider value={{ courseName, setCourseName, socialStatus, setSocialStatus }}>
      {children}
    </CourseContext.Provider>
  );
};


export const useCourse = () => useContext(CourseContext);
