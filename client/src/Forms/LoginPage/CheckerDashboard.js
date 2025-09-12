import React, { useState, useEffect } from "react";
import { Box,Typography, Grid,  Dialog,  DialogTitle,  DialogContent,TextField,RadioGroup,FormControlLabel,  Radio, DialogActions, Button} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";
import "../../styles/Dashboard/CheckerDashboard.css";
import axiosInstance from "../../components/AxiosInstance";

const CheckerDashboard = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); 
  const [openCommentsDialog, setOpenCommentsDialog] = useState(false); 
  const [currentItem, setCurrentItem] = useState(null);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");

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

  return (
    <Box className="dashboard_main">
      <Box className="header_main"><Typography className="page_title">Certificates Dashboard</Typography> </Box>
      <Grid container   className="grid_header"  sx={{ backgroundColor: "#4b1d77", color: "white", p: 2 }}>
        <Grid item size={2}> <Typography>Application No</Typography> </Grid>
        <Grid item size={2}><Typography>Course Type</Typography></Grid>
        <Grid item size={2}> <Typography>Certificate Type</Typography> </Grid>
        <Grid item size={1}><Typography>View</Typography>  </Grid>
        <Grid item size={2}><Typography>Approver Status</Typography>  </Grid>
        <Grid item size={2}><Typography>Comments</Typography></Grid>
        <Grid item size={1}><Typography>Approval</Typography></Grid>
      </Grid>

      {projectsData.length > 0 ? (
        projectsData.map((item, index) => (
      <Grid   container key={index}  sx={{ p: 1, borderBottom: "1px solid #ddd", alignItems: "center" }}>
        <Grid item size={2}><Typography>{item.application_no}</Typography> </Grid>
        <Grid item size={2}><Typography>{item.course_type}</Typography></Grid>
        <Grid item size={2}><Typography>{item.certificate_type}</Typography></Grid>
        <Grid item size={1} sx={{ display: "flex", gap: 1 }}>
          <PictureAsPdfIcon sx={{ cursor: "pointer", color: "red" }} onClick={() => handleOpenPdf(item.id)}/>
          <VisibilityIcon sx={{ cursor: "pointer", color: "#4b1d77" }}/> </Grid>
        <Grid item size={2}><Typography>{item.approver_status}</Typography></Grid>
        <Grid item size={2}><CommentIcon sx={{ cursor: "pointer", color: "#4b1d77" }}  onClick={() => handleOpenCommentsDialog(item)}/> </Grid>
        <Grid item size={1}><CommentIcon sx={{ cursor: "pointer", color: "#4b1d77" }}  onClick={() => handleOpenDialog(item)}/>
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
    </Box>
  );
};

export default React.memo(CheckerDashboard);
