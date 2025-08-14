import FormComponentNMT from '../NuclearMedicineTechnologyForms/FormComponentNMT';
const NMTSecondYear = () => {
  const subjectsData = [
    {
      paperNo: 'I',
      subject: 'Medical INstrumentaion',
      theoryMax: 100,
      theorySecured: 85,
      practicalMax: null,
      practicalSecured: null,
      totalMax: 100,
      totalSecured: 85
    },
    {
      paperNo: 'II',
      subject: 'Radiation Physics, Radiation Biology, Radiation Protection, Radiation Detectors & Measurementsdd',
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
    examTitle: 'NMT Second Year Examination',
    examDate: '',
    submissionDate: new Date().toISOString(),
    result: true 
  };

  return (
    <FormComponentNMT
      title="Postgraduate Diploma Second Year in Nuclear Medicine Technology"
      subjectsData={subjectsData}
      studentInfo={studentInfo}
    />
  );
};

export default NMTSecondYear;