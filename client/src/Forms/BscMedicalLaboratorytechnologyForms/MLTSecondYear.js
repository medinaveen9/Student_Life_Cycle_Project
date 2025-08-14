import React from 'react';
import FormComponentMLT from '../BscMedicalLaboratorytechnologyForms/FormComponentMLT';

const subjectsData = [
  {
    subject: 'BioChemistry',
    internalMax: 20,
    internalSecured: 18,
    theoryMax: 60,
    theorySecured: 48,
    practicalMax: 20,
    practicalSecured: 18,
    result: 'Pass' 
  },
  {
    subject: 'Microbiology',
    internalMax: 20,
    internalSecured: 16,
    theoryMax: 60,
    theorySecured: 45,
    practicalMax: 20,
    practicalSecured: 17,
    result: 'Pass'
  },
  {
    subject: 'Pathology',
    internalMax: 20,
    internalSecured: 19,
    theoryMax: 60,
    theorySecured: 50,
    practicalMax: 20,
    practicalSecured: 20,
    result: 'Pass'
  }
];

const MLTSecondYear = () => {
  const studentInfo = {
    rollNumber: '',
    name: '',
    soName: '',
    date: new Date().toISOString()
  };

  return (
    <FormComponentMLT
      title="Medical Laboratory Technology SecondYear  Marks Memo"
      subjectsData={subjectsData}
      studentInfo={studentInfo}
    />
  );
};

export default MLTSecondYear;