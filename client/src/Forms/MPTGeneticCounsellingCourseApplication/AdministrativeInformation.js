import { Typography, TextField, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';
import { useCourse } from "../../CourseContext"; 
const AdministrativeInformation = () => {
  const { setCourseName } = useCourse();
  const [adDetails, setAdDetails] = useState({
    ad_no: '',ad_date: '', application_no: '',   course_code: '',course_name: '',date_of_entry: '',
    last_date: '',department: ''
  });

  const handleAdDetailsChange = (field, value) => {
    setAdDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const navigate = useNavigate();

  const handleNext = async () => {
   try {
    const isEmpty = (val) => !val || val.toString().trim() === "";
    const requiredFields = [
      { field: 'course_name', label: 'Course Name' },
      { field: 'application_no', label: 'Application Number' },
      { field: 'course_code', label: 'Course Code' },
      { field: 'ad_no', label: 'Ad. No.' },
      { field: 'date_of_entry', label: 'Date of Entry' },
      { field: 'last_date', label: 'Last Date of Receiving Application' },
      { field: 'department', label: 'Department' }
    ];
    // Check all required fields and alert if empty
    for (let f of requiredFields) {
      if (isEmpty(adDetails[f.field])) {
        return alert(`⚠️ Please fill ${f.label}`);
      }
    }
    setCourseName(adDetails.course_name);
    console.log("Payload sending:", adDetails); 

    const response = await axios.post(
      "http://localhost:4000/api/master/administrative_information",
      adDetails
    );

    console.log("Saved:", response.data);

    if (response.data.success === false) {
       alert(`⚠️ ${response.data.message}`);
      return; // stop navigation
    }
    navigate("/gcappfee", { state: { course_name: adDetails.course_name } });

  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    alert(
      error.response?.data?.message || "Something went wrong. Please try again."
    );
  }
};

  return (
    <Box 
      sx={{ maxWidth: "1000px", mx: "auto", mt: 10, p: 5,  border: "1px solid #ccc",  color: "black",     backgroundColor: "white",   boxShadow: 3   }}       className="page-break"   >
      <Box sx={{ mb: 6 }}>
        <FormControl fullWidth margin="normal" size="small">
          <InputLabel>Course Name</InputLabel>
          <Select
            value={adDetails.course_name} label="Course Name"
            onChange={(e) => handleAdDetailsChange('course_name', e.target.value)}  >
            <MenuItem value="MPT">Master of Physiotherapy</MenuItem>
            <MenuItem value="GC">M.Sc Genetic Counselling</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h6" gutterBottom>Advertisement Details</Typography>
        <TextField 
          fullWidth   margin="normal" required label="Application No." value={adDetails.application_no} 
          onChange={(e) => handleAdDetailsChange('application_no', e.target.value)} size="small"  />

        <TextField 
          fullWidth   margin="normal" required label="Course Code"  value={adDetails.course_code} 
          onChange={(e) => handleAdDetailsChange('course_code', e.target.value)} size="small"  type="number" />

        <TextField 
          fullWidth    margin="normal" required label="Ad. No."   value={adDetails.ad_no} 
          onChange={(e) => handleAdDetailsChange('ad_no', e.target.value)}   size="small"   type="number"/>

        <TextField 
          fullWidth margin="normal"   label="Ad. Date" type="date"  value={adDetails.ad_date} 
          onChange={(e) => handleAdDetailsChange('ad_date', e.target.value)} size="small"     InputLabelProps={{ shrink: true }} />

        <TextField 
          fullWidth  margin="normal"required label="Date of Entry"  type="date" value={adDetails.date_of_entry} 
          onChange={(e) => handleAdDetailsChange('date_of_entry', e.target.value)} size="small"      InputLabelProps={{ shrink: true }} />

        <TextField 
          fullWidth  margin="normal" required label="Last Date of Receiving Application" type="date" 
          value={adDetails.last_date}  onChange={(e) => handleAdDetailsChange('last_date', e.target.value)}   size="small" InputLabelProps={{ shrink: true }}  />

        <TextField  fullWidth   margin="normal" required  label="Department"   value={adDetails.department} 
          onChange={(e) => handleAdDetailsChange('department', e.target.value)}   size="small"  />

        <Box sx={{ mt: 3, textAlign: 'right' }}>
        
          <Button variant="contained" onClick={handleNext}>Next</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdministrativeInformation;


