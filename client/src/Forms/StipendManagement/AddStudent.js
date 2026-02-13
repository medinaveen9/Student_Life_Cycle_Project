import { useState } from "react";
import axiosInstance from "../../components/AxiosInstance";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import "../../styles/StipendManagement/PromotionYear.css";

/* ===== Field Order (UNCHANGED) ===== */
const FIELDS = [
  "reg_no", "roll_no", "hall_ticket", "name", "university", "course", "adhar", 
  "dob", "gender", "social_status", "father_name", "mother_name",
  "address", "district", "state", "country", "mobile", "email",
  "marks", "percentage", "emcet", "educationtype",
  "account_no", "ifsc_code",
  "doj", "year", "leaves", "batch_year", "student_status"
];

const REQUIRED_FIELDS = [
  "name", "roll_no", "hall_ticket", "course",
  // "account_no","ifsc_code",
  "doj",
  "year","leaves","batch_year"
];

const SPECIAL = {
  dob: { type: "date" },
  doj: { type: "date" },
  address: { type: "textarea", placeholder: "Enter address" },
  gender: { type: "select", options: ["", "Male", "Female"] },
  phstatus: { type: "select", options: ["", "Yes", "No"] },
  course: { type: "select", options: ["", "Bachelor of Science Nursing", "B.A"] },
  student_status: { type: "select", options: ["Regular", "Long Absent", "Discontinue", "Re-admission", ] }
};

const initialData = Object.fromEntries(FIELDS.map((f) => [f, ""]));

const StudentAddStipend = () => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [studentExists, setStudentExists] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (e) =>
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));

  // 🔍 Check student by Roll No
  const handleSearch = async () => {
    setData({ ...initialData, roll_no: data.roll_no });
    if (!data.roll_no.trim()) return alert("Please enter Roll No");

    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/certificates/student_info", {
                          params: { roll_no: data.roll_no },
                      });

      let studentData = Array.isArray(res.data) ? res.data[0] : res.data;

      if (studentData) {
        // ✅ Convert all date fields to YYYY-MM-DD
        ["dob", "doj"].forEach((field) => {
          if (studentData[field]) {
            studentData[field] = studentData[field].split("T")[0]; // "2024-12-05T00:00:00.000Z" → "2024-12-05"
          }
        });

        setData(studentData);
        setStudentExists(true);
      } else {
        setData({ ...initialData, roll_no: data.roll_no });
        setStudentExists(false);
      }
    } catch (err) {
      setData({ ...initialData, roll_no: data.roll_no });
      setStudentExists(false);
    } finally {
      setLoading(false);
    }
  };

  // 📝 Open confirmation popup
  const handleOpenDialog = (e) => {
    e.preventDefault();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  // ✅ Add or Update student
  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Convert empty string dates to null for backend
      const payload = { ...data };
      ["dob","doj"].forEach((field) => {
        if (!payload[field]) payload[field] = null;
      });

      const res = await axiosInstance.post("/api/stipend/add-or-update-student", payload);

      alert(res.data.message); // added or updated
      setData(initialData);
      setStudentExists(false);
      handleCloseDialog();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  const renderField = (key) => {
    const spec = SPECIAL[key] || { type: "text" };
    const isRequired = REQUIRED_FIELDS.includes(key);

    const commonProps = {
      name: key,
      className: "form-input",
      value: data[key],
      onChange: handleChange,
      required: isRequired,
    };

    if (spec.type === "date") return <input type="date" {...commonProps} />;
    if (spec.type === "textarea")
      return <textarea {...commonProps} placeholder={spec.placeholder || key} />;
    if (spec.type === "select")
      return (
        <select {...commonProps}>
          {spec.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt === "" ? "Select" : opt}
            </option>
          ))}
        </select>
      );

    return <input type="text" {...commonProps} />;
  };

  return (
    <form className="study-main">
      <div className="sub-study-main">Add / Update Student</div>

      {/* Roll No search */}
      <div className="form-group">
        <label className="form-label">
          ROLL NO <span className="required">*</span>
        </label>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            className="form-input"
            value={data.roll_no}
            name="roll_no"
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="button-style"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Searching..." : "Fetch Student"}
          </button>
        </div>
      </div>

      {/* All other fields */}
      <div className="form-grid">
        {FIELDS.filter(f => f !== "roll_no").map((key) => (
          <div className="form-group" key={key}>
            <label className="form-label">
              {key.replace(/_/g, " ").toUpperCase()}
              {REQUIRED_FIELDS.includes(key) && (
                <span className="required">*</span>
              )}
            </label>
            {renderField(key)}
          </div>
        ))}
      </div>

      {/* Submit button opens confirmation */}
      <button
        type="submit"
        className="button-style"
        onClick={handleOpenDialog}
        disabled={loading}
        style={{
          cursor: loading ? "not-allowed" : "pointer",
          backgroundColor: loading ? "#ccc" : "#4b1d77",
        }}
      >
        {loading ? (studentExists ? "Updating..." : "Saving...") : (studentExists ? "Update Student" : "Add Student")}
      </button>

      {/* MUI Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="xs">
        <DialogTitle>Confirm {studentExists ? "Update" : "Add"}</DialogTitle>
        <DialogContent>
          Are you sure you want to {studentExists ? "update" : "add"} student <b>{data.name || "?"}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button color="primary" onClick={handleSubmit}>
            {studentExists ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default StudentAddStipend;
