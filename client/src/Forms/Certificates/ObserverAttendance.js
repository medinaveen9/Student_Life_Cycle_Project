import React from 'react';

const ObserversAttendance = () => {
  return (
    <div className="max-w-3xl mx-auto mt-20 p-10 border border-gray-300 text-black bg-white shadow-lg page-break">
      <h2 className="text-center font-bold text-xl uppercase text-blue-900">
        NIZAM’S INSTITUTE OF MEDICAL SCIENCES
      </h2>
      <p className="text-center text-xs uppercase">
        (A University Established Under State Act)
      </p>
      <div className="flex justify-between text-sm mt-4">
        <p><strong>Ac1/833/2019/Obv-NEU.</strong></p>
        <p><strong>Dt. 09.07.2025</strong></p>
      </div>
      <p className="mt-6">To,<br /><strong>The Principal,<br />Gandhi Medical College,<br />SECUNDERABAD.</strong></p>

      <p className="mt-6"><strong>Sub:-</strong> NIMS – AD ACI – Attendance of Observership – Reg.<br />
      <strong>Ref:-</strong> Attendance received from Dr. Suryaprabha, Prof & Head, Department of Neurology. Dated 02.04.2025</p>

      <p className="mt-6">Sir,</p>
      <p className="text-justify">
        With reference to the subject cited above, it is informed that, the student of your college has attended for Observership in the Department of Neurology at NIMS as detailed below.
      </p>

      <table className="table-auto w-full mt-6 border border-black text-sm text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-black px-2 py-1">Sl. No.</th>
            <th className="border border-black px-2 py-1">Name of the Student</th>
            <th className="border border-black px-2 py-1">Period</th>
            <th className="border border-black px-2 py-1">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {[
            "Dr.Ch.Manoj Kumar",
            "Dr.Nikhitha Jain",
            "Dr.T.Yamini",
            "Dr.Y.Deepika Reddy",
            "Dr.S.Naga Vaishnavi",
            "Dr.JMSS Dharani",
          ].map((name, i) => (
            <tr key={i}>
              <td className="border border-black px-2 py-1">{i + 1}</td>
              <td className="border border-black px-2 py-1">{name}</td>
              <td className="border border-black px-2 py-1">16.03.2025 to 31.03.2025</td>
              <td className="border border-black px-2 py-1">Nil</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4">They have been relieved on 31.03.2025.</p>

      <div className="text-right mt-12 font-bold">
        Associate Dean<br />
        Academic Section -1
      </div>
    </div>
  );
};

export default ObserversAttendance;