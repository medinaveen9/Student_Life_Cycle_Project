import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../components/AxiosInstance';

const StipendForm = ({ editableData, user, setEditableData }) => {
  const [formData, setFormData] = useState({
    rollNo: '',
    name: '',
    course: '',
    accountNo: '',
    joiningDate: '',
    leavesBalance: '',
    presentAndHolidays: '',
    stipend: '',
    actualStipend: '',
    cur_month : new Date().getMonth() + 1, // current month by default
    ifsc_code : "",
    year : ""
  });
  const [studentData, setStudentData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [uniqueID, setUniqueID] = useState(null);
  
  

  const fetchOnce = useRef(false);

  const [loading, setLoading] = useState(false); // new state
  const [submitting, setSubmitting] = useState(false); // disable submit button
  const [isFormDisabled, setIsFormDisabled] = useState(true); 

  const navigate = useNavigate();

  useEffect(() => {
    if (!fetchOnce.current) {
      if (editableData) {
        // Map DB fields -> frontend fields
        const data = {
          rollNo: editableData.roll_no || "",
          name: editableData.name || "",
          course: editableData.course || "",
          accountNo: editableData.account_no || "",
          joiningDate: editableData.doj
            ? new Date(editableData.doj).toISOString().split("T")[0]
            : "",
          leavesBalance: editableData.leaves || "",
          presentAndHolidays: editableData.present || "",
          stipend: editableData.stipend || "",
          actualStipend: editableData.actual_stipend || "",
          cur_month : editableData.cur_month || (new Date().getMonth() + 1),
          ifsc_code : editableData.ifsc_code || "",
          year : editableData.year || ""
        };
        setFormData(data);
        setIsEdit(true);
        setUniqueID(editableData.id);
        setStudentData(data);
        setEditableData(null); // clear after use
        setIsFormDisabled(false); // enable form if editing
        fetchOnce.current = true; // mark fetch done
      }
    }
  }, [editableData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // allow only after student fetched
    if (!studentData && name !== "rollNo") 
      return;

    if(name === "cur_month") {
      setFormData((prev) => ({ ...prev, [name]: value,
          leavesBalance: '', presentAndHolidays: '', stipend: '', actualStipend: ''
       }));
      return;
    }
    if(name === 'leavesBalance') {
      if (value === '') {
        setFormData((prev) => ({ ...prev, leavesBalance: '', presentAndHolidays: '', stipend: '', actualStipend: '' }));
        return;
      }
      if (formData.cur_month === '') {
        alert('Please select the month first');
        return;
      }

      const daysInMonth = new Date(new Date().getFullYear(), formData.cur_month, 0).getDate();
      const stipendPerDay = studentData.actualStipend / daysInMonth;
      const presentDays = daysInMonth - Number(value);
      const calStipend = presentDays * stipendPerDay;
      setFormData((prev) => ({ ...prev, stipend: Math.floor(calStipend), 
          presentAndHolidays : presentDays, actualStipend : studentData.actualStipend,
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
      setFormData((prev) => ({ ...prev, 
          name: '', course: '', accountNo: '', joiningDate: '', leavesBalance: '',
          presentAndHolidays: '', stipend: '', actualStipend: '', ifsc_code : "", year : "" }));
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
            ifsc_code : data.ifsc_code,
            year : data.year
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
          rollNo: '', name: '', course: '', accountNo: '', joiningDate: '', cur_month : new Date().getMonth() + 1,
          leavesBalance: '', presentAndHolidays: '', stipend: '', actualStipend: '', ifsc_code : "", year : ""
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
      const res = await axiosInstance.post("/api/stipend/submit", formData, {
        params: { id: uniqueID, isEdit, userId : user.userId, userRole : user.role, user_name : user.user_name  },
      });
      alert(res.data.message || "Stipend submitted successfully");
      setFormData({
        name: '',   course: '', accountNo: '', joiningDate: '', leavesBalance: '', ifsc_code : "", year : "",
        presentAndHolidays: '', stipend: '', actualStipend: '', cur_month : new Date().getMonth() + 1,});
      setStudentData(null);
      setIsFormDisabled(true);
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
          { 
            label: 'Month', name: 'cur_month',  type: 'select', required: true,
            options: [
              { name: 'January', value: 1 }, { name: 'February', value: 2 },
              { name: 'March', value: 3 }, { name: 'April', value: 4 },
              { name: 'May', value: 5 }, { name: 'June', value: 6 },
              { name: 'July', value: 7 }, { name: 'August', value: 8 },
              { name: 'September', value: 9 }, { name: 'October', value: 10 },
              { name: 'November', value: 11 }, { name: 'December', value: 12 },
            ],
          },
          { label: 'No of Leaves Availed', name: 'leavesBalance', type: 'number', required : true },
          { label: 'Days Present + Holidays', name: 'presentAndHolidays', type: 'number', required : true },
          { label: 'Stipend to Pay', name: 'stipend', type: 'text', required : true },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{field.label}</label>
            {field.type === 'select' ? (
                <select required={field.required} disabled={isFormDisabled || loading || submitting}
                  name={field.name} value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="">Select Month</option>
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.name}</option>
                  ))}
                </select>
              ) : (   
                    <input required={field.required} disabled={(isFormDisabled && field.name !== "rollNo") || loading || submitting} 
                      name={field.name}
                      type={field.type}
                      value={formData[field.name]}
                      onChange={handleChange}
                      onKeyDown={field.onKeyDown}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
              )}
                  </div>
            ))}
          </div>

      <div className="text-center mt-8">
        <button disabled={submitting || loading} type="submit"
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition"
        > Submit
        </button>
      </div>
    </form>
  );
};

export default StipendForm;
