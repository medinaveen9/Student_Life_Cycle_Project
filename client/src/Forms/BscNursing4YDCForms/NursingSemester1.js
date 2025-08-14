import React from 'react';
import FormComponent4 from '../BscNursing4YDCForms/FormComponent4';

const subjectsData = [
  {
    title: "BIOC 135 & NUTR 140 Applied Biochemistry and Applied Nutrition & Dietrics",
    credits:5,
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
    title: "N -F (1 & 2) 125 Nursing Foundation 1 & 2 incl. Health Assessment Module-Theory ",
    credits:12,
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
    title: "N-NF (1 & 2 )125  Nursing Foundation 1 & 2 incl. Health Assessment Module-Practical  ",
    credits: 11,
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

const NursingSemester1 = () => {
  return (
    <FormComponent4
      title="First Semester B.Sc. Nursing Marks Memo 4YDC"
      subjectsData={subjectsData}
    />
  );
};

export default NursingSemester1;
