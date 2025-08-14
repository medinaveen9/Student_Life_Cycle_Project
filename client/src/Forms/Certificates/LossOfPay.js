import React from 'react'
import Header from '../../components/Header';


const LossOfPay = () => {
  return (
    <div className="max-w-3xl mx-auto mt-20 p-20 border border-gray-300 text-black bg-white shadow-lg page-break">

      <Header />

      <div className="flex justify-between text-sm font-medium my-6 underline">
        <p>File No. AC1/29112/2023/MD (Bio-Chem)</p>
        <p>Date:07.07.2025</p>
      </div>

      <h2 className="text-center font-bold underline my-3">LEAVE ORDER</h2>

      <p className="text-justify text-base leading-relaxed mt-4">
        Sub: NIMS-ADAC1  Dr. Syed Mifzaal Ahmed, First year PG in MD (Biochemistry) Sanction of LOP - Orders Issued - Reg.
        <br />
        Ref:
        <br />
        1. Leave letters dated: 20.08.2024 & 29.08.2024<br />
        2. Joining reports dated: 20.08.2024 & 29.08.2024<br />
        3. Note Approval of Dean, dated 16.09.2024
      </p>

      <div className="mt-2">
        <table className="table-auto border-collapse border border-black w-full text-sm text-center">
          <thead className="bg-gray-100 font-semibold">
            <tr>
              <th className="border border-black px-2 py-1">S.No.</th>
              <th className="border border-black px-2 py-1">LOP From</th>
              <th className="border border-black px-2 py-1">LOP To</th>
              <th className="border border-black px-2 py-1">Total LOPs</th>
              <th className="border border-black px-2 py-1">Joined On</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black px-2 py-1">1</td>
              <td className="border border-black px-2 py-1">12.08.2024</td>
              <td className="border border-black px-2 py-1">13.08.2024</td>
              <td className="border border-black px-2 py-1">2</td>
              <td className="border border-black px-2 py-1">14.08.2024</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">2</td>
              <td className="border border-black px-2 py-1">24.08.2024</td>
              <td className="border border-black px-2 py-1">25.08.2024</td>
              <td className="border border-black px-2 py-1">2</td>
              <td className="border border-black px-2 py-1">26.08.2024</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-justify mt-2">
        Total: 4 days.
        <br />
        Dr. Syed Mifzaal Ahmed, Student ID.No.29112, 1st year PG in MD (Biochemistry) joined 3 years course on 25.10.2023. The study period will be extended up to 05.11.2026 to the extent of above leave availed.
      </p>

      <div className="text-right mt-12 font-bold">Associate Dean Academic-1</div>
       <p className="text-justify mt-6">
        To,
        <br />
       Dr. Syed Mifzaal Ahmed,  First year PG in   MD (Biochemistry)  Through HOD,      Biochemistry
      </p>

    </div>
     

      
  )
}

export default LossOfPay