
import React from 'react'
import Header from '../../components/Header'

const Custodian = () => {
  return (
    <div className="h-screen bg-white text-black flex justify-center">
      <div className="max-w-3xl mt-20 mb-20 p-20 border border-gray-300 shadow-lg overflow-auto">
        <Header />

        <div className="flex justify-between text-sm font-medium my-6 underline">
          <p>File No. AC1/28596/2020/MD(Anaes)</p>
        </div>

        <div className="text-justify my-6">
          <p>
            1. Please see the letter dated 10.10.2023, received from Dr.Mohamed Etherish M., Senior Resident, Dept.of Anaesthesiology, requested to issue Custodian Certificate appear for upcoming INI-Super Speciality and DNB examinations.
            <br />
            2. Dr.Mohamed Etherish M. joined MD (Anaesthesiology) 3 years course on 30.05.2020 and completed on 29.05.2023. He has under bond condition. (1 year compulsory service).
            <br />
            3. If agreed, Custodian Certificate may be issued to Dr. Mohamed Etherish M.
            <br />
            4. Submitted for perusal and approval. Subject to approval, draft Custodian Certificate is prepared and placed below for signature.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Custodian;
