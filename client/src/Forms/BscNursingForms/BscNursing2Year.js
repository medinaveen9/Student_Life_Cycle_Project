import React from 'react';
import FormComponent2 from '../BscNursingForms/FormComponent2';

const subjectList = [
  
  { name: 'SOCIOLOGY', maxMarks: 100, minMarks: 40, secured: '200', result: '340' },
  { name: 'MEDICAL SURGICAL NURSING', maxMarks: 100, minMarks: 40, secured: '50', result: '190' },
  { name: 'PHARMALOGICAL,PATHOLOGY, &GENITICS', maxMarks: 100, minMarks: 40, secured: '60', result: '200' },
  { name: 'COMMUNITY HEALTH NURSING', maxMarks: 100, minMarks: 40, secured: '', result: '' },
  { name: 'COMMUNICATION & EDUCATION TECHNOLOGY', maxMarks: 100, minMarks: 40, secured: '', result: '' },
  { name: 'COMMUNITY HEALTH NURSING', maxMarks: 100, minMarks: 40, secured: '', result: '' },
  { name: 'MEDICAL SURGICAL NURSING', maxMarks: 100, minMarks: 40, secured: '', result: '' },
];

const BscNursing2Year = () => {
  return <FormComponent2 title="Bsc Nursing 2nd Year" subjectsData={subjectList} />;
};

export default BscNursing2Year;
