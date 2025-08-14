import React from 'react';
import FormComponentAnesthesia from '../BscAnesthesiaForms/FormComponentAnesthesia';

const subjectsData = [
    { subject: 'Paper I - Name of the Subject',  maxMarks: 80, minMarks: 40, marksSecured: 65 },
    { subject: 'Paper II - Name of the Subject', maxMarks: 80, minMarks: 40, marksSecured: 70 },
    { subject: 'Paper III - Name of the Subject',  maxMarks: 40, minMarks: 20, marksSecured: 35 },
    { subject: 'Practicals',  maxMarks: 120, minMarks: 60, marksSecured: 100 },
  ];
const AnesthesiaFirstYear = () => {
  return (
    <FormComponentAnesthesia
      title="First Year B.Sc. Anesthesia Technology Marks Memo"
      subjectsData={subjectsData}
    />
  );
};

export default AnesthesiaFirstYear;
