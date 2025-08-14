import React from 'react';
import Header from '../../components/Header'; // Assuming you have a Header component

const Attendance_Certificate = () => {
  return (
<div className="max-w-3xl mx-auto mt-20 p-10 border border-gray-300 text-black bg-white shadow-lg page-break">


      {/* Assuming Header component is similar to the one in CustodianCertificate */}
      <Header />

      <div className="flex justify-between text-sm font-medium my-3">
        <p>Ac1/833/2019/Obv- NEU.</p>
        <p>Dt. 04.2025</p>
      </div>

      <div className="mt-6 text-base">
        <p>To</p>
        <p className="mt-1">The Principal,</p>
        <p className="mt-1">Gandhi Medical College,</p>
        <p className="mt-1">SECUNDERABAD.</p>
      </div>

      <p className="mt-6 text-base">
        Sub:- NIMS – AD ACI – Attendance of Observership – Reg.
      </p>

      <p className="mt-3 text-base">
        Ref:- Attendance received from Dr.Suryaprabha, Prof & Head,
        <br /> Department of Neurology. Dated 02.04.2025
      </p>
      <p className="text-center">** ** **</p>

      <p className="mt-3 text-base">Sir</p>

      <p className="text-justify leading-relaxed text-base mt-3">
        With reference to the subject cited above, it is informed that, the student of your college has attended for Observership in the Department of Neurology at NIMS as detailed below.
      </p>

      <table className="min-w-full mt-6 border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Sl. No</th>
            <th className="border border-gray-400 px-4 py-2">Name of the Student</th>
            <th className="border border-gray-400 px-4 py-2">Period</th>
            <th className="border border-gray-400 px-4 py-2">Remarks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 px-4 py-2">01.</td>
            <td className="border border-gray-400 px-4 py-2">Dr.Ch.Manoj Kumar</td>
            <td className="border border-gray-400 px-4 py-2">16.03.2025 to 31.03.2025</td>
            <td className="border border-gray-400 px-4 py-2">Nil</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">02.</td>
            <td className="border border-gray-400 px-4 py-2">Dr.Nikitha Jain</td>
            <td className="border border-gray-400 px-4 py-2">16.03.2025 to 31.03.2025</td>
            <td className="border border-gray-400 px-4 py-2">Nil</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">03.</td>
            <td className="border border-gray-400 px-4 py-2">Dr.T.Yamini</td>
            <td className="border border-gray-400 px-4 py-2">16.03.2025 to 31.03.2025</td>
            <td className="border border-gray-400 px-4 py-2">Nil</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">04.</td>
            <td className="border border-gray-400 px-4 py-2">Dr.Y.Deepika Reddy</td>
            <td className="border border-gray-400 px-4 py-2">16.03.2025 to 31.03.2025</td>
            <td className="border border-gray-400 px-4 py-2">Nil</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">05.</td>
            <td className="border border-gray-400 px-4 py-2">Dr.S.Naga Vaishnavi</td>
            <td className="border border-gray-400 px-4 py-2">16.03.2025 to 31.03.2025</td>
            <td className="border border-gray-400 px-4 py-2">Nil</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">06.</td>
            <td className="border border-gray-400 px-4 py-2">Dr.JMSS Dharani</td>
            <td className="border border-gray-400 px-4 py-2">16.03.2025 to 31.03.2025</td>
            <td className="border border-gray-400 px-4 py-2">Nil</td>
          </tr>
        </tbody>
      </table>

      <p className="text-justify mt-3">
        They have been relieved on 31.03.2025.
      </p>

      <div className="text-right mt-12 font-bold">
        <p>Associate Dean</p>
        <p>Academic Section -1</p>
      </div>
    </div>
  );
};

export default Attendance_Certificate;