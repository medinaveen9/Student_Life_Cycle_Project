import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  Box, TextField,FormControl, Select,MenuItem, InputLabel,  Typography, Button} from '@mui/material';

const PersonalInformation = () => {
  const navigate = useNavigate();

  const [adDetails, setAdDetails] = useState({
    applicationNo: '',
    name: '',
    fatherName: '',
    dob: '',
    age: '',
    placeOfBirth: '',
    socialStatus: '',
    nationality: '',
    maritalStatus: '',
    gender: '',
    differentlyAbled: '',
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);

  const handleAdDetailsChange = (field, value) => {
    setAdDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = async () => {
    try {
      // Validate application no
      if (!adDetails.applicationNo.trim()) {
        alert("⚠️ Please enter Application No before submitting.");
        return;
      }

      // Validate files
      if (photoFile && photoFile.size > 50 * 1024) {
        alert("Photograph must be under 50KB");
        return;
      }
      if (signatureFile && signatureFile.size > 20 * 1024) {
        alert("Signature must be under 20KB");
        return;
      }

      const payload = {
        application_no: adDetails.applicationNo,
        name: adDetails.name,
        father_name: adDetails.fatherName,
        dob: adDetails.dob,
        age: adDetails.age,
        place_of_birth: adDetails.placeOfBirth,
        social_status: adDetails.socialStatus,
        nationality: adDetails.nationality,
        marital_status: adDetails.maritalStatus,
        gender: adDetails.gender,
        differently_abled: adDetails.differentlyAbled,
      };

      console.log("Payload sending:", payload);

      const response = await axios.post(
        "http://localhost:4000/api/bpt/bpt_personal_information",
        payload
      );
      console.log("Saved:", response.data);

      // Upload files if present
      if (photoFile || signatureFile) {
        const uploadForm = new FormData();
        uploadForm.append("application_no", adDetails.applicationNo);

        if (photoFile) {
          uploadForm.append("file_1", photoFile);
          uploadForm.append("label_name_1", "photo");
        }
        if (signatureFile) {
          uploadForm.append("file_2", signatureFile);
          uploadForm.append("label_name_2", "signature");
        }

        const uploadResponse = await axios.post(
          "http://localhost:4000/api/bpt/research",
          uploadForm,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Upload successful:", uploadResponse.data);
      }

      navigate("/identityverify");
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <Box sx={{ maxWidth: "1000px", mx: "auto", mt: 10, p: 5, border: "1px solid #ccc", color: "black", backgroundColor: "white", boxShadow: 3 }} className="page-break">
      <Typography variant="h6" gutterBottom>Application Form - Page 1</Typography>

      <TextField
        fullWidth margin="normal" label="Application No" value={adDetails.applicationNo}
        onChange={(e) => handleAdDetailsChange('applicationNo', e.target.value)}
        size="small"/>
      <TextField fullWidth margin="normal" label="Name" value={adDetails.name} onChange={(e) => handleAdDetailsChange('name', e.target.value)} size="small" />
      <TextField fullWidth margin="normal" label="Father's Name" value={adDetails.fatherName} onChange={(e) => handleAdDetailsChange('fatherName', e.target.value)} size="small" />
      <TextField fullWidth margin="normal" label="Date of Birth" type="date" value={adDetails.dob} onChange={(e) => handleAdDetailsChange('dob', e.target.value)} size="small" InputLabelProps={{ shrink: true }} />
      <TextField fullWidth margin="normal" label="Age (as on last date)" value={adDetails.age} onChange={(e) => handleAdDetailsChange('age', e.target.value)} size="small" />
      <TextField fullWidth margin="normal" label="Place of Birth" value={adDetails.placeOfBirth} onChange={(e) => handleAdDetailsChange('placeOfBirth', e.target.value)} size="small" />

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel>Social Status</InputLabel>
        <Select value={adDetails.socialStatus} label="Social Status" onChange={(e) => handleAdDetailsChange('socialStatus', e.target.value)}>
          <MenuItem value="SC">SC</MenuItem>
          <MenuItem value="ST">ST</MenuItem>
          <MenuItem value="BC">BC</MenuItem>
          <MenuItem value="OC">OC</MenuItem>
        </Select>
      </FormControl>

      <TextField fullWidth margin="normal" label="Nationality" value={adDetails.nationality} onChange={(e) => handleAdDetailsChange('nationality', e.target.value)} size="small" />

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel>Marital Status</InputLabel>
        <Select value={adDetails.maritalStatus} label="Marital Status" onChange={(e) => handleAdDetailsChange('maritalStatus', e.target.value)}>
          <MenuItem value="Married">Married</MenuItem>
          <MenuItem value="Unmarried">Unmarried</MenuItem>
        </Select>
      </FormControl>

      <TextField fullWidth margin="normal" label="Gender" value={adDetails.gender} onChange={(e) => handleAdDetailsChange('gender', e.target.value)} size="small" />

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel>Differently Abled</InputLabel>
        <Select value={adDetails.differentlyAbled} label="Differently Abled" onChange={(e) => handleAdDetailsChange('differentlyAbled', e.target.value)}>
          <MenuItem value="No">No</MenuItem>
          <MenuItem value="Physical">Physical</MenuItem>
          <MenuItem value="Hearing">Hearing</MenuItem>
          <MenuItem value="Dumb">Dumb</MenuItem>
          <MenuItem value="Mental">Mental</MenuItem>
        </Select>
      </FormControl>

      <Box mt={2}>
        <Typography variant="subtitle1">Upload Photograph</Typography>
        <input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => setPhotoFile(e.target.files[0])} />
        {photoFile && <Typography variant="caption" color="primary">{photoFile.name}</Typography>}
      </Box>
          <Typography variant="caption" color="red">
           (JPEG only, file size between 30KB and 50KB)
        </Typography>
      <Box mt={2}>
        <Typography variant="subtitle1">Upload Applicant Signature</Typography>
        <input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => setSignatureFile(e.target.files[0])} />
        {signatureFile && <Typography variant="caption" color="primary">{signatureFile.name}</Typography>}
      </Box>
          <Typography variant="caption" color="red">
             (JPEG only, file size between 30KB and 50KB)
        </Typography>
      <Box mt={2}>
        <Typography variant="subtitle2">Upload Applicant Signature</Typography>
         {photoFile && <img src={URL.createObjectURL(photoFile)} alt="Preview" width="100" />}
         {signatureFile && <img src={URL.createObjectURL(signatureFile)} alt="Signature" width="100" />}
       </Box>

      <Box mt={4} textAlign="right">
        <Button variant="contained" color="primary" onClick={handleNext}>
          Submit & Next
        </Button>
      </Box>
    </Box>
  );
};

export default PersonalInformation;
