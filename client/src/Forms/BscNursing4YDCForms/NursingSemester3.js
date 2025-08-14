import React from 'react';
import FormComponent4 from '../BscNursing4YDCForms/FormComponent4';

const subjectsData = [
  {
    title: "MICR 201 Apllied Microbiology and Infection Control Including Safety",
    credits: 3,
    maxIA: 25,
    maxSE: 75,
    marksIA: 20,
    marksSE: 22,
    percentage: "84%",
    grade: "A",
    gradePoint: 8,
    creditPoints: 16,
    result: "Pass",
  },
  {
    title: "N-AHN(1) 215 Adult Health (Medical Surgical) Nursing I (Theory)",
    credits: 7,
    maxIA: 25,
    maxSE: 75,
    marksIA: 20,
    marksSE: 22,
    percentage: "84%",
    grade: "A",
    gradePoint: 8,
    creditPoints: 16,
    result: "Pass",
  },
  {
    title: "N-AHN(1) 215 Adult Health (Medical Surgical) Nursing I (Practical)",
    credits: 7,
    maxIA: 50,
    maxSE: 50,
    marksIA: 20,
    marksSE: 22,
    percentage: "84%",
    grade: "A",
    gradePoint: 8,
    creditPoints: 16,
    result: "Pass",
  },

];

const NursingSemester3 = () => {
  return (
    <FormComponent4
      title="Third Year B.Sc. Nursing Marks Memo 4YDC"
      subjectsData={subjectsData}
    />
  );
};

export default NursingSemester3;
