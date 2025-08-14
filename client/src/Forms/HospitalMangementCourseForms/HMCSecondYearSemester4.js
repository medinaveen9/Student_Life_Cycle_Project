import FormComponentHMC from './FormComponentHMC';

const subjectsData = [
  {
    subject: 'Hospital Human Resources Management',
    internalMax: 20,
    internalSecured: 18,
    theoryMax: 60,
    theorySecured: 48,
    practicalMax: 20,
    practicalSecured: 18,
    result: 'Pass' 
  },
  {
    subject: 'Total Quality Management',
    internalMax: 20,
    internalSecured: 16,
    theoryMax: 60,
    theorySecured: 45,
    practicalMax: 20,
    practicalSecured: 17,
    result: 'Pass'
  },
  {
    subject: 'Hospital Planning',
    internalMax: 20,
    internalSecured: 19,
    theoryMax: 60,
    theorySecured: 50,
    practicalMax: 20,
    practicalSecured: 20,
    result: 'Pass'
  }
];

const HMCFirstYearSemester4 = () => {
  const studentInfo = {
    rollNumber: 'AN2023001',
    name: 'John Doe',
    soName: 'Michael Doe',
    date: new Date().toISOString()
  };

  return (
    <FormComponentHMC
       title="Hospital Management Course SecondYear Semester 4 Marks Memo"
      subjectsData={subjectsData}
      studentInfo={studentInfo}
    />
  );
};

export default HMCFirstYearSemester4;