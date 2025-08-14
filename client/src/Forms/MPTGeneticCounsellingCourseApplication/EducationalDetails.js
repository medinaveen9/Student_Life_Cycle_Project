
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const EducationalDetails = () => {
  const [formData, setFormData] = useState({
    application_no: '',
    qualification: '',
    marks_obtained: '',
    total_marks: '',
    average: '',
    percentage: '',
    internship_date: ''
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { courseName } = location.state || {};

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Calculate average and percentage
  useEffect(() => {
    const { marks_obtained, total_marks } = formData;

    if (marks_obtained && total_marks && !isNaN(marks_obtained) && !isNaN(total_marks)) {
      const obtained = parseFloat(marks_obtained);
      const total = parseFloat(total_marks);

      if (total > 0) {
        const percentage = ((obtained / total) * 100).toFixed(2);
        const average = (obtained / total).toFixed(2);

        setFormData(prev => ({
          ...prev,
          percentage,
          average
        }));
      }
    }
  }, [formData.marks_obtained, formData.total_marks]);

  const handleNext = async () => {
    // Check for required fields
    const requiredFields = ['application_no', 'qualification', 'marks_obtained', 'total_marks', 'internship_date'];
    const emptyFields = requiredFields.filter(field => !formData[field]);

    if (emptyFields.length > 0) {
      alert(`Please fill all required fields.`);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/master/educational_details",
        formData
      );

      console.log("✅ Saved Educational Details:", res.data);
      navigate("/gcupload");
      
    } catch (err) {
      console.error(
        "❌ Error saving educational details:",
        err.response?.data || err.message
      );
    }
  };

  const requiredLabel = (label) => (
    <span>{label} <span style={{ color: 'red' }}>*</span></span>
  );

  return (
    <Box sx={{ maxWidth: "1000px", mx: "auto", mt: 10, p: 5, border: "1px solid #ccc", color: "black", backgroundColor: "white", boxShadow: 3 }} className="page-break">
      <Typography variant="h6" gutterBottom>
        Educational Qualifications
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label={requiredLabel("Application No")}
          value={formData.application_no}
          onChange={(e) => handleChange('application_no', e.target.value)}
          size="small"
          fullWidth
          type="number"
        />

        <TextField
          label={requiredLabel("Qualification")}
          value={formData.qualification}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[a-zA-Z\s]*$/.test(value)) {
              handleChange('qualification', value);
            }
          }}
          size="small"
          fullWidth
        />

        <TextField
          label={requiredLabel("Marks Obtained")}
          value={formData.marks_obtained}
          onChange={(e) => handleChange('marks_obtained', e.target.value)}
          size="small"
          fullWidth
          type="number"
        />

        <TextField
          label={requiredLabel("Total Marks")}
          value={formData.total_marks}
          onChange={(e) => handleChange('total_marks', e.target.value)}
          size="small"
          fullWidth
          type="number"
        />

        <TextField
          label="Average"
          value={formData.average}
          InputProps={{ readOnly: true }}
          size="small"
          fullWidth
        />

        <TextField
          label="Percentage (%)"
          value={formData.percentage}
          InputProps={{ readOnly: true }}
          size="small"
          fullWidth
        />

        <TextField
          label={requiredLabel("Date of Completion of Internship")}
          type="date"
          value={formData.internship_date}
          onChange={(e) => handleChange('internship_date', e.target.value)}
          InputLabelProps={{ shrink: true }}
          size="small"
          fullWidth
        />
      </Box>

      <Box sx={{ textAlign: 'right', mt: 3 }}>
        <Button variant="contained" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default EducationalDetails;
