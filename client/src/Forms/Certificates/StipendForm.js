import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../components/AxiosInstance';

const StipendForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    rollNo: '',
    name: '',
    course: '',
    accountNo: '',
    joiningDate: '',
    leavesBalance: '',
    presentAndHolidays: '',
    stipend: '',
  });
  const [studentData, setStudentData] = useState(null);

  const [loading, setLoading] = useState(false); // new state
  const [submitting, setSubmitting] = useState(false); // disable submit button
  const [isFormDisabled, setIsFormDisabled] = useState(true); 

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // allow only after student fetched
    if (!studentData && name !== "rollNo") 
      return;

    if(name === 'leavesBalance') {
      if (value === '') {
        setFormData((prev) => ({ ...prev, leavesBalance: '', presentAndHolidays: '', stipend: '' }));
        return;
      }
      const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
      const stipendPerDay = studentData.stipend / daysInMonth;
      const presentDays = daysInMonth - Number(value);
      const calStipend = presentDays * stipendPerDay;
      setFormData((prev) => ({ ...prev, stipend: Math.floor(calStipend), presentAndHolidays : presentDays,
        [name]: value }));
    }
    else{
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 🔹 Fetch details when Roll No entered + Enter pressed
  const handleRollNoKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!formData.rollNo || loading) return; // prevent multiple requests
      setLoading(true); // disable inputs
      try {
        const res = await axiosInstance.get(`/api/stipend/student`, {
          params: { application_no: formData.rollNo },
        });

        if (res.status === 200 && res.data) {
          const data = res.data.data;
          setFormData((prev) => ({
            ...prev,
            name: data.name || '',
            course: data.course || '',
            accountNo: data.account_no || '',
            joiningDate: data.doj   ?new Date(data.doj).toISOString().split('T')[0] : '',
          }));
          setStudentData(data);
        } else {
          alert('Student not found');
        }
        setIsFormDisabled(false);
      } catch (error) {
        console.error('Error fetching student:', error);
        alert('Student not found');
        setFormData({
          rollNo: '', name: '', course: '', accountNo: '', joiningDate: '',
          leavesBalance: '', presentAndHolidays: '', stipend: '',
        });
        setIsFormDisabled(true);
      }  finally {
        setLoading(false); // enable inputs
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return; // prevent double submit
    setSubmitting(true);
    try {
      const res = await axiosInstance.post("/api/stipend/submit", formData);
      alert(res.data.message || "Stipend submitted successfully");
    } catch (error) {
      console.error("Error submitting stipend:", error);
      alert("Error submitting stipend");
    } finally {
      setSubmitting(false);
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
          { label: 'Roll No', name: 'rollNo', type: 'text', onKeyDown: handleRollNoKeyDown, required : true },
          { label: 'Name', name: 'name', type: 'text', required : true },
          { label: 'Course', name: 'course', type: 'text' , required : true},
          { label: 'Account No', name: 'accountNo', type: 'text' , required : true},
          { label: 'Date of Joining', name: 'joiningDate', type: 'date', required : true },
          { label: 'No of Leaves Availed', name: 'leavesBalance', type: 'number', required : true },
          { label: 'Days Present + Holidays', name: 'presentAndHolidays', type: 'number', required : true },
          { label: 'Stipend to Pay', name: 'stipend', type: 'text', required : true },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{field.label}</label>
            <input required={field.required} disabled={(isFormDisabled && field.name !== "rollNo") || loading || submitting} 
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleChange}
              onKeyDown={field.onKeyDown}
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
