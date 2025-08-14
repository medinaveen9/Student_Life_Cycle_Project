import React, { useState } from 'react';

const StipendForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    rollNo: '',
    name: '',
    course: '',
    accountNo: '',
    joiningDate: '',
    leavesexisting: '',
    leavesavailed: '',
    leavesBalance: '',
    presentAndHolidays: '',
    stipend: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:4000/api/stipend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Form submitted successfully!');
      setFormData({
      
      });
    } else {
      const errorData = await response.json();
      console.error('Submission failed:', errorData);
      alert('Submission failed');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('An error occurred while submitting');
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto mt-20 p-8 bg-white shadow-lg rounded-3xl border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Enter Stipend Data
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: 'Roll No', name: 'rollNo', type: 'text' },
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Course', name: 'course', type: 'text' },
          { label: 'Account No', name: 'accountNo', type: 'text' },
          { label: 'Date of Joining', name: 'joiningDate', type: 'date' },
          { label: 'Leaves Existing', name: 'leavesexisting', type: 'number' },
          { label: 'Leaves Availed', name: 'leavesavailed', type: 'number' },
          { label: 'Leaves Balance', name: 'leavesBalance', type: 'number' },
          {
            label: 'Days Present + Holidays',
            name: 'presentAndHolidays',
            type: 'number',
          },
          { label: 'Stipend to Pay', name: 'stipend', type: 'text' },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default StipendForm;