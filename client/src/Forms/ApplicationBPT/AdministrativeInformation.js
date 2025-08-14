import React, { useState } from 'react';
import { Typography, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const AdministrativeInformation= () => {
  const [adDetails, setAdDetails] = useState({
    adNo: '',
    adDate: '',
    applicationNo: '',
    courseCode: '',
    courseName: '',
    dateOfEntry: '',
    lastDate: '',
  });
 
  const handleAdDetailsChange = (field, value) => {
    setAdDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/appfee");
  };
  
  return (
  <Box sx={{maxWidth: "1000px", mx:"auto", mt:10, p:5, border:"1px solid #ccc",color:"black", backgroundColor:"white", boxShadow: 3 }} className="page-break">
    <Box sx={{ mb: 6 }}>
        <Typography variant="h6" gutterBottom>Advertisement Details</Typography>
        <TextField fullWidth margin="normal" label="Application No." value={adDetails.applicationNo} onChange={(e) => handleAdDetailsChange('applicationNo', e.target.value)} size="small" />
        <TextField fullWidth margin="normal" label="Course Code" value={adDetails.courseCode} onChange={(e) => handleAdDetailsChange('courseCode', e.target.value)} size="small" />

       <FormControl fullWidth margin="normal" size="small">
        <InputLabel>Course Name</InputLabel>
       <Select
           value={adDetails.courseName} label="Course Name" onChange={(e) => handleAdDetailsChange('courseName', e.target.value)}>
            <MenuItem value="BPT">BPT</MenuItem>
            <MenuItem value="B.Sc Nursing">B.Sc Nursing</MenuItem>
            <MenuItem value="MPT">MPT</MenuItem>
            <MenuItem value="Post Basic B.Sc Nursing">Post Basic B.Sc Nursing</MenuItem>
   
    </Select>
      </FormControl>
       <TextField fullWidth margin="normal" label="Ad. No." value={adDetails.adNo} onChange={(e) => handleAdDetailsChange('adNo', e.target.value)} size="small" />
       <TextField fullWidth margin="normal" label="Ad. Date" type="date" value={adDetails.adDate} onChange={(e) => handleAdDetailsChange('adDate', e.target.value)} size="small" InputLabelProps={{ shrink: true }} />
       <TextField fullWidth margin="normal" label="Date of Entry" type="datetime-local" value={adDetails.dateOfEntry} onChange={(e) => handleAdDetailsChange('dateOfEntry', e.target.value)} size="small" InputLabelProps={{ shrink: true }} />
        <TextField fullWidth margin="normal" label="Last Date of Receiving Application" type="date" value={adDetails.lastDate} onChange={(e) => handleAdDetailsChange('lastDate', e.target.value)} size="small" InputLabelProps={{ shrink: true }} />
      
    <Box sx={{ mt: 3, textAlign: 'right' }}>
  <Button variant="contained" onClick={handleNext}>Next</Button>
  </Box>
  </Box>
  </Box>
  );
};

export default AdministrativeInformation;
          