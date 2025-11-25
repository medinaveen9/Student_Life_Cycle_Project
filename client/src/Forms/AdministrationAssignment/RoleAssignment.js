import React, { useState } from "react";
import axiosInstance from "../../components/AxiosInstance";

const RoleAssignment = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    employeeCode: "",
    employeeName: "",
    department: "",
    section: "",
    role: "",
    fromDate: null,
    toDate: null,
    email : ""
  });

  const [loading, setLoading] = useState(false);

  // Internal styles object
  const styles = {
    study_main: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      width: "80%",
      margin: "0 auto",
    },
    sub_study_main: {
      fontSize: "25px",
      fontWeight: 500,
      marginBottom: "10px",
    },
    form_group: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },
    form_label: {
      fontSize: "16px",
      fontWeight: 500,
    },
    form_input: {
      padding: "8px",
      fontSize: "15px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    button_style: {
      backgroundColor: "#4b1d77",
      color: "white",
      padding: "10px 16px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: 500,
      width: "auto",
      alignSelf: "center",
      border: "none",
      borderRadius: "6px",
      marginTop: "10px",
    },
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosInstance.post("/api/master/employee_role", formData);
      alert("Employee Role Assigned successfully!");
    } catch (error) {
      console.error("Error saving employee:", error);
      alert("Failed to Assign Role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form style={styles.study_main} onSubmit={handleSubmit}>
      <div style={styles.sub_study_main}>Role Assignment</div>

      {/* Employee Code */}
      <div style={styles.form_group}>
        <label style={styles.form_label}>Employee Code</label>
        <input
          style={styles.form_input}
          type="text"
          name="employeeCode"
          value={formData.employeeCode}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Employee Name */}
      <div style={styles.form_group}>
        <label style={styles.form_label}>Employee Name</label>
        <input
          style={styles.form_input}
          type="text"
          name="employeeName"
          value={formData.employeeName}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Department */}
      <div style={styles.form_group}>
        <label style={styles.form_label}>Department</label>
        <input
          style={styles.form_input}
          type="text"
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Section */}
      {/* <div style={styles.form_group}>
        <label style={styles.form_label}>Section</label>
        <input
          style={styles.form_input}
          type="text"
          name="section"
          value={formData.section}
          onChange={handleInputChange}
          required
        />
      </div> */}

      {/* Email */}
      <div style={styles.form_group}>
        <label style={styles.form_label}>Email</label>
        <input style={styles.form_input} type="text" name="email" value={formData.email}
          onChange={handleInputChange} required />
      </div>

      {/* Role */}
      <div style={styles.form_group}>
        <label style={styles.form_label}>Select Role</label>
        <select
          style={styles.form_input}
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          required
        >
          <option value="">Select</option>
          <option value="Maker">Maker</option>
          <option value="Checker">Checker</option>
          <option value="Verifier">Verifier</option>
          <option value="Approver">Approver</option>
          <option value="FA">FA</option>
          <option value="FC">FC</option>
        </select>
      </div>

      {/* From Date */}
      <div style={styles.form_group}>
        <label style={styles.form_label}>From Date</label>
        <input
          style={styles.form_input}
          type="date"
          name="fromDate"
          value={formData.fromDate}
          onChange={handleInputChange}
        />
      </div>

      {/* To Date */}
      <div style={styles.form_group}>
        <label style={styles.form_label}>To Date</label>
        <input
          style={styles.form_input}
          type="date"
          name="toDate"
          value={formData.toDate}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit" style={styles.button_style} disabled={loading}>Submit</button>
    </form>
  );
};

export default RoleAssignment;
