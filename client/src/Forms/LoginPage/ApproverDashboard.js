import React, { useState ,useEffect} from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Visibility, CheckCircle } from "@mui/icons-material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"; 
import VisibilityIcon from "@mui/icons-material/Visibility";
import "../../styles/Dashboard/CheckerDashboard.css";

const ApproverDashboard = () => {
const [projectsData, setProjectsData] = useState([]);
const handleOpenPdf = (formId) => {
  if (formId) {
    window.open(  `http://localhost:4000/api/file/view/${formId}?name=certificate`, "_blank");
  } else {
    alert("No PDF available for this record.");
  }
};

 useEffect(() => {
   const fetchData = async () => {
     try {
       const response = await fetch("http://localhost:4000/api/checker");
       const data = await response.json();
       setProjectsData(data);
     } catch (error) {
       console.error("Error fetching data:", error);
     }
   };
 
   fetchData()
 }, []);
   return (
     <Box className="dashboard_main">
       <Box className="header_main"><Typography className="page_title">Certificates Dashboard</Typography></Box>
     <Grid container className="grid_header" sx={{ backgroundColor: "#4b1d77", color: "white", p: 2 }}>
        <Grid item size={2}>  <Typography>Application No</Typography></Grid>
        <Grid item size={2}>  <Typography>Course Type</Typography></Grid>
        <Grid item size={2}><Typography>Certificate Type</Typography></Grid>
        <Grid item size={2}><Typography>View</Typography></Grid>
        <Grid item size={2}>  <Typography>Maker Status</Typography></Grid>
        <Grid item size={2}><Typography> Approval</Typography></Grid>
       </Grid>
       {projectsData.length > 0 ? (
         projectsData.map((item, index) => (
            <Grid container
            key={index} sx={{ p: 1, borderBottom: "1px solid #ddd", alignItems: "center" }} >
             <Grid item size={2}> <Typography>{item.application_no}</Typography></Grid>
             <Grid item size={2}><Typography>{item.course_type}</Typography></Grid>
             <Grid item size={2}><Typography>{item.certificate_type}</Typography></Grid>
             <Grid item size={2} sx={{ display: "flex", gap: 1 }}>
            <PictureAsPdfIcon sx={{ cursor: "pointer", color: "red" }}  onClick={() => handleOpenPdf(item.id)}/>
           <VisibilityIcon sx={{ cursor: "pointer", color: "#4b1d77" }} /> 
           </Grid>
         <Grid item size={2}>  {item.maker_status === "success" ? (  <CheckCircle sx={{ color: "green" }} /> ) : (
         <Typography color="warning.main">Pending</Typography>)}</Grid>
         <Grid item size={2}> {item.approval_status === "success" ? (<CheckCircle sx={{ color: "green" }} />  ) : (
         <Typography color="warning.main">Pending</Typography>)}
       </Grid>
           </Grid>
         )) 
       ) : (
         <Typography className="no_data">No data available</Typography>
       )}
     </Box>
   );
 };

export default ApproverDashboard;
