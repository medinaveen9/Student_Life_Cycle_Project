import FormComponentMPT2 from '../MasterofPhysiotherapyForms/FormComponentMPT2';
const MPTSecondYear = () => {
    const studentInfo = {
      rollNumber: 'AN2023001',
      name: 'John Doe',
      soName: 'Michael Doe',
      date: 'June 2025'
    };
  
    const subjectsData = [
      {
        paperNo: '1',
        subject: 'Basic sciences',
        theoryMax: 60,
        theoryMin: 24,
        theorySecured: 48,
        practicalMax: 20,
        practicalMin: 8,
        practicalSecured: 18,
        totalSecured: 66,
        result: 'Pass'
      },
      {
        paperNo: '2',
        subject: 'Biostatistics and Research Methodology',
        theoryMax: 60,
        theoryMin: 24,
        theorySecured: 54,
        practicalMax: 20,
        practicalMin: 8,
        practicalSecured: 17,
        totalSecured: 71,
        result: 'Pass'
      },
      {
        paperNo: '3',
        subject: 'Physiotherapy-1',
        theoryMax: 60,
        theoryMin: 24,
        theorySecured: 50,
        practicalMax: 20,
        practicalMin: 8,
        practicalSecured: 20,
        totalSecured: 70,
        result: 'Pass'
      },
      {
        paperNo: '4',
        subject: 'Physiotherapy-2',
        theoryMax: 60,
        theoryMin: 24,
        theorySecured: 45,
        practicalMax: 20,
        practicalMin: 8,
        practicalSecured: 18,
        totalSecured: 63,
        result: 'Pass'
      }
    ];
  
    return (
      <FormComponentMPT2
        rollNumber={studentInfo.rollNumber}
        name={studentInfo.name}
        sod={studentInfo.soName}
        examDate={studentInfo.date}
        specialty="Neurology"
        subjectsData={subjectsData}
      />
    );
  };
  export default MPTSecondYear;