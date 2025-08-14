import FormComponentMPT from './FormComponentMPT';

const subjectsData = [
  {
    subject: 'Basic sciences',
  
    theoryMax: 60,
    theoryMin: 24,
    theorySecured: 48,
    practicalMax: 20,
    practicalMin: 8,
    practicalSecured: 18,
    totalMax: 100,
    totalMin: 40,
    result: 'Pass'
  },
  {
    subject: 'Biostastics and Research Methodology ',
    internalMax: 205,
    internalSecured: 1556,
    theoryMax: 6055,
    theorySecured: 545,
    practicalMax: 205,
    practicalSecured: 517,
    result: 'Pass'
  },
  {
    subject: 'Physiotherapists-1',
    internalMax: 20,
    internalSecured: 19,
    theoryMax: 60,
    theorySecured: 50,
    practicalMax: 20,
    practicalSecured: 20,
    result: 'Pass'
  }, {
    subject: 'Physiotherapists-2',
 
    theoryMax: 600,
    theoryMin: 254,
    theorySecured: 485,
    practicalMax: 207,
    practicalMin: 8,
    practicalSecured: 18,
    totalMax: 100,
    totalMin: 40,
    result: 'Pass'
  },
];

const MPTFirstYear = () => {
  const studentInfo = {
    rollNumber: 'AN2023001',
    name: 'John Doe',
    soName: 'Michael Doe',
    date: new Date().toISOString()
  };

  return (
    <FormComponentMPT
      title="Master of Physiotherapy FirstYear Marks Memo"
      subjectsData={subjectsData}
      studentInfo={studentInfo}
    />
  );
};

export default MPTFirstYear;