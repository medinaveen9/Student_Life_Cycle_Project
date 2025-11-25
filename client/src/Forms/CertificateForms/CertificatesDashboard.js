import React, { useState, useEffect, useRef } from "react";
import { Box,Typography, Grid,  Dialog,  DialogTitle,  DialogContent,TextField,RadioGroup, 
  FormControlLabel,  Radio, DialogActions, Button, } from "@mui/material";
import {List, ListItem, ListItemText, IconButton, Divider } from "@mui/material";
import axios from "axios";
import {  Table, TableHead, TableBody, TableRow, TableCell, } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import "../../styles/Dashboard/CheckerDashboard.css";
import axiosInstance from "../../components/AxiosInstance";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import DownloadIcon from "@mui/icons-material/Download";


const CertificateDashboard = ({user}) => {

    const fetchOnce = useRef(false);
    const [certificatesData, setCertificatesData] = useState([]);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [files, setFiles] = useState([]); // State to hold uploaded files
    const [openStatusDialog, setOpenStatusDialog] = useState(false);
    const [answers, setAnswers] = useState({}); // State to hold answers for approval questions

    const defaultQuestions = {
      TC: [
        "Is fee pending?",
        "Are all documents submitted?",
        "Is student eligible for TC?"
      ],
      Bonafide: [
        "Is the student currently enrolled?",
        "Are student details verified?",
        "Is purpose of bonafide verified?"
      ]
    };

    // Dynamically get questions based on selected certificate type
    const questions = selectedData?.certificate_type
      ? defaultQuestions[selectedData.certificate_type] || []
      : [];

    // Fetch data from the backend API
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get("/api/certificates/dashboard", {
            params: { user : user } // Pass user ID and role
          });
          
          console.log(response.data);
          setCertificatesData(response.data); // Axios gives parsed data here
        } catch (error) {
            console.error("Error fetching data:", error);
        }
      };
      if (!fetchOnce.current) {
          fetchData();
          fetchOnce.current = true;
      }
    }, []);

    // Handle opening view dialog
    const handleOpenView = async (data) => {
        try {
            // Fetch files from GridFS
            const filesRes = await axiosInstance.get(`/api/certificates/files`, {
                params: { id: data.request_id } 
            });
            setFiles(filesRes.data); // assume API returns array of file metadata
            data.files = filesRes.data; // attach files to data object
            setSelectedData(data);
            setOpenViewDialog(true);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch certificate data or files.");
        }
    };

    // Handle closing view dialog
    const handleCloseView = () => {
        setOpenViewDialog(false);
        setSelectedData(null);
        setFiles([]);
    };

  // Handle opening status dialog
  const handleOpenStatusDialog = (data) => {
    if(data?.verification) {
      setAnswers(data?.verification || {});
    }
    setSelectedData(data);
    setOpenStatusDialog(true);
  }
  // Handle closing status dialog
  const handleCloseStatusDialog = (data) => {
    setSelectedData(null);
    setOpenStatusDialog(false);
    setAnswers({});
  }

  // Handle status approval/rejection
  const handleStatusApproval = async (status) => {
    if (!selectedData) return;

    const questionCount = questions.length;
    const answeredCount = Object.keys(answers).length;

    if (answeredCount !== questionCount) {
      alert("Please answer all questions before submitting!");
      return;
    }

    const payload = {
      request_id: selectedData.request_id,
      certificate_id: selectedData.id,
      status,
      answers,
      user : user
    };

    try {
      const res = await axiosInstance.post("/api/certificates/verification", payload);
      alert("Status updated successfully!");
      setOpenStatusDialog(false);
      setAnswers({});
      // Optionally refresh table list
    } catch (err) {
      console.error(err);
      alert("Failed to update status!");
    }
  };

  return (
    <Box className="dashboard_main">
        <Box className="header_main"><Typography className="page_title">Certificates Dashboard</Typography> </Box>
        <Grid container className="grid_header"  sx={{ backgroundColor: "#4b1d77", color: "white", p: 2 }}>
            <Grid item size={2}> <Typography>Roll No</Typography> </Grid>
            <Grid item size={3}> <Typography>Name</Typography> </Grid>
            <Grid item size={2}><Typography>Course</Typography></Grid>
            <Grid item size={2}> <Typography>Certificate Type</Typography> </Grid>
            <Grid item size={1}><Typography>View</Typography>  </Grid>
            {user?.role?.toLowerCase() !== "maker" && (<Grid item size={1}><Typography>status</Typography>  </Grid>)}
            <Grid item size={user?.role?.toLowerCase() === "maker" ? 2 : 1}><Typography>Download</Typography>  </Grid>
        </Grid>

      {certificatesData.length > 0 ? (
            certificatesData.map((item, index) => (
                <Grid container key={index} className="grid_row">
                    <Grid item size={2} data-label="Roll No"><Typography>{item.roll_no}</Typography> </Grid>
                    <Grid item size={3} data-label="Name"><Typography>{item.name}</Typography> </Grid>
                    <Grid item size={2} data-label="Course"><Typography>{item.course_name}</Typography></Grid>
                    <Grid item size={2} data-label="Certificate Type"><Typography>{item.certificate_type}</Typography></Grid>
                    <Grid item size={1} data-label="View">
                        <VisibilityIcon sx={{ cursor: "pointer", color: "#4b1d77" }} onClick={() => handleOpenView(item)} />
                    </Grid>
                    {user?.role?.toLowerCase() !== "maker" && (
                      <Grid item size={1} data-label="Status">
                        {(() => {
                          const role = user.role?.toLowerCase(); // "checker" | "approver" | "verifier"
                          const statusKey = `${role}_status`;    // dynamic key: checker_status etc.
                          const status = item[statusKey];

                          const statusIcons = {
                            pending: (
                              <HourglassEmptyIcon
                                sx={{ color: "#FFA500", cursor: "pointer" }}
                                onClick={() => handleOpenStatusDialog(item)}
                              />
                            ),
                            approved: <CheckCircleIcon sx={{ color: "#4CAF50" }} onClick={() => handleOpenStatusDialog(item)}/>,
                            rejected: <CancelIcon sx={{ color: "#F44336" }} onClick={() => handleOpenStatusDialog(item)}/>,
                          };

                          return statusIcons[status] || null;
                        })()}
                      </Grid>
                    )}
                    {/* Download */}
                    <Grid item size={user?.role?.toLowerCase() === "maker" ? 2 : 1} data-label="Download">
                        <DownloadIcon sx={{ cursor: "pointer", color: "#4b1d77" }} />
                    </Grid>
                </Grid>
            ))
        ) : (
            <Typography className="no_data">No data available</Typography>
      )}

        <Dialog open={openViewDialog} onClose={handleCloseView} maxWidth="lg" fullWidth>
          <DialogTitle>Certificate Details</DialogTitle>
          <DialogContent dividers>
              {selectedData && (
                  <Grid container spacing={2}>
                      {/* Existing fields */}
                      <Grid item size={12}>
                          <Typography><strong>Roll No:</strong> {selectedData.roll_no}</Typography>
                      </Grid>
                      <Grid item size={12}>
                          <Typography><strong>Name:</strong> {selectedData.name}</Typography>
                      </Grid>
                      <Grid item size={12}>
                          <Typography><strong>Department:</strong> {selectedData.department}</Typography>
                      </Grid>
                      <Grid item size={12}>
                          <Typography><strong>Course:</strong> {selectedData.course_name}</Typography>
                      </Grid>
                      <Grid item size={12}>
                          <Typography><strong>Certificate Type:</strong> {selectedData.certificate_type}</Typography>
                      </Grid>
                      <Grid item size={12}>
                          <Typography><strong>Created At:</strong> {new Date(selectedData.created_at).toLocaleString()}</Typography>
                      </Grid>

                      {/* Data object */}
                      {selectedData.data && Object.keys(selectedData.data).map((key) => (
                          <Grid item size={12} key={key}>
                              <Typography>
                                  <strong>{key.replace("_", " ").toUpperCase()}:</strong> {selectedData.data[key]}
                              </Typography>
                          </Grid>
                      ))}

                      {/* Files array */}
                      {selectedData.files && selectedData.files.length > 0 && (
                          <Grid item size={12}>
                              <Typography><strong>Files:</strong></Typography>
                              <Grid container spacing={1}>
                                  {selectedData.files.map((file) => {
                                      // Determine icon based on file type
                                      const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file.filename);
                                      const isPDF = /\.pdf$/i.test(file.filename);

                                      return (
                                          <Grid item size = {12} key={file.id} sx = {{ display: "flex", alignItems: "center", gap: "40px" }}>
                                              <Typography variant="body2" sx = {{fontSize : "16px", minWidth : "150px"}}>{file.fieldName}  </Typography>
                                              <Button variant="outlined" sx = {{width : "300px"}}
                                                  startIcon={isPDF ? <i className="fas fa-file-pdf"></i> : isImage ? <i className="fas fa-file-image"></i> : <i className="fas fa-file"></i>}
                                                  onClick={() =>  window.open(`http://localhost:4000/api/certificates/file_id/${file.id}`, "_blank")}
                                              >
                                                  {file.originalName}
                                              </Button>
                                          </Grid>
                                      );
                                  })}
                              </Grid>
                          </Grid>
                      )}

                      {/* Checker / Verifier / Approver fields */}
                      {["checker_id", "checker_name", "checker_status", "checker_comments", "verifier_id", "verifier_name", 
                          "verifier_status", "verifier_comments", "approver_id", "approver_name", "approver_status", "approver_comments"].filter(field => selectedData[field])
                          .map((field, ind) => (
                              <Grid item size={12} key={ind}>
                                  <Typography>
                                      <strong>{field}:</strong> {selectedData[field] || "N/A"}
                                  </Typography>
                              </Grid>
                      ))}
                  </Grid>
              )}
          </DialogContent>
          <DialogActions>
              <Button onClick={handleCloseView} variant="contained" color="primary">Close</Button>
          </DialogActions>
        </Dialog>

        {/* Dialog */}
      <Dialog open={openStatusDialog} onClose={handleCloseStatusDialog} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold" }}>
          {selectedData?.certificate_type} - Approval
        </DialogTitle>
        <DialogContent>
          {(defaultQuestions[selectedData?.certificate_type] || []).map((q, index) => (
            <Grid container spacing={2} alignItems="center" key={index} sx={{ mb: 1 }}>
              <Grid item size={7}>
                <Typography>{q}</Typography>
              </Grid>
              <Grid item size={5} sx={{ display: "flex", gap: 1 }}>
                <Button variant={answers[q] === "Yes" ? "contained" : "outlined"}
                  color="success" onClick={() => setAnswers({ ...answers, [q]: "Yes" })} > Yes</Button>
                <Button variant={answers[q] === "No" ? "contained" : "outlined"}
                  color="error" onClick={() => setAnswers({ ...answers, [q]: "No" })} >No </Button>
              </Grid>
            </Grid>
          ))}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 3 }}>
          <Button variant="contained" color="success" onClick={() => handleStatusApproval("approved")}>Approve</Button>
          <Button variant="contained" color="error" onClick={() => handleStatusApproval("rejected")}>Reject</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default React.memo(CertificateDashboard);
