import React from 'react';
import Header from '../../components/Header';
const Bonafide = () => {
  return (
    <div className="max-w-3xl mx-auto mt-20 p-10 border border-gray-300 text-black bg-white shadow-lg page-break">
      
<Header/>
      <div className="flex justify-between text-sm mb-10">
        <p><strong>File No:</strong> NIMS/BPT/2025/001</p>
        <p><strong>Date:</strong> 27-06-2025</p>
      </div>

    
      <h3 className="text-center text-lg font-semibold underline mb-8">
        BONAFIDE / STUDY & COURSE COMPLETION CERTIFICATE
      </h3>


      <p className="mb-6 leading-7 text-justify">
        This is to certify that <strong>John Doe</strong> S/o. <strong>Mr. Richard Doe</strong> has completed <strong>4 years</strong> 
        of <strong>Bachelor of Physiotherapy</strong> from this Institute during the year <strong>2020–2024</strong>. 
        His Roll Number is <strong>BPT20201234</strong>.
      </p>

      <p className="leading-7 text-justify">
        He has completed <strong>1 year</strong> compulsory Internship from <strong>July 2024</strong> to <strong>June 2025</strong>. 
        During the period of studies at this institute, his conduct and character were found to be <strong>“Satisfactory”</strong>.
      </p>

    
      <div className="mt-32 text-right">
        <p className="font-semibold">Dean / Principal</p>
      </div>
    </div>
  );
};

export default Bonafide;
