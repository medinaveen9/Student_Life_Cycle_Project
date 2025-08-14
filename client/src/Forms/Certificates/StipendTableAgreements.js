import React from 'react';

const StipendTableAgreements = () => {
  const data = [
    {
      rollNo: '2119001',
      name: 'MADIPU TEJASWI',
      course: 'B.Sc (AT)',
      accountNo: '6301525752',
      ifsc: 'SBIN0020087',
      bank: 'SBI',
      joiningDate: '06-01-2025',
      workingDays: 26,
      leaveWithPermission: 2,
      leaveWithoutPermission: 3,
      holidays: 1,
      totalPresent: 24,
      stipend: '15,000',
      status : "Approved"
    },
    {
      rollNo: '2119002',
      name: 'SK RAJUDDIN',
      course: 'B.Sc (AT)',
      accountNo: '6301525763',
      ifsc: 'SBIN0020087',
      bank: 'SBI',
      joiningDate: '06-01-2025',
      workingDays: 26,
      leaveWithPermission: 1,
      leaveWithoutPermission: 2,
      holidays: 2,
      totalPresent: 25,
      stipend: '15,000',
      status : "Pending"
    },
    {
      rollNo: '2119003',
      name: 'GUGULOTH CHANTI',
      course: 'B.Sc (AT)',
      accountNo: '6301525783',
      ifsc: 'SBIN0020087',
      bank: 'SBI',
      joiningDate: '06-01-2025',
      workingDays: 26,
      leaveWithPermission: 2,
      leaveWithoutPermission: 1,
      holidays: 3,
      totalPresent: 24,
      stipend: '15,000',
      status : "Rejected"
    },
    // Add the rest of the students here...
  ];

  return (
    <div className="mt-16 overflow-x-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-center">
        NIZAM’S INSTITUTE OF MEDICAL SCIENCES, COLLEGE OF ALLIED HEALTH SCIENCES
        <br />
        STIPEND FOR THE MONTH OF JUNE 2025 FOR B.Sc INTERNS (2024-25)
      </h2>
      <table className="min-w-full border border-gray-400 text-sm text-center">
        <thead>
          <tr>
            <th className="border px-2 py-2 font-bold text-lg bg-gray-100" colSpan="14">
              ANNEXURE
            </th>
          </tr>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Roll No.</th>
            <th className="border px-2 py-1">Name of the Candidate</th>
            <th className="border px-2 py-1">Course</th>
            <th className="border px-2 py-1">A/C Number</th>
            <th className="border px-2 py-1">IFSC</th>
            <th className="border px-2 py-1">Bank</th>
            <th className="border px-2 py-1">Date of Joining</th>
            <th className="border px-2 py-1">Working Days</th>
            <th className="border px-2 py-1">Leave (With)</th>
            <th className="border px-2 py-1">Leave (Without)</th>
            <th className="border px-2 py-1">Holidays</th>
            <th className="border px-2 py-1">Days Present</th>
            <th className="border px-2 py-1">Stipend</th>
            <th className="border px-2 py-1">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1">{row.rollNo}</td>
              <td className="border px-2 py-1">{row.name}</td>
              <td className="border px-2 py-1">{row.course}</td>
              <td className="border px-2 py-1">{row.accountNo}</td>
              <td className="border px-2 py-1">{row.ifsc}</td>
              <td className="border px-2 py-1">{row.bank}</td>
              <td className="border px-2 py-1">{row.joiningDate}</td>
              <td className="border px-2 py-1">{row.workingDays}</td>
              <td className="border px-2 py-1">{row.leaveWithPermission}</td>
              <td className="border px-2 py-1">{row.leaveWithoutPermission}</td>
              <td className="border px-2 py-1">{row.holidays}</td>
              <td className="border px-2 py-1">{row.totalPresent}</td>
              <td className="border px-2 py-1">{row.stipend}</td>
               <td className="border px-2 py-1">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StipendTableAgreements;