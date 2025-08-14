import React from 'react';
import FormComponentBPT from '../../Forms/BachelorofPhysiotherapyForms/FormComponentBPT';

const subjectsData = [
  {
    name: "P.T in Neurology",
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
    name: "P.T in Orthopedics",
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
    name: "P.T in Cardio-thoratic Surgery",
    theoryMax: 100,
    theoryMin: 50,
    theorySecured: '',
    practicalMax: 50,
    practicalMin: 25,
    practicalSecured: '',
    totalMax: 150,
    totalMin: 75,
    result: 'Pass'
  },
  {
    name: "Rehabilation Medicines",
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

const BPTSemester7 = () => {
  return (
    <FormComponentBPT
      title="Bachelor of Physiotherapy (BPT) – 7th Semester Final Examination Marks Memo"
      subjectsData={subjectsData}
    />
  );
};

export default BPTSemester7 ;
