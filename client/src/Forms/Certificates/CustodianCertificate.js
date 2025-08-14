
import React from 'react'
import Header from '../../components/Header'

const CustodianCertificate = () => {
  return (
    <div className="max-w-3xl mx-auto mt-20 p-20 border border-gray-300 text-black bg-white shadow-lg page-break">
   
<Header/>
      <div className="flex justify-between text-sm font-medium my-3 underline">
        <p>File No. AC1/28596/2020/MD(Anaes)</p>
        <p>Date:07.07.2025</p>
      </div>

      <h2 className="text-center font-bold underline my-5">
                CUSTODIAN CERTIFICATE
        </h2>

      <p className="text-justify leading-relaxed text-base mt-6">
        This is to certify that <strong>Dr.Mohamed Etherish M</strong>, MD (Anaesthesiology) Student ID No. 28596 is a Bonafide student of this Institute from 30.05.2020 to 29.05.2023.
        <br />
        The following certificates are retained in this Institute:
      </p>

      <ol className="list-decimal ml-6 mt-1 text-justify text-base leading-relaxed">
        <li>Memorandum of Mark Memos of MBBS (4 Nos.)</li>
        <li>Compulsory Rotation Internship Certificate MBBS</li>
        <li>MBBS Degree Certificate</li>
        <li>Medical Registration Certificate of MBBS</li>
        <li>Course cum Conduct certificate of MBBS</li>
        <li>Transfer and Migration Certificates of MBBS-2 Nos.</li>
        <li>X class Memorandum of Marks</li>
        <li>Intermediate Memorandum of Marks</li>
        <li>Community Certificate</li>
      </ol>

      <p className="text-justify mt-3">
        His date of birth as per SSC certificate is 27-07-1992 (<em>Twenty seven July one nine nine two</em>).
        <br />
        This certificate is issued for the purpose to appear for upcoming INI-Super Speciality and DNB examinations.
      </p>

      <div className="text-right mt-12 font-bold">DEAN</div>
    </div>
  )
}

export default CustodianCertificate