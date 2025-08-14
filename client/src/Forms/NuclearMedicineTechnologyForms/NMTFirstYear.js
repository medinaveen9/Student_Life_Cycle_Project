import FormComponentNMT from '../NuclearMedicineTechnologyForms/FormComponentNMT';

const NMTFirstYear = () => {
  const subjectsData = [
    {
      paperNo: 'I',
      subject: 'Anatomy, Physiology & Basic Chemistry, Physics and Maths',
      theoryMax: 100,
      theorySecured: 85,
      practicalMax: null,
      practicalSecured: null,
      totalMax: 100,
      totalSecured: 85
    },
    {
      paperNo: 'II',
      subject: 'Radiation Physics, Radiation Biology, Radiation Protection, Radiation Detectors & Measurements',
      theoryMax: 100,
      theorySecured: 78,
      practicalMax: 100,
      practicalSecured: 92,
      totalMax: 400,
      totalSecured: 370
    },
    {
      paperNo: 'III',
      subject: 'Radio isotope Applications, Applied mathematics & Biostatistics and Computer Applications',
      theoryMax: 100,
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
    examTitle: 'First Year Final Examination',
    examDate: '',
    submissionDate: new Date().toISOString(),
    result: true 
  };

  return (
    <FormComponentNMT
      title="Postgraduate Diploma First Year in Nuclear Medicine Technology"
      subjectsData={subjectsData}
      studentInfo={studentInfo}
    />
  );
};

export default NMTFirstYear;