import FormComponentHMC from './FormComponentHMC'
const subjectsData = [
  {
    subject: 'Health Systems &Services',
    internalMax: 20,
    internalSecured: 18,
    theoryMax: 60,
    theorySecured: 48,
    practicalMax: 20,
    practicalSecured: 18,
    result: 'Pass' 
  },
  {
    subject: 'Accounting Hospital Management',
    internalMax: 20,
    internalSecured: 16,
    theoryMax: 60,
    theorySecured: 45,
    practicalMax: 20,
    practicalSecured: 17,
    result: 'Pass'
  },
  {
    subject: 'Principles of Management',
    internalMax: 20,
    internalSecured: 19,
    theoryMax: 60,
    theorySecured: 50,
    practicalMax: 20,
    practicalSecured: 20,
    result: 'Pass'
  }
];

const HMCFirstYearSemester2 = () => {
  const studentInfo = {
    rollNumber: 'AN2023001',
    name: 'John Doe',
    soName: 'Michael Doe',
    date: new Date().toISOString()
  };

  return (
    <FormComponentHMC
      title=" Hospital Management Course First Semester 2 Marks Memo"
      subjectsData={subjectsData}
      studentInfo={studentInfo}
    />
  );
};

export default HMCFirstYearSemester2;