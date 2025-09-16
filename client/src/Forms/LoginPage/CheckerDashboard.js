import React, { useState, useEffect } from "react";
import { Box,Typography, Grid,  Dialog,  DialogTitle,  DialogContent,TextField,RadioGroup, 
  FormControlLabel,  Radio, DialogActions, Button} from "@mui/material";
import {List, ListItem, ListItemText, IconButton, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import {  Table, TableHead, TableBody, TableRow, TableCell, } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import "../../styles/Dashboard/CheckerDashboard.css";
import axiosInstance from "../../components/AxiosInstance";


const CheckerDashboard = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); 
  const [openCommentsDialog, setOpenCommentsDialog] = useState(false); 
  const [currentItem, setCurrentItem] = useState(null);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const [files, setFiles] = useState([]); // State to hold uploaded files
  const [openView, setOpenView] = useState(false); // State to control view dialog

  const [openApproval, setOpenApproval] = useState(false);
  const [approvalChecklist, setApprovalChecklist] = useState({});
  const [decision, setDecision] = useState("approve");
  const [approvalItem, setApprovalItem] = useState(null);

  const checklistQuestions = [
    { id: 1, text: "Name matches official records?" },
    { id: 2, text: "Course and department verified?" },
    { id: 3, text: "Payment receipt valid?" },
  ];

  const handleOpenApproval = (item) => {
    setApprovalItem(item);
    // reset checklist to default "no"
    const init = {};
    checklistQuestions.forEach(q => (init[q.id] = "no"));
    setApprovalChecklist(init);
    setDecision("approve");
    setOpenApproval(true);
  };

  const handleChecklistChange = (id, value) => {
    setApprovalChecklist(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmitApproval = async () => {
    try {
      await axios.post(`/api/certificates/approval/${approvalItem.id}`, {
        approver_by: "currentUserId", // replace with logged in user
        decision,
        checklist: checklistQuestions.map(q => ({
          id: q.id,
          text: q.text,
          answer: approvalChecklist[q.id],
        })),
      });
      alert("Approval submitted!");
      setOpenApproval(false);
    } catch (err) {
      console.error(err);
      alert("Error submitting approval");
    }
  };

  const handleOpenCommentsDialog = (item) => {
    setCurrentItem(item);
    setOpenCommentsDialog(true);
  };

  // Function to handle opening PDF in a new tab
  const handleOpenPdf = (formId) => {
    if (formId) {
      window.open(`http://localhost:4000/api/file/view/${formId}?name=certificate`, "_blank" );
    } else {
      alert("No PDF available for this record.");
    }
  };

  // Fetch data from the backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("http://localhost:4000/api/checker");
        setProjectsData(response.data); // Axios gives parsed data here
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const handleOpenDialog = (item) => {
    setCurrentItem(item);
    setComment(item.checker_comments || "");
    setStatus(item.checker_status || "");
    setOpenDialog(true);
  };

  const handleSubmit = async () => {
    if (!currentItem) return;

    try {
      const response = await axiosInstance.put(
        `http://localhost:4000/api/checker/certificate/${currentItem.id}/check`,
        { comment, status } // payload goes directly here
      );

      const updatedItem = response.data; // Axios auto-parses JSON
      setProjectsData((prev) =>
        prev.map((p) => (p.id === updatedItem.id ? updatedItem : p))
      );

      setOpenDialog(false);
    } catch (error) {
      console.error("Error updating certificate request:", error);
    }
  };

  // Handle viewing details
  async function handleOpenView(item) {
    try {
      const res = await axiosInstance.get('/api/certificates/files', {
        params: { id: item.id }
      });
      setCurrentItem(item);
      setFiles(res.data || []);
      setOpenView(true);
     
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Box className="dashboard_main">
      <Box className="header_main"><Typography className="page_title">Certificates Dashboard</Typography> </Box>
      <Grid container   className="grid_header"  sx={{ backgroundColor: "#4b1d77", color: "white", p: 2 }}>
        <Grid item size={1}> <Typography>Roll No</Typography> </Grid>
        <Grid item size={2}> <Typography>Name</Typography> </Grid>
        <Grid item size={1}><Typography>Course Type</Typography></Grid>
        <Grid item size={2}> <Typography>Certificate Type</Typography> </Grid>
        <Grid item size={1}><Typography>View</Typography>  </Grid>
        <Grid item size={2}><Typography>Approver Status</Typography>  </Grid>
        <Grid item size={1}><Typography>Approval</Typography></Grid>
      </Grid>

      {projectsData.length > 0 ? (
        projectsData.map((item, index) => (
      <Grid   container key={index}  sx={{ p: 1, borderBottom: "1px solid #ddd", alignItems: "center" }}>
        <Grid item size={1}><Typography>{item.application_no}</Typography> </Grid>
        <Grid item size={2}><Typography>{item.name}</Typography> </Grid>
        <Grid item size={1}><Typography>{item.course_type}</Typography></Grid>
        <Grid item size={2}><Typography>{item.certificate_type}</Typography></Grid>
        <Grid item size={1} sx={{ display: "flex", gap: 1 }}>
          <VisibilityIcon sx={{ cursor: "pointer", color: "#4b1d77" }} onClick={() => handleOpenView(item)} />
        </Grid>
        <Grid item size={2}><Typography>{item.approver_status}</Typography></Grid>
        <Grid item size={1}><CheckCircleIcon sx={{ cursor: "pointer", color: "#4b1d77" }}  onClick={() => handleOpenApproval(item)}/>
      </Grid>
      </Grid>
        ))
      ) : (
        <Typography className="no_data">No data available</Typography>
      )}

      <Dialog open={openCommentsDialog} onClose={() => setOpenCommentsDialog(false)}  maxWidth="md" fullWidth>
        <DialogTitle>Approver Comments</DialogTitle>
        <DialogContent dividers>
          <Typography>  {currentItem?.approver_comments || "No comments available"} </Typography>
        </DialogContent>
        <DialogActions>  <Button onClick={() => setOpenCommentsDialog(false)}>Close</Button> </DialogActions>
      </Dialog>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Approval</DialogTitle>
        <DialogContent>
          <TextField  label="Comment" fullWidth multiline minRows={3}
            value={comment}   onChange={(e) => setComment(e.target.value)} />
          <RadioGroup   row  value={status}
            onChange={(e) => setStatus(e.target.value)} sx={{ mt: 2 }} >
            <FormControlLabel value="success" control={<Radio />} label="Success" />
            <FormControlLabel value="reject" control={<Radio />} label="Reject" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
           <Button variant="contained" onClick={handleSubmit}>
            Submit
           </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openView} onClose={() => setOpenView(false)} maxWidth="xl" fullWidth>
        <DialogTitle sx={{ backgroundColor: 'primary.main', color: 'white' }}>
          Application Details
        </DialogTitle>
        <DialogContent dividers>
          {/* Details Section */}
          <Box sx={{ p: 2, mb: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Application Information
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1 }}>
              <Typography variant="body1">
                <b>Application No:</b> {currentItem?.application_no || "-"}
              </Typography>
              <Typography variant="body1">
                <b>Certificate Type:</b> {currentItem?.certificate_type || "-"}
              </Typography>
              <Typography variant="body1">
                <b>Course Type:</b> {currentItem?.course_type || "-"}
              </Typography>
              <Typography variant="body1">
                <b>Department:</b> {currentItem?.department || "-"}
              </Typography>
              <Typography variant="body1">
                <b>Name:</b> {currentItem?.name || "-"}
              </Typography>
              <Typography variant="body1">
                <b>Receipt No:</b> {currentItem?.receipt_no || "-"}
              </Typography>
              <Typography variant="body1">
                <b>Amount:</b> ₹ {currentItem?.amount || "-"}
              </Typography>
              <Typography variant="body1">
                <b>Date of Payment:</b>{" "}
                {currentItem?.date_of_payment
                  ? new Date(currentItem.date_of_payment).toLocaleDateString()
                  : "-"}
              </Typography>
              <Typography variant="body1">
                <b>Created At:</b>{" "}
                {currentItem?.created_at
                  ? new Date(currentItem.created_at).toLocaleString()
                  : "-"}
              </Typography>
            </Box>
          </Box>

          {/* Status Section */}
          <Box sx={{ p: 2, mb: 2, backgroundColor: 'grey.50', borderRadius: 2, border: '1px dashed #bdbdbd' }}>
            <Typography variant="h6" gutterBottom>
              Status
            </Typography>
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Typography variant="body1">
                <b>Checker Status:</b>{" "}
                <span
                  style={{
                    color:
                      currentItem?.checker_status === "success"
                        ? "green"
                        : currentItem?.checker_status === "pending"
                        ? "orange"
                        : "red",
                    fontWeight: 600,
                  }}
                >
                  {currentItem?.checker_status || "-"}
                </span>
              </Typography>
              <Typography variant="body1">
                <b>Approver Status:</b>{" "}
                <span
                  style={{
                    color:
                      currentItem?.approver_status === "success"
                        ? "green"
                        : currentItem?.approver_status === "pending"
                        ? "orange"
                        : "red",
                    fontWeight: 600,
                  }}
                >
                  {currentItem?.approver_status || "-"}
                </span>
              </Typography>
            </Box>
          </Box>

          {/* Files Section */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Uploaded Files
            </Typography>
            {files.length > 0 ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {files.map((f, index) => (
                  <Typography key={index} variant="body1">
                    <b>{f.fieldName || "File"}:</b>{" "}
                    <a
                      href={`http://localhost:4000/api/certificates/file_id/${f.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#4b1d77',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                    >
                      {f.filename}
                    </a>
                  </Typography>
                ))}
              </Box>
            ) : (
              <Typography sx={{ fontStyle: 'italic', color: 'text.secondary' }}>No files uploaded</Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenView(false)} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openApproval} onClose={() => setOpenApproval(false)} maxWidth="xl" fullWidth>
        <DialogTitle>Your Approval</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1" gutterBottom>
            Please review each condition before final approval
          </Typography>

          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell><b>S.No</b></TableCell>
                <TableCell><b>Condition</b></TableCell>
                <TableCell><b>Yes / No</b></TableCell>
                <TableCell><b>Remarks</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {checklistQuestions.map((q, index) => (
                <TableRow key={q.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{q.text}</TableCell>
                  <TableCell>
                    <RadioGroup
                      row
                      value={approvalChecklist[q.id]?.answer || "no"}
                      onChange={(e) =>
                        setApprovalChecklist(prev => ({
                          ...prev,
                          [q.id]: { ...(prev[q.id] || {}), answer: e.target.value }
                        }))
                      }
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  </TableCell>
                  <TableCell>
                    <TextField fullWidth
                      size="small"
                      variant="outlined"
                      placeholder="Remarks"
                      value={approvalChecklist[q.id]?.remarks || ""}
                      onChange={(e) =>
                        setApprovalChecklist(prev => ({
                          ...prev,
                          [q.id]: { ...(prev[q.id] || {}), remarks: e.target.value }
                        }))
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Typography variant="subtitle1" sx={{ mt: 3 }}>Final Decision</Typography>
          <RadioGroup row value={decision} onChange={(e) => setDecision(e.target.value)}>
            <FormControlLabel value="approve" control={<Radio />} label="Approve" />
            <FormControlLabel value="reject" control={<Radio />} label="Reject" />
          </RadioGroup>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenApproval(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitApproval}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default React.memo(CheckerDashboard);
