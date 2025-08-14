import React from 'react';
import FormComponent2 from '../BscNursingForms/FormComponent2';

const subjectList = [
  
  { name: 'MEDICAL SURGICAL NURSING 2', maxMarks: 100, minMarks: 40, secured: '', result: '' },
  { name: 'CHILD HEALTH NURSING', maxMarks: 100, minMarks: 40, secured: '', result: '' },
  { name: 'MENTAL HEEALTH NURSING ', maxMarks: 100, minMarks: 40, secured: '', result: '' },
  { name: 'NURSING RESEARCH AND STATISTICS', maxMarks: 100, minMarks: 40, secured: '', result: '' },
  { name: 'MEDICAL SURGICAL NURSING 2', maxMarks: 100, minMarks: 40, secured: '', result: '' },
  { name: 'CHILD HEALTH NURSING', maxMarks: 100, minMarks: 40, secured: '', result: '' },
  { name: 'MENTAL HEALTH NURSING', maxMarks: 100, minMarks: 40, secured: '', result: '' },
];

const BscNursing3Year = () => {
  return <FormComponent2 title="Bsc Nursing 3rd Year" subjectsData={subjectList} />;
};

export default BscNursing3Year;
