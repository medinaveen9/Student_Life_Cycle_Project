import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const IdentityVerification = () => {
  const navigate = useNavigate();

  const [adDetails, setAdDetails] = useState({
    idMark1: '',  idMark2: '',drivingLicense: '',passportNumber: '',  inService: '',    aadhar: '',   applicationNo: '', });
  const [passportFile, setPassportFile] = useState(null);
  const [voterIdFile, setVoterIdFile] = useState(null);
  const handleAdDetailsChange = (field, value) => {
    setAdDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try { 
    const isEmpty = (val) => !val || val.toString().trim() === "";
    const requiredFields = [
      { field: "applicationNo", label: "Application Number" },
      { field: "idMark1", label: "Identification Mark 1" },
      { field: "idMark2", label: "Identification Mark 2" },
      { field: "drivingLicense", label: "Driving License" },
      { field: "passportNumber", label: "Passport Number" },
      { field: "inService", label: "In Service Number" },
      { field: "aadhar", label: "Aadhar Number" },
    ];

    for (let f of requiredFields) {
      if (isEmpty(adDetails[f.field])) {
        return alert(`⚠️ Please fill ${f.label}`);
      }
    }

    if (!passportFile) return alert("⚠️ Please upload a Passport File");
    if (passportFile.size > 50 * 1024) return alert("⚠️ Photograph must be under 50KB");
    if (!voterIdFile) return alert("⚠️ Please upload a Voter Id");
    if (voterIdFile.size > 20 * 1024) return alert("⚠️ Voter Id must be under 20KB");

    const payload = {
      id_mark_1: adDetails.idMark1,
      id_mark_2: adDetails.idMark2,
      driving_license: adDetails.drivingLicense,
      passport_number: adDetails.passportNumber,
      in_service: adDetails.inService,
      aadhar: adDetails.aadhar,
      application_no: adDetails.applicationNo
    };

    console.log("Payload sending:", payload);

    const response = await axios.post(
      "http://localhost:4000/api/bpt/bpt_identity_verification",
      payload,
    );

    console.log("Saved Identity Verification:", response.data);
    if (response.data.success === false) {
      alert(`⚠️ ${response.data.message}`);
      return;
    }
    // Prepare form for file upload
    const uploadForm = new FormData();
    uploadForm.append("application_no", adDetails.applicationNo);
    uploadForm.append("file_1", passportFile);
    uploadForm.append("label_name_1", "passport");
    uploadForm.append("file_2", voterIdFile);
    uploadForm.append("label_name_2", "voterid");

    // Upload files
    const uploadResponse = await axios.post(
      "http://localhost:4000/api/bpt/research",
      uploadForm,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.log("Upload successful:", uploadResponse.data);

    navigate('/contact');
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    alert(
      error.response?.data?.message || "Something went wrong. Please try again."
    );
  }
};

  return (
    <Box
      sx={{ maxWidth: "1000px", mx: "auto", mt: 10, p: 5, border: "1px solid #ccc", color: "black", backgroundColor: "white", boxShadow: 3 }}
      className="page-break"
    >
      <Typography variant="h6" gutterBottom>
        Applicant's Identity Verification
      </Typography>

      <TextField fullWidth margin="normal" label="Application Number"
        value={adDetails.applicationNo} onChange={(e) => handleAdDetailsChange("applicationNo", e.target.value)} size="small" />

      <TextField fullWidth margin="normal" label="Identification Mark 1"
        value={adDetails.idMark1} onChange={(e) => handleAdDetailsChange("idMark1", e.target.value)} size="small" />

      <TextField fullWidth margin="normal" label="Identification Mark 2"
        value={adDetails.idMark2} onChange={(e) => handleAdDetailsChange("idMark2", e.target.value)} size="small" />

      <TextField fullWidth margin="normal" label="Driving License"
        value={adDetails.drivingLicense} onChange={(e) => handleAdDetailsChange("drivingLicense", e.target.value)} size="small" />

      <TextField fullWidth margin="normal" label="Passport Number"
        value={adDetails.passportNumber} onChange={(e) => handleAdDetailsChange("passportNumber", e.target.value)} size="small" />

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel>In Service</InputLabel>
        <Select
          value={adDetails.inService}
          onChange={(e) => handleAdDetailsChange("inService", e.target.value)}
        >
          <MenuItem value="Yes">Yes</MenuItem>
          <MenuItem value="No">No</MenuItem>
        </Select>
      </FormControl>

      <TextField fullWidth margin="normal" label="Aadhar Number"
        value={adDetails.aadhar} onChange={(e) => handleAdDetailsChange("aadhar", e.target.value)} size="small" />

      <Box sx={{ mt: 2 }}>
        <Typography>Upload Passport File</Typography>
        <input type="file" accept="image/jpeg" onChange={(e) => setPassportFile(e.target.files[0])} />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography>Upload Voter ID File</Typography>
        <input type="file" accept="image/jpeg" onChange={(e) => setVoterIdFile(e.target.files[0])} />
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle2">File Previews</Typography>
        {passportFile && <img src={URL.createObjectURL(passportFile)} alt="Passport Preview" width="100" />}
        {voterIdFile && <img src={URL.createObjectURL(voterIdFile)} alt="Voter ID Preview" width="100" />}
      </Box>

      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleSubmit}>
        Next
      </Button>
    </Box>
  );
};

export default IdentityVerification;

