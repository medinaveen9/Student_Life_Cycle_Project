import React, { useState, useEffect } from "react";
import {  Box, Typography, Grid, Dialog, DialogTitle, DialogContent,   TextField, RadioGroup, FormControlLabel, Radio, DialogActions, Button } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"; 
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from '@mui/icons-material/Comment';
import "../../styles/Dashboard/CheckerDashboard.css";
import axiosInstance from "../../components/AxiosInstance";

const ApproverDashboard = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [openCheckerDialog, setOpenCheckerDialog] = useState(false);
  const [openApprovalDialog, setOpenApprovalDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");

  const handleOpenPdf = (formId) => {
    if (formId) {
      window.open(`http://localhost:4000/api/file/view/${formId}?name=certificate`, "_blank");
    } else {
      alert("No PDF available for this record.");
    }
  };

  const handleOpenCheckerDialog = (item) => {
    setCurrentItem(item);
    setOpenCheckerDialog(true);
  };

  const handleOpenApprovalDialog = (item) => {
    setCurrentItem(item);
    setComment(item.approver_comments || "");
    setStatus(item.approver_status || "");
    setOpenApprovalDialog(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/checker");
        setProjectsData(response.data);  // axios parses JSON automatically
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.put(
        `http://localhost:4000/api/checker/certificate/${currentItem.id}/approve`,
        { comment, status } // send payload directly
      );

      const updatedItem = response.data; // axios auto-parses JSON
      setProjectsData(prev =>
        prev.map(p => (p.id === updatedItem.id ? updatedItem : p))
      );

      setOpenApprovalDialog(false);
    } catch (error) {
      console.error("Error updating certificate request:", error);
    }
  };


  return (
    <Box className="dashboard_main">
      <Box className="header_main"> <Typography className="page_title">Certificates Dashboard</Typography></Box>

      <Grid container className="grid_header" sx={{ backgroundColor: "#4b1d77", color: "white", p: 2 }}>
        <Grid item size={2}><Typography>Application No</Typography></Grid>
        <Grid item size={2}><Typography>Course Type</Typography></Grid>
        <Grid item size={2}><Typography>Certificate Type</Typography></Grid>
        <Grid item size={1}><Typography>View</Typography></Grid>
        <Grid item size={2}><Typography>Checker Status</Typography></Grid>
        <Grid item size={2}><Typography>Comments</Typography></Grid>
        <Grid item size={1}><Typography>Approval</Typography></Grid>
      </Grid>

      {projectsData.length > 0 ? (
        projectsData.map((item, index) => (
      <Grid container key={index} sx={{ p: 1, borderBottom: "1px solid #ddd", alignItems: "center" }}>
        <Grid item size={2}><Typography>{item.application_no}</Typography></Grid>
        <Grid item size={2}><Typography>{item.course_type}</Typography></Grid>
        <Grid item size={2}><Typography>{item.certificate_type}</Typography></Grid>
        <Grid item size={1} sx={{ display: "flex", gap: 1 }}>
          <PictureAsPdfIcon sx={{ cursor: "pointer", color: "red" }} onClick={() => handleOpenPdf(item.id)} />
          <VisibilityIcon sx={{ cursor: "pointer", color: "#4b1d77" }} /></Grid>
        <Grid item size={2}><Typography>{item.checker_status}</Typography></Grid>
        <Grid item size={2}><CommentIcon  sx={{ cursor: "pointer", color: "#4b1d77" }} onClick={() => handleOpenCheckerDialog(item)}/> </Grid>
        <Grid item size={1}>  <CommentIcon sx={{ cursor: "pointer", color: "#4b1d77" }}onClick={() => handleOpenApprovalDialog(item)}/>
      </Grid>
     </Grid>
        ))
      ) : (
        <Typography className="no_data">No data available</Typography>
      )}
      <Dialog open={openCheckerDialog} onClose={() => setOpenCheckerDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Checker Comments</DialogTitle>
        <DialogContent dividers>
          <Typography> {currentItem?.checker_comments || "No comments available"}</Typography>
        </DialogContent>
        <DialogActions> <Button onClick={() => setOpenCheckerDialog(false)}>Close</Button></DialogActions>
      </Dialog>

      <Dialog open={openApprovalDialog} onClose={() => setOpenApprovalDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Approval</DialogTitle>
        <DialogContent>
          <TextField  label="Comment" fullWidth  multiline minRows={3} value={comment}
            onChange={e => setComment(e.target.value)} />
          <RadioGroup
            row value={status} onChange={e => setStatus(e.target.value)}  sx={{ mt: 2 }}>
            <FormControlLabel value="success" control={<Radio />} label="Success" />
            <FormControlLabel value="reject" control={<Radio />} label="Reject" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenApprovalDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ApproverDashboard;
