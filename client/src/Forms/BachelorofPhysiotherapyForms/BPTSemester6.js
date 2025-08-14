import React from 'react';
import FormComponentBPT from '../../Forms/BachelorofPhysiotherapyForms/FormComponentBPT';

const subjectsData = [
  {
    name: "Clinical Neurology",
    theoryMax: 150,
    theoryMin: 75,
    theorySecured: '',
    practicalMax: 50,
    practicalMin: 25,
    practicalSecured: '',
    totalMax: 200,
    totalMin: 100,
    result: 'Fail'
  },
  {
    name: "Clinical Orthopedics",
    theoryMax: 150,
    theoryMin: 75,
    theorySecured: '',
    practicalMax: 50,
    practicalMin: 25,
    practicalSecured: '',
    totalMax: 200,
    totalMin: 100,
    result: 'Fail'
  },
  {
    name: "Clinical Cardio-thoracic Surgery",
    theoryMax: 100,
    theoryMin: 50,
    theorySecured: '',
    practicalMax: 50,
    practicalMin: 25,
    practicalSecured: '',
    totalMax: 150,
    totalMin: 75,
    result: 'Pass'
  }
];

const BPTSemester6 = () => {
  return (
    <FormComponentBPT
        title="Bachelor of Physiotherapy (BPT) – 6th Semester Final Examination Marks Memo"
      subjectsData={subjectsData}
    />
  );
};

export default BPTSemester6 ;
