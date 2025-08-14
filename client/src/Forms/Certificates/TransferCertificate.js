import React from 'react';
import Header from '../../components/Header';
const TransferCertificate = () => {
  const reportData = {
    rollNo: 'BPT20201234',
    studentName: 'John Doe',
    fatherName: 'Mr. Richard Doe',
    nationality: 'Indian',
    dob: '2002-04-15',
    admissionDate: '2020-06-01',
    completionDate: '2024-06-30',
    classLeaving: 'Final Year BPT',
    promotionQualified: 'Yes',
    conduct: 'Satisfactory',
  };

  const formattedDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? '' : date.toLocaleDateString('en-GB');
  };

  return (
      <div className="max-w-3xl mx-auto mt-20 p-10 border border-gray-300 text-black bg-white shadow-lg page-break">


      <Header />
      <h2 className="text-center font-bold text-xl mb-6 underline">
        TRANSFER CERTIFICATE
      </h2>

      <hr className="mb-6" />
      <p className="mb-3"><strong>1. Roll No.:</strong> &emsp; {reportData.rollNo}</p>
      <p className="mb-3"><strong>2. Name of the Student:</strong> &emsp; {reportData.studentName}</p>
      <p className="mb-3"><strong>3. Name of the Father:</strong> &emsp; {reportData.fatherName}</p>
      <p className="mb-3"><strong>4. Nationality:</strong> &emsp; {reportData.nationality}</p>
      <p className="mb-3"><strong>5. Date of Birth (As per School Records):</strong> &emsp; {formattedDate(reportData.dob)}</p>
      <p className="mb-3"><strong>6. Date of Admission to the Course:</strong> &emsp; {formattedDate(reportData.admissionDate)}</p>
      <p className="mb-3"><strong>7. Date of Completion of the Course:</strong> &emsp; {formattedDate(reportData.completionDate)}</p>
      <p className="mb-3"><strong>8. Class at time of leaving:</strong> &emsp; {reportData.classLeaving}</p>
      <p className="mb-3"><strong>9. Whether qualified for Promotion to Higher class:</strong> &emsp; {reportData.promotionQualified}</p>
      <p className="mb-3"><strong>10. Conduct and Character during study:</strong> &emsp; {reportData.conduct}</p>

      <div className="mt-20 flex justify-end">
        <div className="text-center">
          <p className="font-semibold">Dean / Principal</p>
        </div>
      </div>
    </div>
  );
};

export default TransferCertificate;
