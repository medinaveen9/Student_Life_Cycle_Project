import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import axiosInstance from '../../components/AxiosInstance';
import axios from 'axios';

const TransferCertificate = () => {

    // Example state for form data if needed in future
    const [formData, setFormData] = useState({
        rollNo: '',
        courseType: '',
        completionDate: '',
        classLeaving: '',
        conduct: '',
    });
    const [studentData, setStudentData] = useState([]); // To store fetched student data

    const [showCertificate, setShowCertificate] = useState(false); // To toggle certificate view

    // Handle form input changes if needed
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission to generate certificate
    const handleGenerate = () => {
        setShowCertificate(true);
    };

    // Function to download the certificate as PDF
    const handleDownload = async () => {
        const res = await axios.post(
        'http://localhost:5000/generate-tc',
        formData,
        { responseType: 'blob' }
        );
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${formData.rollNo}_TC.pdf`);
        document.body.appendChild(link);
        link.click();
    };

    // Sample data for the certificate; in real scenario, fetch from backend
    const reportData = {
        rollNo: 'BPT20201234',
        studentName: 'John Doe',
        fatherName: 'Mr. Richard Doe',
        nationality: 'Indian',
        dob: '2002-04-15',
        admissionDate: '2020-06-01',
        completionDate: '2024-06-30',
        classLeaving: 'Final Year BPT',
        promotionQualified: 'Yes',
        conduct: 'Satisfactory',
    };

    // Function to format date in DD-MM-YYYY
    const formattedDate = (dateStr) => {
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? '' : date.toLocaleDateString('en-GB');
    };

    const handleBack = () => {
        // Reset input fields and hide certificate
        setFormData({
            rollNo: '',
            completionDate: '',
            classLeaving: '',
            conduct: '',
            courseType: '',
        });
        setShowCertificate(false);
    };

    // Form validation function
    const validateForm = () => {
        for (const key in formData) {
            if (!formData[key] || formData[key].trim() === '') {
            return false;  // Invalid if any field is empty
            }
        }
        return true; // Valid if all filled
    };

    // Fetch student data on component mount
    const fetchStudentData = async () => {
        let response;
        try {
            if (!validateForm()) {
                alert("Please fill out all fields before generating the certificate.");
                return;
            }
            response = await axiosInstance.get('/api/certificates/students', {
                params: { application_no: formData.rollNo, courseType: formData.courseType  }
            });
            setStudentData(response.data);
            setShowCertificate(true);
        } catch (error) {
            alert(response?.data?.message || "Error fetching student data.");
            console.error('Error fetching student data:', error);
        }
    };

    return (
        <React.Fragment>
            {!showCertificate ? 
                (
                    <React.Fragment>
                        <div className="max-w-2xl mx-auto mt-10 p-6 border rounded shadow">
                            <h2 className="text-xl font-bold mb-4">Generate Transfer Certificate</h2>
                            <input type="text"  name="rollNo"  placeholder="Roll No" value={formData.rollNo}
                                onChange={handleChange} className="w-full p-2 border mb-3" />
                            <input type="date" name="completionDate" value={formData.completionDate} 
                                onChange={handleChange} className="w-full p-2 border mb-3" />
                            <input type="text" name="classLeaving" placeholder="Class at time of leaving"
                                value={formData.classLeaving} onChange={handleChange} className="w-full p-2 border mb-3"/>
                            <select name="conduct" value={formData.conduct} placeholder="Conduct and Character"
                                onChange={handleChange} className="w-full p-2 border mb-3" >
                                    <option value="" disabled>Conduct and Character</option>
                                    <option value="Good">Good</option>
                                    <option value="Very Good">Very Good</option>
                                    <option value="Satisfactory">Satisfactory</option>
                            </select>
                            <select name="courseType" value={formData.courseType} placeholder="Course Type"
                                onChange={handleChange} className="w-full p-2 border mb-3" >
                                    <option value="" disabled>Course Type</option>
                                    <option value="BPT">BPT</option>
                                    <option value="MPT">MPT</option>
                            </select>

                            <button onClick={fetchStudentData} className="bg-blue-600 text-white px-4 py-2 rounded">
                                Generate TC
                            </button>
                        </div>
                    </React.Fragment>
                ) : 
                (
                    <React.Fragment>
                        <div className="max-w-3xl mx-auto mt-20 p-10 border border-gray-300 text-black bg-white 
                            shadow-lg page-break">
                            <Header />
                            <h2 className="text-center font-bold text-xl mb-6 underline">TRANSFER CERTIFICATE</h2>
                            <hr className="mb-6" />
                            <p className="mb-3"><strong>1. Roll No.:</strong> &emsp; {studentData.application_no}</p>
                            <p className="mb-3"><strong>2. Name of the Student:</strong> &emsp; {studentData.name}</p>
                            <p className="mb-3"><strong>3. Name of the Father:</strong> &emsp; {studentData.father_name}</p>
                            <p className="mb-3"><strong>4. Nationality:</strong> &emsp; {studentData.nationality}</p>
                            <p className="mb-3"><strong>5. Date of Birth (As per School Records):</strong> &emsp; {formattedDate(studentData.dob)}</p>
                            <p className="mb-3"><strong>6. Date of Admission to the Course:</strong> &emsp; {formattedDate(studentData.admissionDate || formData.completionDate)}</p>
                            <p className="mb-3"><strong>7. Date of Completion of the Course:</strong> &emsp; {formattedDate(formData.completionDate)}</p>
                            <p className="mb-3"><strong>8. Class at time of leaving:</strong> &emsp; {formData.classLeaving}</p>
                            <p className="mb-3"><strong>9. Whether qualified for Promotion to Higher class:</strong> &emsp; {formData.qualified || "Yes"}</p>
                            <p className="mb-3"><strong>10. Conduct and Character during study:</strong> &emsp; {formData.conduct}</p>
                            <div className="mt-20 flex justify-end">
                                <div className="text-center">
                                    <p className="font-semibold">Dean / Principal</p>
                                </div>
                            </div>
                            
                        </div>
                        <div style ={{ display : 'flex', justifyContent: 'center', gap : "20px" }}>
                            <button onClick={handleBack}
                                className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
                                    Back
                            </button>
                            <button onClick={handleDownload} 
                                className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
                                    Download PDF
                            </button>
                        </div>
                        
                    </React.Fragment>   
                ) 
            }
        </React.Fragment>
    );
};

export default TransferCertificate;
