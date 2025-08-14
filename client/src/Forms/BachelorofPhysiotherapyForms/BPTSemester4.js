import React from 'react';
import FormComponentBPT from '../../Forms/BachelorofPhysiotherapyForms/FormComponentBPT';

const subjectsData = [
  {
    name: "Excercise Therapy & Massage",
    theoryMax: 150,
    theoryMin: 75,
    theorySecured: '',
    practicalMax: 50,
    practicalMin: 25,
    practicalSecured: '',
    totalMax: 200,
    totalMin: 100,
    result: ''
  },
  {
    name: "ElectroTherapy-1 (Low & Medium Frequency)",
    theoryMax: 150,
    theoryMin: 75,
    theorySecured: '',
    practicalMax: 50,
    practicalMin: 25,
    practicalSecured: '',
    totalMax: 200,
    totalMin: 100,
    result: ''
  },
  {
    name: "General Medicine, General Surgery & Pediatrics",
    theoryMax: 100,
    theoryMin: 50,
    theorySecured: '',
    practicalMax: 50,
    practicalMin: 25,
    practicalSecured: '',
    totalMax: 150,
    totalMin: 75,
    result: ''
  }
];

const BPTSemester4 = () => {
  return (
    <FormComponentBPT
      title="Bachelor of Physiotherapy (BPT) – 4th Semester Final Examination Marks Memo"
      subjectsData={subjectsData}
    />
  );
};

export default BPTSemester4 ;
