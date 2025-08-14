import FormComponentAnesthesia2 from '../BscAnesthesiaForms/FormComponentAnesthesia2';

const subjectsData = [
  {
    subject: '',
    internalMax: 20,
    internalSecured: 18,
    theoryMax: 60,
    theorySecured: 48,
    practicalMax: 20,
    practicalSecured: 18,
    result: 'Pass' 
  },
  {
    subject: '',
    internalMax: 20,
    internalSecured: 16,
    theoryMax: 60,
    theorySecured: 45,
    practicalMax: 20,
    practicalSecured: 17,
    result: 'Pass'
  },
  {
    subject: '',
    internalMax: 20,
    internalSecured: 19,
    theoryMax: 60,
    theorySecured: 50,
    practicalMax: 20,
    practicalSecured: 20,
    result: 'Pass'
  }
];

const AnesthesiaThirdYear = () => {
  const studentInfo = {
    rollNumber: 'AN2023001',
    name: 'John Doe',
    soName: 'Michael Doe',
    date: new Date().toISOString()
  };

  return (
    <FormComponentAnesthesia2
      title="Third Year B.Sc. Anesthesia Technology Marks Memo"
      subjectsData={subjectsData}
      studentInfo={studentInfo}
    />
  );
};

export default AnesthesiaThirdYear;