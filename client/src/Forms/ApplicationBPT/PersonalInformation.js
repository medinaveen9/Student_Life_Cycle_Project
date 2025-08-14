import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box,TextField,  FormControl, Select,  MenuItem, InputLabel, Typography, Button} from '@mui/material';

  const PersonalInformation = () => {
  const navigate = useNavigate();

  const [adDetails, setAdDetails] = useState({
    name: '',
    fatherName: '',
    dob: '',
    age: '',
    placeOfBirth: '',
    socialStatus: '',
    nationality: '',
    maritalStatus: '',
    gender: '',
    differentlyAbled: ''
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);

  const handleAdDetailsChange = (field, value) => {
    setAdDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {

    navigate('/identitydetails'); 
  };

  return (
  <Box sx={{maxWidth: "1000px", mx:"auto", mt:10, p:5, border:"1px solid #ccc",color:"black", backgroundColor:"white", boxShadow: 3 }} className="page-break">
      <Typography variant="h6" gutterBottom>Application Form - Page 1</Typography>

      <TextField fullWidth margin="normal" label="Name" value={adDetails.name} onChange={(e) => handleAdDetailsChange('name', e.target.value)} size="small" />
      <TextField fullWidth margin="normal" label="Father's Name" value={adDetails.fatherName} onChange={(e) => handleAdDetailsChange('fatherName', e.target.value)} size="small" />

      <Box mt={2}>
        <Typography variant="subtitle1">Upload Photograph</Typography>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={(e) => setPhotoFile(e.target.files[0])}
        />
        {photoFile && <Typography variant="caption" color="primary">{photoFile.name}</Typography>}
      </Box>

      <TextField fullWidth margin="normal" label="Date of Birth" type="date" value={adDetails.dob} onChange={(e) => handleAdDetailsChange('dob', e.target.value)} size="small" InputLabelProps={{ shrink: true }} />
      <TextField fullWidth margin="normal" label="Age (as on last date)" value={adDetails.age} onChange={(e) => handleAdDetailsChange('age', e.target.value)} size="small" />
      <TextField fullWidth margin="normal" label="Place of Birth" value={adDetails.placeOfBirth} onChange={(e) => handleAdDetailsChange('placeOfBirth', e.target.value)} size="small" />

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel>Social Status</InputLabel>
        <Select
          value={adDetails.socialStatus}
          label="Social Status"
          onChange={(e) => handleAdDetailsChange('socialStatus', e.target.value)}
        >
          <MenuItem value="SC">SC</MenuItem>
          <MenuItem value="ST">ST</MenuItem>
          <MenuItem value="BC">BC</MenuItem>
          <MenuItem value="OC">OC</MenuItem>
        </Select>
      </FormControl>

      <TextField fullWidth margin="normal" label="Nationality" value={adDetails.nationality} onChange={(e) => handleAdDetailsChange('nationality', e.target.value)} size="small" />

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel>Marital Status</InputLabel>
        <Select
          value={adDetails.maritalStatus}
          label="Marital Status"
          onChange={(e) => handleAdDetailsChange('maritalStatus', e.target.value)}
        >
          <MenuItem value="Married">Married</MenuItem>
          <MenuItem value="Unmarried">Unmarried</MenuItem>
        </Select>
      </FormControl>

      <TextField fullWidth margin="normal" label="Gender" value={adDetails.gender} onChange={(e) => handleAdDetailsChange('gender', e.target.value)} size="small" />

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel>Differently Abled</InputLabel>
        <Select
          value={adDetails.differentlyAbled}
          label="Differently Abled"
          onChange={(e) => handleAdDetailsChange('differentlyAbled', e.target.value)}
        >
          <MenuItem value="No">No</MenuItem>
          <MenuItem value="Physical">Physical</MenuItem>
          <MenuItem value="Hearing">Hearing</MenuItem>
          <MenuItem value="Dumb">Dumb</MenuItem>
          <MenuItem value="Mental">Mental</MenuItem>
        </Select>
      </FormControl>

      <Box mt={2}>
        <Typography variant="subtitle1">Upload Applicant Signature</Typography>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={(e) => setSignatureFile(e.target.files[0])}
        />
        {signatureFile && <Typography variant="caption" color="primary">{signatureFile.name}</Typography>}
      </Box>

      <Box mt={4} textAlign="right">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit & Next
        </Button>
      </Box>
    </Box>
  );
};

export default PersonalInformation;