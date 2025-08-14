import React from 'react'
import Header from '../../components/Header';

const MaternityLeave = () => {
  return (
    <div className="max-w-3xl mx-auto mt-20 p-10 border border-gray-300 text-black bg-white shadow-lg page-break">
      <Header />

      <div className="flex justify-between text-sm font-medium my-6 underline">
        <p>File No. Ac1/28504/2021/MD H.A.</p>
        <p>Date: .11.2023</p>
      </div>

      <h2 className="text-center font-bold underline my-2">LEAVE ORDER</h2>

      <p className="text-justify leading-relaxed text-base mt-3">
        Sub: NIMS-ADAC1 – Dr. Geetha, second year PG in MD (Hospital Administration) – Sanction of Maternity leave - Orders – Issued - Reg.
        <br /><br />
        Ref: Note approval of Director, dated 09.11.2023.
        <br /><br />
        With reference to the subject cited, <strong>Dr.Gadapa Geetha</strong>, second year PG in MD (Hospital Administration) sanctioned Maternity Leave from 06.11.2023 to 03.05.2024 (180 days) <strong>without stipend</strong>.
        <br /><br />
        Dr. Gadapa Geetha, E.C.No.28504 MD (Hospital Administration) joined 3 years course on 28.03.2022 and will be completed on 27.03.2025. The study period will now stand extended up to 23.09.2025 (Provisional), to the extent of above leave availed.
      </p>

      <div className="text-right mt-8 font-bold">Associate Dean (Academic-1)</div>
        <p className="text-justify mt-6">
            To<br />
            The Dy.Manager, Claims Section.<br/><br/> Copy to :
            Dr. Gadapa Geetha, Second year PG in MD (Hospital Administration) Through HOD, Hospital Administration.
            </p>

    </div>
  )
}

export default MaternityLeave