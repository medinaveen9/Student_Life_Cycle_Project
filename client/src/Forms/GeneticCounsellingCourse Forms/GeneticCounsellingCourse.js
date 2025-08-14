import FormComponentGenetic  from '../GeneticCounsellingCourse Forms/FormComponentGenetic';

const GeneticCounsellingCourse = () => {
  const subjectsData = [
    {
      paperNo: 'I',
      subject: 'BASIC SCIENCES (PRINCIPLES OF MEDICAL GENETICS & GENETIC & GENETIC COUNSELLING',
      theoryMax: 100,
      theorySecured: 85,
      internallMax: null,
      internalSecured: null,
      totalMax: 100,
      totalSecured: 85
    },
    {
      paperNo: 'II',
      subject: 'APPLIED GENETIC COUNSELLING (CLINICAL APPLICATIONS)',
      theoryMax: 100,
      theorySecured: 78,
      internalMax: 100,
      internalSecured: 92,
      totalMax: 400,
      totalSecured: 370
    },
    {
      paperNo: 'III',
      subject: 'RECENT ADVANCES (IN GENETICS AND GENETIC COUNSELLING)',
      theoryMax: 100,
      theorySecured: 82,
      internalMax: null,
      internalSecured: null,
      totalMax: 100,
      totalSecured: 82
    },
    {
        paperNo: '',
        subject: 'PRACTICAL AND VIVA VOICE',
        theoryMax: 200,
        theorySecured: 82,
        practicalMax: null,
        practicalSecured: null,
        totalMax: 100,
        totalSecured: 82
      }
  ];

  const studentInfo = {
    rollNumber: '',
    name: '',
    parentName: '',
    examTitle: '',
    examDate: '',
    submissionDate: new Date().toISOString(),
    result: true 
  };

  return (
    <FormComponentGenetic
      title="Postgraduate Diploma in Nuclear Medicine Technology"
      subjectsData={subjectsData}
      studentInfo={studentInfo}
    />
  );
};

export default GeneticCounsellingCourse;