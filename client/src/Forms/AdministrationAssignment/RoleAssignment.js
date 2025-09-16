import React, { useState } from "react";
import "../../styles/Certificates/SelectCertificate.css";
import axiosInstance from '../../components/AxiosInstance';

const RoleAssignment = () => {
    // State to manage form inputs
    const [formData, setFormData] = useState({
        employeeCode: "", employeeName: "", department: "", section: "", role: "", fromDate: "",
        toDate: "",
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/api/master/employee_role", formData);
            alert("Employee Role Assigned successfully!");
        } catch (error) {
            console.error("Error saving employee:", error);
            alert("Failed to Assign Role");
        }
    };

    return (
        <form className="study_main" onSubmit={handleSubmit}>
            <div className="sub_study_main">Role Assignment</div>

            {/* Employee Code */}
            <div className="form_group">
                <label className="form_label">Employee Code</label>
                <input className="form_input" type="text" name="employeeCode" 
                    value={formData.employeeCode} onChange={handleInputChange} required />
            </div>

            {/* Employee Name */}
            <div className="form_group">
                <label className="form_label">Employee Name</label>
                <input className="form_input" type="text" name="employeeName" value={formData.employeeName}
                    onChange={handleInputChange} required  />
            </div>

            {/* Department */}
            <div className="form_group">
                <label className="form_label">Department</label>
                <input className="form_input" type="text" name="department" value={formData.department}
                    onChange={handleInputChange} required  />
            </div>

            {/* Section */}
            <div className="form_group">
                <label className="form_label">Section</label>
                <input className="form_input" type="text" name="section" value={formData.section} 
                    onChange={handleInputChange} required  />
            </div>

            {/* Role */}
            <div className="form_group">
                <label className="form_label">Select Role</label>
                <select className="form_input" name="role" value={formData.role} onChange={handleInputChange}
                    required >
                    <option value="">Select</option>
                    <option value="Maker">Maker</option>
                    <option value="Checker">Checker</option>
                    <option value="Verifier">verifier</option>
                    <option value="Approver">Approver</option>
                </select>
            </div>

            {/* From Date */}
            <div className="form_group">
                <label className="form_label" >From Date</label>
                <input className="form_input" type="date" name="fromDate" value={formData.fromDate}
                    onChange={handleInputChange}  />
            </div>

            {/* To Date */}
            <div className="form_group">
                <label className="form_label">To Date</label>
                <input className="form_input" type="date" name="toDate" value={formData.toDate} 
                    onChange={handleInputChange}  />
            </div>
            <button type="submit" className="button_style"> Submit </button>
        </form>
    );
};

export default RoleAssignment;
