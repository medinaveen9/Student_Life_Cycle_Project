import React from 'react';
import Header from '../../components/Header';

const ObserverPermission = () => {
  return (
    <div className="max-w-3xl mx-auto mt-20 p-10 border border-gray-300 text-black bg-white shadow-lg page-break">
     
      <Header /> 

      <div className="flex justify-between text-sm font-medium my-3">
        <p>Rc.No.AC 1/833/2019/Obv.Neu</p>
        <p>Dt. 01.04.2025</p>
      </div>

      <div className="mt-6 text-base">
        <p>To</p>
        <p className="mt-1">The Director</p>
        <p className="mt-1">Government Medical College,</p>
        <p className="mt-1">SIDDIPET.</p>
      </div>

      <p className="mt-6 text-base">Madam/Sir</p>
      <p className="text-center font-bold mt-2">
        Sub:- NIMS - AD-AC1- Permission for Observership in the Dept. of <br /> Neurology - Reg.
      </p>

      <p className="mt-3 text-base">
        Ref:- Lr. RC.NO.B1/Academic/GMC.SDPT, dated 20.02.2025,
      </p>
      <p className="text-center">*****</p>

      <p className="text-justify leading-relaxed text-base mt-3">
        With reference to the letter cited above, permission has been accorded for Observership in the following Department for the period mentioned below with the following terms and conditions.
      </p>

      <table className="min-w-full mt-6 border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Sl. No</th>
            <th className="border border-gray-400 px-4 py-2">Name of the Candidate</th>
            <th className="border border-gray-400 px-4 py-2">Period</th>
            <th className="border border-gray-400 px-4 py-2">Department</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 px-4 py-2">01</td>
            <td className="border border-gray-400 px-4 py-2">Dr.Chatla Dharani Sri</td>
            <td className="border border-gray-400 px-4 py-2">01.04.2025 to 15.04.2025</td>
            <td className="border border-gray-400 px-4 py-2" rowSpan="5">Neurology</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">02</td>
            <td className="border border-gray-400 px-4 py-2">Dr.Syed Shakeer Ahmed</td>
            <td className="border border-gray-400 px-4 py-2">15.04.2025 to 30.04.2025</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">03</td>
            <td className="border border-gray-400 px-4 py-2">Dr.Stanlee Telien</td>
            <td className="border border-gray-400 px-4 py-2">16.05.2025 to 31.05.2025</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">04</td>
            <td className="border border-gray-400 px-4 py-2">Dr.Shubhangi Singh</td>
            <td className="border border-gray-400 px-4 py-2">16.05.2025 to 31.05.2025</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">05</td>
            <td className="border border-gray-400 px-4 py-2">Dr.Dishakshi</td>
            <td className="border border-gray-400 px-4 py-2">16.05.2025 to 31.05.2025</td>
          </tr>
        </tbody>
      </table>

      <p className="font-bold mt-6 text-base">The terms and conditions:</p>
      <ol className="list-decimal ml-6 mt-1 text-justify text-base leading-relaxed">
        <li>Permission is granted as Observer, without any privileges towards patient care.</li>
        <li>Report to the Head of the concerned Departments of this Institute on the notified dates.</li>
        <li>Make own arrangements for boarding and lodging.</li>
        <li>No financial assistance is extended during this period.</li>
        <li>Students are allowed for observership without any fee as they are from Siddipet (Telangana Government), but an amount of Rs.100/- (One Hundred only) to be paid towards attendance fee at the time of joining.</li>
        <li>Submit the Original Fee receipt in Academic Section -1 and an Order copy to the concerned Department Office, before joining.</li>
      </ol>

      <div className="text-right mt-12 font-bold">
        <p>Associate Dean (AC -1)</p>
      </div>

      <p className="font-bold mt-6 text-base">Copy to:</p>
      <ol className="list-decimal ml-6 mt-1 text-justify text-base leading-relaxed">
        <li>Professor & Head, of the concerned Departments, NIMS, Hyderabad with a request to permit their candidates for the same and forward joining report to AC-1 Section. Furnish the (i) attendance and (ii) performance report on the candidate on completion of period of Observership/Peripheral Posting for taking further action.</li>
        <li>Individual</li>
      </ol>
    </div>
  );
};

export default ObserverPermission;