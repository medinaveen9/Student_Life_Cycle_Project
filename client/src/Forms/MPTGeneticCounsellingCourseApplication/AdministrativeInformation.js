import { Typography, TextField, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';
import { useCourse } from "../../CourseContext"; 
const AdministrativeInformation = () => {
    const { setCourseName } = useCourse();
  const [adDetails, setAdDetails] = useState({
    ad_no: '',
    ad_date: '',
    application_no: '',
    course_code: '',
    course_name: '',
    date_of_entry: '',
    last_date: '',
    department: ''
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
         setCourseName(adDetails.course_name);
      console.log("Payload sending:", adDetails); 
      const response = await axios.post("http://localhost:4000/api/master/administrative_information", adDetails);
      console.log("Saved:", response.data);

    
      navigate("/gcappfee", { state: { course_name: adDetails.course_name } });
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <Box 
      sx={{ maxWidth: "1000px", mx: "auto", mt: 10, p: 5,  border: "1px solid #ccc",  color: "black",     backgroundColor: "white",   boxShadow: 3   }}       className="page-break"   >
      <Box sx={{ mb: 6 }}>
        <FormControl fullWidth margin="normal" size="small">
          <InputLabel>Course Name</InputLabel>
          <Select
            value={adDetails.course_name}
            label="Course Name"
            onChange={(e) => handleAdDetailsChange('course_name', e.target.value)} 
          >
            <MenuItem value="MPT">Master of Physiotherapy</MenuItem>
            <MenuItem value="GC">M.Sc Genetic Counselling</MenuItem>
          
          </Select>
        </FormControl>

        <Typography variant="h6" gutterBottom>Advertisement Details</Typography>

        <TextField 
          fullWidth   margin="normal" label="Application No." value={adDetails.application_no} 
          onChange={(e) => handleAdDetailsChange('application_no', e.target.value)} size="small"     type="number" />

        <TextField 
          fullWidth   margin="normal"  label="Course Code"  value={adDetails.course_code} 
          onChange={(e) => handleAdDetailsChange('course_code', e.target.value)} size="small"  type="number" />

        <TextField 
          fullWidth    margin="normal"  label="Ad. No."   value={adDetails.ad_no} 
          onChange={(e) => handleAdDetailsChange('ad_no', e.target.value)}   size="small"   type="number"/>

        <TextField 
          fullWidth margin="normal"   label="Ad. Date" type="date"  value={adDetails.ad_date} 
          onChange={(e) => handleAdDetailsChange('ad_date', e.target.value)} size="small"     InputLabelProps={{ shrink: true }} />

        <TextField 
          fullWidth  margin="normal" label="Date of Entry"  type="date" value={adDetails.date_of_entry} 
          onChange={(e) => handleAdDetailsChange('date_of_entry', e.target.value)} 
          size="small"      InputLabelProps={{ shrink: true }} />

        <TextField 
          fullWidth  margin="normal"  label="Last Date of Receiving Application" type="date" 
          value={adDetails.last_date}  onChange={(e) => handleAdDetailsChange('last_date', e.target.value)} 
          size="small" InputLabelProps={{ shrink: true }}  />

        <TextField  fullWidth   margin="normal"   label="Department"   value={adDetails.department} 
          onChange={(e) => handleAdDetailsChange('department', e.target.value)}   size="small"  />

        <Box sx={{ mt: 3, textAlign: 'right' }}>
          <Button variant="contained" onClick={handleNext}>Next</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdministrativeInformation;


