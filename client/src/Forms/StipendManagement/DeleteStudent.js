import { useState } from "react";
import axiosInstance from "../../components/AxiosInstance";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import "../../styles/StipendManagement/PromotionYear.css";

const DeleteStudent = () => {
  const [rollNo, setRollNo] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

   // Search student
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!rollNo.trim()) {
      alert("Please enter Roll No");
      return;
    }

    try {
      setLoading(true);
      setStudent(null); // 🔥 Reset old data

      const res = await axiosInstance.get("/api/certificates/student_info", {
                          params: { roll_no: rollNo },
                      });

        // If res.data is an array, pick the first element
        if (Array.isArray(res.data) && res.data.length > 0) {
            setStudent(res.data[0]); // ✅ single object
        } else {
            setStudent(null);
            alert("Student not found");
        }
    } catch (err) {
      alert(err.response?.data?.message || "Student not found");
    } finally {
      setLoading(false);
    }
  };

  //  Open confirmation popup
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  //  Delete student
  const handleDelete = async () => {
    try {
      axiosInstance.delete(`/api/stipend/delete-student/${rollNo}`);
      alert("Student deleted successfully");
      setStudent(null);
      setRollNo("");
      handleCloseDialog();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <form className="study-main" onSubmit={handleSearch}>
      <div className="sub-study-main">Delete Student</div>

      <div className="form-group">
        <label className="form-label">
          ROLL NO <span className="required">*</span>
        </label>
        <input
          type="text"
          className="form-input"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="button-style" disabled={loading}>
        {loading ? "Searching..." : "Search Student"}
      </button>

      {/* Show Student Details */}
      {student && (
        <>
          <div className="sub-study-main" style={{ marginTop: "20px" }}>
            Student Details
          </div>

          <div className="form-grid">

            <div className="form-group">
              <label className="form-label">Roll No</label>
              <input className="form-input" value={student.roll_no} disabled />
            </div>

            <div className="form-group">
              <label className="form-label">Name</label>
              <input className="form-input" value={student.name} disabled />
            </div>

            <div className="form-group">
              <label className="form-label">Course</label>
              <input className="form-input" value={student.course} disabled />
            </div>

            <div className="form-group">
              <label className="form-label">Year</label>
              <input className="form-input" value={student.year} disabled />
            </div>

          </div>

          <Button
            variant="contained"
            color="error"
            style={{ marginTop: "20px" }}
            onClick={handleOpenDialog}
          >
            Delete Student
          </Button>
        </>
      )}

      {/* MUI Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete student <b>{student?.name}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default DeleteStudent;
