import React from 'react';
import Header from '../../components/Header';

const MedicalFeeNote = () => {
  return (
    <div className="max-w-3xl mx-auto mt-20 p-10 border border-gray-300 text-black bg-white shadow-lg page-break">
      <Header />

      <div className="flex justify-end text-sm font-medium mb-6">
        <p>Dated: 11.2024</p>
      </div>

      <p className="text-base leading-relaxed mb-6">
        To,<br />
        The I/C OP Cash Counter,<br />
        NIMS
      </p>

      <p className="text-base leading-relaxed mb-6">
        Sir,<br />
        Please collect <strong>Rs. 4,050/-</strong> for Medical Fee for MD/MS/DNB Broad Specialty 
        admissions for the academic year 2024-25.
      </p>

      <div className="mt-10">
        <p>Signature</p>
      </div>
    </div>
  );
};

export default MedicalFeeNote;