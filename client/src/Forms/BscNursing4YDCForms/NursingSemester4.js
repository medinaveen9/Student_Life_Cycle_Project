import React from 'react';
import FormComponent4 from '../BscNursing4YDCForms/FormComponent4';

const subjectsData = [
  {
    title: "PHAR (1&2)205 & PATH(1&2)210 Pharmacology (1&2) & Pathology(1&2) including genitics",
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
    title: "N-AHN(2) 225 Adult Health Nursing 2 with integrated pathophysiology including geriatrics Nursing & palliative care",
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
    title: "PROF 230 Professionalism Proffessional Values & Ethics incl.Bioethics",
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
  {
    title: "# ELECTIVE 1 Diabetes Care",
    credits: "1",
    maxIA: 0,
    maxSE: 100,
    marksIA: 0,
    marksSE: 75,
    percentage: "75%",
    grade: "B+",
    gradePoint: 7,
    creditPoints: 7,
    result: "Pass"
  }
  
];

const NursingSemester4= () => {
  return (
    <FormComponent4
      title="Fourth Semester B.Sc. Nursing Marks Memo 4YDC"
      subjectsData={subjectsData}
    />
  );
};

export default NursingSemester4;
