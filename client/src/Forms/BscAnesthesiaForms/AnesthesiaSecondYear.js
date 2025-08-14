import FormComponentAnesthesia2 from '../BscAnesthesiaForms/FormComponentAnesthesia2';

const subjectsData = [
  {
    subject: 'Name of the subject',
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

const AnesthesiaSecondYear = () => {
  const studentInfo = {
    rollNumber: '',
    name: '',
    soName: '',
    date: new Date().toISOString()
  };

  return (
    <FormComponentAnesthesia2
      title="Second Year B.Sc. Anesthesia Technology Marks Memo"
      subjectsData={subjectsData}
      studentInfo={studentInfo}
    />
  );
};

export default AnesthesiaSecondYear;