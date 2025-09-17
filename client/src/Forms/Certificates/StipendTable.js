import React, { useEffect, useState } from 'react';
import { FaEdit, FaCheck } from 'react-icons/fa';
import axiosInstance from '../../components/AxiosInstance';

  const StipendTable = () => {
        const [data, setData] = useState([]);
        const [showModal, setShowModal] = useState(false);
        
  useEffect(() => {
        const fetchStipends = async () => {
        try {
        const response = await axiosInstance.get('/api/stipend/stipend_details'); 
        const result = response.data;   
        if (result.success) {
        setData(result.data);
        } else {
         console.error('Failed to fetch stipends:', result.error);
        }
       }  catch (err) {
         console.error('Error fetching stipend data:', err);
      }
    };
      fetchStipends();
    } ,[]);

        const handleEdit = (row) => {
      // You can navigate to edit form or open modal
        console.log('Edit clicked for:', row.rollNo);
       };
       const handleApproval = () => {
        setShowModal(true); // open the modal
       };
  
     // const handleApproval = (row) => {
     // Call API to approve stipend
    //  console.log('Approval clicked for:', row.rollNo);
    // };

    return (
       <div className="mt-16 overflow-x-auto p-4">
       <h2 className="text-xl font-bold mb-4 text-center">
        NIZAM’S INSTITUTE OF MEDICAL SCIENCES, COLLEGE OF ALLIED HEALTH SCIENCES<br/>
        STIPEND FOR THE MONTH OF JUNE 2025 FOR B.Sc INTERNS (2024-25) </h2>
        <table className="min-w-full border border-gray-400 text-sm text-center">
        <thead>
        <tr><th className="border px-2 py-2 font-bold text-lg bg-gray-100" colSpan="15">ANNEXURE</th></tr>
              <tr className="bg-gray-200">
              <th className="border px-2 py-1">Roll No.</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Course</th>
              <th className="border px-2 py-1">A/C Number</th>
              <th className="border px-2 py-1">Date of Joining</th>
              <th className="border px-2 py-1">Leaves Availed</th>
              <th className="border px-2 py-1">Days Present</th>
              <th className="border px-2 py-1">Stipend</th>
              <th className="border px-2 py-1">Edit</th>
              <th className="border px-2 py-1">Approval</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
              <tr key={idx}>
              <td className="border px-2 py-1">{row.roll_no}</td>
              <td className="border px-2 py-1">{row.name}</td>
              <td className="border px-2 py-1">{row.course}</td>
              <td className="border px-2 py-1">{row.account_no}</td>
              <td className="border px-2 py-1">{new Date(row.doj).toLocaleDateString("en-IN")}</td>
              <td className="border px-2 py-1">{row.leaves}</td>
              <td className="border px-2 py-1">{row.present}</td>
              <td className="border px-2 py-1">{row.stipend}</td>
              <td className="border px-2 py-1">
              <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEdit(row)}>
              <FaEdit /></button>
              </td>
              <td className="border px-2 py-1">
              <button className="text-green-600 hover:text-green-800" onClick={() => handleApproval(row)}>
              <FaCheck /> </button>
              {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-10 rounded shadow-lg w-96 min-h-32 text-center">
              <p className="mb-4 text-lg">Are you sure to confirm?</p>
              <div className="flex justify-center gap-4">

              <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setShowModal(false)}>Cancel</button>
              
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
               onClick={() => setShowModal(false)}>Confirm</button>
            </div>
          </div>
        </div>
      )}
        </td>
      </tr>
      ))}
    </tbody>   
    </table>
    </div>
  );
};

export default StipendTable;
