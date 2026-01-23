import React, { useEffect, useState, useRef } from "react";
import { FaEdit, FaCheck, FaTrash } from "react-icons/fa";
import axiosInstance from "../../components/AxiosInstance";
import { useNavigate } from "react-router-dom";
import "../../styles/StipendManagement/StipendTable.css";

// ✅ MUI Components (all individually)
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material";

// ✅ MUI Icons (can be grouped)
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import VisibilityIcon from "@mui/icons-material/Visibility";

const StipendTable = ({ setEditableData, user }) => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const fetchOnce = useRef(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [selected, setSelected] = useState([]); // track selected row ids
  const [selectAll, setSelectAll] = useState(false); // header checkbox state
  const [selectedItem, setSelectedItem] = useState(null); // single selected item for edit/approval
  const [loading, setLoading] = useState(false); // loading state for API calls

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [course, setCourse] = useState("All");
  const [year, setYear] = useState("All");
  const [rollNo, setRollNo] = useState("");

  const months = [
    { number: 1, name: "January" }, { number: 2, name: "February" },
    { number: 3, name: "March" }, { number: 4, name: "April" },
    { number: 5, name: "May" }, { number: 6, name: "June" },
    { number: 7, name: "July" }, { number: 8, name: "August" },
    { number: 9, name: "September" }, { number: 10, name: "October" },
    { number: 11, name: "November" }, { number: 12, name: "December" },
  ];

  const fetchStipends = async () => {
    try {
      setDataLoaded(true);
      const response = await axiosInstance.get("/api/stipend/stipend_details", {
        params: { role: user.role, month: currentMonth, course : course, year : year, roll_no : rollNo || "" },
      });
      const result = response.data;

      if (result.success) {
        setData(result.data);
      } else {
        console.error("Failed to fetch stipends:", result.error);
      }
    } catch (err) {
      console.error("Error fetching stipend data:", err);
    } finally {
      setDataLoaded(false);
    }
  };

  // Fetch data from API
  useEffect(() => {
    
    if (!fetchOnce.current) {
      fetchStipends();
    }
  }, [currentMonth, course, year]);

  // Handle header checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelected([]);
      setSelectAll(false);
    } else {
      const allIds = data.map((row) => row.id);
      setSelected(allIds);
      setSelectAll(true);
    }
  };

  // Handle row checkbox toggle
  const handleRowSelect = (id) => {
    let updatedSelected = [];
    if (selected.includes(id)) {
      updatedSelected = selected.filter((rowId) => rowId !== id);
    } else {
      updatedSelected = [...selected, id];
    }
    setSelected(updatedSelected);
    setSelectAll(updatedSelected.length === data.length);
  };

  // Handle View
  const handleView = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  // Handle Edit
  const handleEdit = (row) => {
    setEditableData(row);
    navigate("/stipendform");
  };

  // Handle Delete
    const handleDelete = async (row) => {
      if (!window.confirm(`Are you sure you want to delete stipend record for ${row.name} (Roll No: ${row.roll_no})?`)) { 
        return;
      }
      try {
        setLoading(true);
        const response = await axiosInstance.delete("/api/stipend/delete_student_stipend", {
          params: { id: row.id, userInfo : user },
        });
        const result = response.data;
        if (result.success) {
          alert("Stipend record deleted successfully");
          setData((prevData) => prevData.filter((item) => item.id !== row.id));
        } else {
          alert("Failed to delete stipend record: " + result.error);
        }
      } catch (err) {
        console.error("Error deleting stipend record:", err);
        alert("Error deleting stipend record");
      }
      finally {
        setLoading(false);
      }
    };

  // Handle Approval
  const handleApproval = (row) => {
    setSelectedItem(row);
    setShowModal(true);
  };

  // Handle bulk approval
  const handleBulkApproval = async () => {
    setLoading(true);
    if (selected.length === 0) return;
    try{
      const result = await axiosInstance.post("/api/stipend/bulk_approval", {
        ids: selected, role: user.role, userInfo : user
      });
      if(result.data.success){
        alert("Stipends approved successfully");
        setData((prevData) =>
          prevData.map((item) =>
            selected.includes(item.id)  
              ? { ...item, [`${user.role.toLowerCase()}_status`]: "approved" }
              : item
          )
        );
        
        setSelected([]);
        setSelectAll(false);  
      } else {
        alert("Failed to approve stipends: " + result.data.error);
      }
    }
    catch(err){
      console.error("Error approving stipends:", err);
      alert("Error approving stipends");
    } finally {
      setLoading(false);
    }
  };

  const handleApprovalSubmit = async (e) => {
    e.preventDefault();
    const status  = e.target.name;
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/stipend/action_status", {
        params: { id: selectedItem.id, status : status, role : user.role, userInfo : user },
      });
      const result = response.data;
      if (result.success) {
        alert("Stipend approved successfully");
        if(status === "approved"){
          setData((prevData) =>
            prevData.map((item) =>
              item.id === selectedItem.id
                ? { ...item, [`${user.role.toLowerCase()}_status`]: "approved" }
                : item
            )
          );
        } else if(status === "rejected"){
          setData((prevData) =>
            prevData.map((item) => 
              item.id === selectedItem.id
                ? { ...item, [`${user.role.toLowerCase()}_status`]: "rejected" }
                : item  
            )
          );
        }
        setSelectedItem(null);
        setShowModal(false);
      } else {
        alert("Failed to approve stipend: " + result.error);
      }
    } catch (err) {
      console.error("Error approving stipend:", err);
      alert("Error approving stipend");
    } finally {
      setLoading(false);
    }
  };

  // Download PDF Report
  const downloadReport = async (data) => {
    try {
      // 🔹 Dynamically get month, year, and batch
      const now = new Date();
      const month = now.toLocaleString("en-US", { month: "long" }); // e.g. "September"
      const Present_year = now.getFullYear(); // e.g. 2025
      const batch = `${Present_year - 1}-${Present_year}`; // auto: "2024-2025"

      setLoading(true);
      const response = await axiosInstance.post(
        "api/report/stipend_report",
        { currentMonth, year, batch, course, user }, // send to backend
        {
          headers: { "Content-Type": "application/json" },
          responseType: "blob", // important for PDF
          params: { role: user.role, month: currentMonth, course : course, year : year, roll_no : rollNo || "" },
        }
      );

      // Create PDF blob
      const fileBlob = new Blob([response.data], { type: "application/pdf" });

      // Create a link for download
      const url = window.URL.createObjectURL(fileBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Stipend_Report_${month}_${year}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading stipend report:", error);
    } finally {
      setLoading(false);
    }
  };

  //Download Excel Report
  const downloadExcelReport = async (data) => {
    try {
      // 🔹 Dynamically get month, year, and batch
      const now = new Date();
      const month = now.toLocaleString("en-US", { month: "long" }); // e.g. "October"
      const Present_year = now.getFullYear(); // e.g. 2025
      const batch = `${Present_year - 1}-${Present_year}`; // auto: "2024-2025"

      setLoading(true);

      const response = await axiosInstance.post(
        "api/report/stipend_excel", // backend endpoint for Excel
        {  currentMonth, year, batch, course, user },
        {
          headers: { "Content-Type": "application/json" },
          responseType: "blob", // important for Excel
          params: { role: user.role, month: currentMonth, course : course, year : year, roll_no : rollNo || "" },
        }
      );

      // Create Excel blob
      const fileBlob = new Blob(
        [response.data],
        { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }
      );

      // Create a link for download
      const url = window.URL.createObjectURL(fileBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Stipend_Report_${month}_${year}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading Excel stipend report:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <React.Fragment>
      <div className="filter-container">
        <TextField className="m-4" style={{ minWidth: 200 }} label="Roll No" value={rollNo}
          onChange={(e) => setRollNo(e.target.value)} 
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              fetchStipends(); // uses current rollNo from state
            }
          }} />
        <FormControl className="m-4" style={{ minWidth: 200 }}>
          <InputLabel>Month</InputLabel>
          <Select value={currentMonth} label="Month" onChange={(e) => setCurrentMonth(e.target.value)}>
            <MenuItem value="All">All</MenuItem>
            {months.map((month) => (
              <MenuItem key={month.number} value={month.number}>
                {month.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="m-4" style={{ minWidth: 200 }}>
          <InputLabel>Course</InputLabel>
          <Select value={course}  label="Course" onChange={(e) => setCourse(e.target.value)} >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Bachelor of Science Nursing">Bachelor of Science Nursing</MenuItem>
            <MenuItem value="A.H.S">A.H.S</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="m-4" style={{ minWidth: 200 }}>
          <InputLabel>Year</InputLabel>
          <Select value={year} label="Year" onChange={(e) => setYear(e.target.value)} >
            <MenuItem value="All">All</MenuItem>
            {[1, 2, 3, 4].map((yr) => (
              <MenuItem key={yr} value={yr}> {yr} </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="mt-16 overflow-x-auto p-4">
        {/* Dynamic heading */}
        {(() => {
          const now = new Date();
          const displayYear = now.getFullYear();
          const batch = `${displayYear - 1}-${displayYear}`;
          const monthObj = months.find((m) => Number(m.number) === Number(currentMonth));
          const monthLabel = currentMonth === "All" ? "ALL MONTHS" : (monthObj ? monthObj.name.toUpperCase() : String(currentMonth).toUpperCase());
          const courseLabel = course === "All" ? "ALL COURSES" : course.toUpperCase();
          const yearLabel = year === "All" ? "" : `YEAR ${year}`;
          const stipendWord = currentMonth === "All" ? "STIPENDS" : "STIPEND";
          return (
            <h2 className="text-xl font-bold mb-4 text-center">
              Verification and Approval
            </h2>
          );
        })()}

        <div className="mb-4 flex justify-end gap-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            onClick={handleBulkApproval}
            disabled={selected.length === 0 || loading}
          >
            Approve
          </button>
          <button onClick={() => downloadReport(data)} disabled={loading}
            className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            Download PDF Report
          </button>
          {(user.role === "FA" || user.role === "FC") && (
            <button onClick={() => downloadExcelReport(data)} disabled={loading}
              className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            > Download Excel Report </button>
          )}
        </div>
        <table className="min-w-full border border-gray-400 text-sm text-center">
          <thead>
            <tr>
              <th className="border px-2 py-2 font-bold text-lg bg-gray-100" colSpan="15">ANNEXURE</th>
            </tr>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">
                <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
              </th>
              <th className="border px-2 py-1">Roll No.</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Course</th>
              <th className="border px-2 py-1">A/C Number</th>
              <th className="border px-2 py-1">IFSC</th>
              <th className="border px-2 py-1">view</th>
              <th className="border px-2 py-1">Leaves Availed</th>
              <th className="border px-2 py-1">Days Present</th>
              <th className="border px-2 py-1">Stipend</th>
              <th className="border px-2 py-1">Edit</th>
              <th className="border px-2 py-1">Delete</th>
              <th className="border px-2 py-1">Approval</th>
            </tr>
          </thead>

          <tbody>
            {dataLoaded ? (
              <tr>
                <td colSpan="15" className="p-4 text-center">
                  <CircularProgress />
                </td>
              </tr>
            ) : (
              <React.Fragment>
                {data.length > 0 ? data.map((row, idx) => (
                  <tr key={idx}>
                    <td className="border px-2 py-1">
                      <input
                        type="checkbox"
                        checked={selected.includes(row.id)}
                        onChange={() => handleRowSelect(row.id)}
                      />
                    </td>
                    <td className="border px-2 py-1">{row.roll_no}</td>
                    <td className="border px-2 py-1">{row.name}</td>
                    <td className="border px-2 py-1">{row.course}</td>
                    <td className="border px-2 py-1">{row.account_no}</td>
                    <td className="border px-2 py-1">{row.ifsc_code || "IFSC"}</td>
                    <td>
                      <button className="text-blue-600 hover:text-blue-800" onClick={() => handleView(row)}>
                        <VisibilityIcon style={{ color: "#4b1d77" }}/>
                      </button>
                    </td>
                    <td className="border px-2 py-1">{row.leaves}</td>
                    <td className="border px-2 py-1">{row.present}</td>
                    <td className="border px-2 py-1">{row.stipend}</td>
                    <td className="border px-2 py-1">
                      <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEdit(row)}>
                        <FaEdit />
                      </button>
                    </td>
                    <td className="border px-2 py-1">
                      <button className="text-red-600 hover:text-blue-800" onClick={() => handleDelete(row)}>
                        <FaTrash />
                      </button>
                    </td>
                    {user.role === "Verifier" ? (
                        <td className="border px-2 py-1">
                          {row.verifier_status === "Pending" && (
                            <HourglassEmptyIcon style={{ color: "orange", fontSize: "20px" }} titleAccess="Pending" onClick={() => handleApproval(row)}/>
                          )}
                          {row.verifier_status === "approved" && (
                            <CheckCircleIcon style={{ color: "green", fontSize: "20px" }} titleAccess="Approved" />
                          )}
                          {row.verifier_status === "rejected" && (
                            <CancelIcon style={{ color: "red", fontSize: "20px" }} titleAccess="Rejected" />
                          )}
                        </td>
                      ) : (user.role === "Approver" || user.role === "FA" || user.role === "FC") ? (
                          <td className="border px-2 py-1">
                            {row.approver_status === "Pending" && (
                              <HourglassEmptyIcon style={{ color: "orange", fontSize: "20px" }} titleAccess="Pending" onClick={() => handleApproval(row)} />
                            )}
                            {row.approver_status === "approved" && (
                              <CheckCircleIcon style={{ color: "green", fontSize: "20px" }} titleAccess="Approved" />
                            )}
                            {row.approver_status === "rejected" && (
                              <CancelIcon style={{ color: "red", fontSize: "20px" }} titleAccess="Rejected" />
                            )}
                          </td>
                      ) : user.role === "Checker" ? (
                          <td className="border px-2 py-1">
                            {row.checker_status === "Pending" && (
                              <HourglassEmptyIcon style={{ color: "orange", fontSize: "20px" }} titleAccess="Pending" onClick={() => handleApproval(row)} />
                            )}
                            {row.checker_status === "approved" && (
                              <CheckCircleIcon style={{ color: "green", fontSize: "20px" }} titleAccess="Approved" />
                            )}
                            {row.checker_status === "rejected" && (
                              <CancelIcon style={{ color: "red", fontSize: "20px" }} titleAccess="Rejected" />
                            )}
                          </td>
                        ) : null}
                  </tr>
                )) : (
                  <tr>
                    <td className="border px-2 py-4 text-center" colSpan="15">No records found</td>
                  </tr>
                )}
              </React.Fragment>
            )}
          </tbody>
        </table>
      </div>
      
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="md" fullWidth >
        <DialogTitle className="text-lg font-bold">Confirmation</DialogTitle>
        <DialogContent dividers className="text-center">Are you sure you want to proceed? </DialogContent>
        <DialogActions className="justify-center gap-4">
          <Button variant="outlined" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="contained" name="approved" color="success" disabled={loading} onClick={handleApprovalSubmit}
            sx={{ "&.Mui-disabled": { filter: "blur(1px)", opacity: 0.6, cursor: "not-allowed" } }}>
            Approved
          </Button>

        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Stipend Details</DialogTitle>
        <DialogContent dividers>
          {selectedRow && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "8px" }}>
              <div><strong>Roll No:</strong> {selectedRow.roll_no}</div>
              <div><strong>Name:</strong> {selectedRow.name}</div>
              <div><strong>Course:</strong> {selectedRow.course}</div>
              <div><strong>Account No:</strong> {selectedRow.account_no}</div>
              <div><strong>Leaves:</strong> {selectedRow.leaves}</div>
              <div><strong>Present Days:</strong> {selectedRow.present || "N/A"}</div>
              <div><strong>Stipend:</strong> {selectedRow.stipend || "N/A"}</div>
              
              <div><strong>Verifier ID:</strong> {selectedRow.verifier_id || "N/A"}</div>
              <div><strong>Verifier Name:</strong> {selectedRow.verifier_name || "N/A"}</div>
              <div><strong>Verifier Status:</strong> {selectedRow.verifier_status || "N/A"}</div>
              
              <div><strong>Approver ID:</strong> {selectedRow.approver_id || "N/A"}</div>
              <div><strong>Approver Name:</strong> {selectedRow.approver_name || "N/A"}</div>
              <div><strong>Approver Status:</strong> {selectedRow.approver_status || "N/A"}</div>
              <div><strong>Form Filled User ID:</strong> {selectedRow.checker_id || "N/A"}</div>
              <div style={{ gridColumn: "span 2" }}>
                <strong>Form Filled User Name:</strong> {selectedRow.checker_name || "N/A"}
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>


    </React.Fragment>
  );
};

export default StipendTable;
