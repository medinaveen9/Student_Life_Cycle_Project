import React from 'react';
import FormComponentBPT from '../../Forms/BachelorofPhysiotherapyForms/FormComponentBPT';

const BPTSemester1 = () => {
  const subjectsData = [

      {
        name: 'Psychology &  and Sociology',
        theoryMax: 1505,
        theoryMin: 75,
        theorySecured: 110,
        practicalMax: 'NA',
        practicalMin: 'NA',
        practicalSecured: '',
        totalMax: 150,
        totalMin: 75,
        result: 'Pass'
      },
      {
        name: 'Psychology &  and Sociology',
        theoryMax: 1505,
        theoryMin: 75,
        theorySecured: 110,
        practicalMax: 'NA',
        practicalMin: 'NA',
        practicalSecured: '',
        totalMax: 150,
        totalMin: 75,
        result: 'Pass'
      },
    ];
    
  return (
    <div>
      <FormComponentBPT
        title="Bachelor of Physiotherapy (BPT) – 1st Semester Final Examination Marks Memo"
        subjectsData={subjectsData}
          idLabel="Student ID"
      />
    </div>
  );
};
export default BPTSemester1;
