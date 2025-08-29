import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Radio, RadioGroup, FormControlLabel, MenuItem} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const FormComponent = ({ formTitle, fields, nextRoute,formName }) => {
  const navigate = useNavigate();

  const initialState = fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const shouldDisplayField = (field) => {
    if (!field.conditional) return true;
    const { field: dependency, value } = field.conditional;
    return formData[dependency] === value;
  };
  const validate = () => {
    for (const field of fields) {
      if (field.required && !formData[field.name]) {
        alert(`Please fill out the required field: ${field.label}`);
        return false;
      }
    }
    return true;
  };
  
const handleSubmit = async (e) => {
  e.preventDefault(); 

  try {
    const payload = {
      tableName: formName,
      formData
    };

    console.log("🚀 Submitting payload to backend:", payload);

    const response = await axios.post(
      "http://localhost:4000/api/pgmedical/forms",
      payload,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    console.log("✅ Backend response:", response.data);

    // Navigation after successful submission
    if (formName === "pg_medical_qualification") {
      alert("Form submitted successfully!");
      navigate("/onboard");
    } else if (formName === "pg_onboarding_phase") {
      alert("Form submitted successfully!");
      navigate("/exam");
    } else if (formName === "pg_examination_assessment") {
      alert("Form submitted successfully!");
      navigate("/preadmission");
    } else if (nextRoute) {
      navigate(nextRoute);
    }

  } catch (err) {
    console.error("❌ Submission failed:", err.response?.data || err.message);
    alert("Form submission failed!");
  }
};

  return (
    <Box sx={{maxWidth: "1000px", mx:"auto", mt:10, p:5, border:"1px solid #ccc",color:"black", backgroundColor:"white", boxShadow: 3 }} className="page-break">
 
      <Typography variant="h6" gutterBottom>{formTitle}</Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          {fields.map((field) => {
            if (!shouldDisplayField(field)) return null;

            if (field.type === 'heading') {
              return (
                <Box key={field.text} sx={{ width: '100%', mt: 2, mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000000' }}>
                    {field.text}
                  </Typography>
                </Box>
              );
            }

            switch (field.type) {
              case 'text':
              case 'date':
                return (
                  <TextField
                    key={field.name}
                    type={field.type}
                    label={field.label}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                    required={field.required}
                    InputLabelProps={field.type === 'date' ? { shrink: true } : {}}
                  />
                );

              case 'select':
                return (
                  <TextField
                    key={field.name}
                    select
                    label={field.label}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                    required={field.required}
                  >
                    <MenuItem value="">Select</MenuItem>
                    {field.options.map(opt => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </TextField>
                );

              case 'textarea':
                return (
                  <TextField
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    multiline
                    rows={4}
                    value={formData[field.name]}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                    required={field.required}
                  />
                );

              case 'radio':
                return (
                  <Box key={field.name} sx={{ mb: 2, width: '100%' }}>
                    <Typography>{field.label}</Typography>
                    <RadioGroup
                      row
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                    >
                      {field.options.map(opt => (
                        <FormControlLabel
                          key={opt}
                          value={opt}
                          control={<Radio required={field.required} />}
                          label={opt}
                        />
                      ))}
                    </RadioGroup>
                  </Box>
                );

              default:
                return null;
            }
          })}
        </Box>

        <Box sx={{ textAlign: 'right' }}>
          <Button variant="contained" type="submit">
            {nextRoute ? 'Next' : 'Submit'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FormComponent;
