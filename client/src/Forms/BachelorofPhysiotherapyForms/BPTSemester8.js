import React from 'react';
import FormComponentBPT from '../../Forms/BachelorofPhysiotherapyForms/FormComponentBPT';

const subjectsData = [
  {
    name: "Radiology & Imageology",
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
    name: "Geriatric Medicine & Rehabiliatation ",
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
    name: "Sports Medicine & Rehabilitation",
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
    name: "Rehabilation Medicine",
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

const BPTSemester8 = () => {
  return (
    <FormComponentBPT
       title="Bachelor of Physiotherapy (BPT) – 8th Semester Final Examination Marks Memo"
      subjectsData={subjectsData}
    />
  );
};

export default BPTSemester8 ;
