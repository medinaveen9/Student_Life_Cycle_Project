import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {Box, TextField, FormControl, Select, MenuItem,InputLabel, Typography, Button} from '@mui/material';

const PersonalInformation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseName } = location.state || {};

  const [adDetails, setAdDetails] = useState({
    applicationNo:'',
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
    identificationMark1: '',
    identificationMark2: '',
    universityArea: '',
    inservice: '',
    aadhar: '',
    fathersEmail: '',

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
      identification_mark1: adDetails.identificationMark1,
      identification_mark2: adDetails.identificationMark2,
      university_area: adDetails.universityArea,
      inservice: adDetails.inservice,
      aadhar: adDetails.aadhar,
      fathers_email: adDetails.fathersEmail,
    };

    console.log("Payload sending:", payload);

    // 1. Save personal details
    const response = await axios.post(
      "http://localhost:4000/api/master/personal_information",
      payload
    );
    console.log("Saved:", response.data);
  if (photoFile && photoFile.size > 50 * 1024) {
      alert("Photograph must be under 50KB");
      return;
    }
    if (signatureFile && signatureFile.size > 20 * 1024) {
      alert("Signature must be under 20KB");
      return;
    }
    // 2. Upload files if present
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
        "http://localhost:4000/api/master/research",
        uploadForm,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Upload successful:", uploadResponse.data);
    }

    // 3. Move to next page
    navigate("/gccontact", { state: { course_name: courseName } });
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
  }
};

  return (
    <Box sx={{ maxWidth: "1000px",mx: "auto", mt: 10,  p: 5, border: "1px solid #ccc",color: "black",backgroundColor: "white",boxShadow: 3}} className="page-break">
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
        <TextField label="Application No" value={adDetails.applicationNo}
        onChange={(e) =>handleAdDetailsChange('applicationNo', e.target.value)}   type="number"size="small"  fullWidth/>

      <TextField fullWidth margin="normal" label="Name"  value={adDetails.name}
        onChange={(e) => { const value = e.target.value;   if (/^[a-zA-Z\s]*$/.test(value)) {
        handleAdDetailsChange('name', value); }
       }} size="small"/>


     <TextField fullWidth  label="Father's Name" margin="normal" value={adDetails.fatherName}
      onChange={(e) => {  const value = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(value)) {   handleAdDetailsChange('fatherName', value);
        }  }} size="small"/>

      <TextField fullWidth label="Date of Birth" type="date" margin="normal"
        value={adDetails.dob} onChange={(e) => handleAdDetailsChange('dob', e.target.value)}
        size="small" InputLabelProps={{ shrink: true }} />

      <TextField fullWidth label="Age (as on last date)" margin="normal" value={adDetails.age}
        onChange={(e) => handleAdDetailsChange('age', e.target.value)} size="small"  type="number"/>

      <TextField fullWidth  label="Place of Birth"  margin="normal" value={adDetails.placeOfBirth}
        onChange={(e) => {  const value = e.target.value;
          if (/^[a-zA-Z\s]*$/.test(value)) {
          handleAdDetailsChange('placeOfBirth', value);
          } }}  size="small"/>

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel>Social Status</InputLabel>
        <Select value={adDetails.socialStatus}
          onChange={(e) => handleAdDetailsChange('socialStatus', e.target.value)}>
          {['SC', 'ST', 'BC', 'OC'].map(status => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </Select>
      </FormControl>

    <TextField  fullWidth  label="Nationality" margin="normal" value={adDetails.nationality}
      onChange={(e) => { const value = e.target.value;
      if (/^[a-zA-Z\s]*$/.test(value)) {
      handleAdDetailsChange('nationality', value);
    } }} size="small"/>

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel>Marital Status</InputLabel>
        <Select value={adDetails.maritalStatus}
          onChange={(e) => handleAdDetailsChange('maritalStatus', e.target.value)}>
          <MenuItem value="Married">Married</MenuItem>
          <MenuItem value="Unmarried">Unmarried</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel>Gender</InputLabel>
        <Select value={adDetails.gender}
          onChange={(e) => handleAdDetailsChange('gender', e.target.value)}>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel>Differently Abled</InputLabel>
        <Select value={adDetails.differentlyAbled}
          onChange={(e) => handleAdDetailsChange('differentlyAbled', e.target.value)}>
          <MenuItem value="No">No</MenuItem>
          <MenuItem value="Physical">Physical</MenuItem>
          <MenuItem value="Hearing">Hearing</MenuItem>
          <MenuItem value="Dumb">Dumb</MenuItem>
          <MenuItem value="Mental">Mental</MenuItem>
        </Select>
      </FormControl>
    <TextField fullWidth  label="Identification Mark 1"  margin="normal" value={adDetails.identificationMark1}
        onChange={(e) => { const value = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(value)) {
        handleAdDetailsChange('identificationMark1', value);
        }}}size="small" />

    <TextField  fullWidth  label="Identification Mark 2"  margin="normal"  value={adDetails.identificationMark2}
      onChange={(e) => {const value = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(value)) {handleAdDetailsChange('identificationMark2', value); }}}size="small" />

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel>University Area</InputLabel>
        <Select value={adDetails.universityArea}
          onChange={(e) => handleAdDetailsChange('universityArea', e.target.value)}>
          <MenuItem value="AU">AU</MenuItem>
          <MenuItem value="OU">OU</MenuItem>
          <MenuItem value="SVU">SVU</MenuItem>
          <MenuItem value="Non Local">Non Local</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel>In-service</InputLabel>
        <Select value={adDetails.inservice}
          onChange={(e) => handleAdDetailsChange('inservice', e.target.value)}>
          <MenuItem value="Yes">Yes</MenuItem>
          <MenuItem value="No">No</MenuItem>
        </Select>
      </FormControl>

      <TextField fullWidth label="Aadhar Number"margin="normal" value={adDetails.aadhar}
      onChange={(e) => { const value = e.target.value;
        if (/^\d{0,12}$/.test(value)) {
          handleAdDetailsChange('aadhar', value);
         }
        }} size="small" type="text" />

      <TextField fullWidth label="Father's Email" type="email" margin="normal"
        value={adDetails.fathersEmail}
        onChange={(e) => handleAdDetailsChange('fathersEmail', e.target.value)} size="small" />
  <Box mt={2}>
        <Typography variant="subtitle2">Upload Photograph</Typography>
       
        <input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files[0])} />
        {photoFile && <Typography variant="caption" color="primary">{photoFile.name}</Typography>}
      </Box>
        <Typography variant="caption" color="red">
     (JPEG only, file size between 30KB and 50KB)
  </Typography>
     <Box mt={2}>
        <Typography variant="subtitle2">Upload Signature</Typography>
        <input type="file" accept="image/*" onChange={(e) => setSignatureFile(e.target.files[0])} />
        { signatureFile&& <Typography variant="caption" color="primary">{signatureFile.name}</Typography>}
      </Box>
   <Typography variant="caption" color="red">
   (JPEG only, file size between 10KB and 20KB)
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
