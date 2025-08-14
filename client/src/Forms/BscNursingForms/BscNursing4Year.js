import React from 'react';
import FormComponent2 from '../BscNursingForms/FormComponent2';
const subjectList = [
  
  { name: 'MIDEWIERY AND OBSTERICAL NURSING', maxMarks: 100, minMarks: 40, secured: '2220', result: 'Fail' },
  { name: 'COMMUNITY HEALTH NURSING', maxMarks: 100, minMarks: 40, secured: '', result: 'Fail' },
  { name: 'MANAGEMENT OF NURSING SERVICES & EDUCATION  ', maxMarks: 100, minMarks: 40, secured: '', result: '' },
  { name: 'MIDWIERY & OBSTERICAL NURSING', maxMarks: 100, minMarks: 40, secured: '', result: '' },
  { name: 'COMMUNITY HEALTH NURSING', maxMarks: 100, minMarks: 40, secured: '', result: '' },
  {name: 'MEDICAL SURGICAL NURSING', maxmarks :100, minMarks: 40 , secured:'', result : ''},

];

const BscNursing4Year = () => {
  return <FormComponent2 title="Bsc Nursing 4th Year" subjectsData={subjectList}  idLabel="Hall Ticket" />;
};

export default BscNursing4Year;
 