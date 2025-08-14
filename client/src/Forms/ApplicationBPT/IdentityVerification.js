import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const IdentityVerification= () => {
  const navigate = useNavigate();

  const [adDetails, setAdDetails] = useState({
    idMark1: '', idMark2: '', drivingLicense: '', passportNumber: '',
    voterId: null, panCard: null, inService: '', aadhar: ''
  });

  const handleAdDetailsChange = (field, value) => {
    setAdDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
  
    console.log("Submitted Details:", adDetails);
    navigate('/contact'); 
  };

  const fields = [
    { label: 'Identification Mark 1', name: 'idMark1' },
    { label: 'Identification Mark 2', name: 'idMark2' },
    { label: 'Driving License', name: 'drivingLicense' },
    { label: 'Passport Number', name: 'passportNumber' },
    { label: 'Voter ID', name: 'voterId', type: 'file' },
    { label: 'PAN Card', name: 'panCard', type: 'file' },
    { label: 'In-service (Govt.)', name: 'inService' },
    { label: 'Aadhar Number', name: 'aadhar' },
  ];

  return (
 <Box sx={{maxWidth: "1000px", mx:"auto", mt:10, p:5, border:"1px solid #ccc",color:"black", backgroundColor:"white", boxShadow: 3 }} className="page-break">
      <Typography variant="h6" gutterBottom>Applicant's Details</Typography>

      {fields.map(({ label, name, type }) => (
        <Box key={name} sx={{ my: 1 }}>
          {type === 'file' ? (
            <>
              <Typography variant="subtitle2">{label}</Typography>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => handleAdDetailsChange(name, e.target.files[0])}
              />
              {adDetails[name] && (
                <Typography variant="caption" color="primary">
                  {adDetails[name].name}
                </Typography>
              )}
            </>
          ) : (
            <TextField
              fullWidth
              margin="normal"
              label={label}
              value={adDetails[name]}
              onChange={e => handleAdDetailsChange(name, e.target.value)}
              size="small"
            />
          )}
        </Box>
      ))}

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={handleSubmit}
      >
        Submit & Next
      </Button>
    </Box>
  );
};

export default IdentityVerification;