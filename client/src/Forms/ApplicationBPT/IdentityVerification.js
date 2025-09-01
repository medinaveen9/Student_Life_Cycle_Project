import React, { useState } from 'react';
import { Box, Typography, TextField, Button ,FormControl,Select,InputLabel,MenuItem} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const IdentityVerification = () => {
  const navigate = useNavigate();

  const [adDetails, setAdDetails] = useState({
    idMark1: '',
    idMark2: '',
    drivingLicense: '',
    passportNumber: '',
    inService: '',
    aadhar: '',
    applicationNo:'',
  });
  const [passportFile, setPassportFile] = useState(null);
  const [voterIdFile, setVoterIdFile] = useState(null);
  const handleAdDetailsChange = (field, value) => {
    setAdDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
        if (!adDetails.applicationNo.trim()) {
        alert("⚠️ Please enter Application No before submitting.");
        return;
      }
       if (!adDetails.aadhar.trim()) {
        alert("⚠️ Please enter aadhar No before submitting.");
        return;
      }
const payload = {
    
      id_mark_1: adDetails.idMark1,
      id_mark_2: adDetails.idMark2,
      driving_license: adDetails.drivingLicense,
      passport_number: adDetails.passportNumber,
      social_status: adDetails.socialStatus,
      in_service: adDetails.inService,
      aadhar: adDetails.aadhar, 
      application_no:adDetails.applicationNo
    
    };
     console.log("Payload sending:", adDetails);

      const response = await axios.post(
        "http://localhost:4000/api/bpt/bpt_identity_verification",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Saved Identity Verification:", response.data);


 if (passportFile || voterIdFile) {
        const uploadForm = new FormData();
        uploadForm.append("application_no", adDetails.applicationNo);

        if (passportFile) {
          uploadForm.append("file_1", passportFile);
          uploadForm.append("label_name_1", "passport");
        }

        if (voterIdFile) {
          uploadForm.append("file_2", voterIdFile);
          uploadForm.append("label_name_2", "voterid");
        }

    
      const uploadResponse = await axios.post(
        "http://localhost:4000/api/bpt/research",
        uploadForm,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Upload successful:", uploadResponse.data);
    }

      navigate('/contact');
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <Box
      sx={{maxWidth: "1000px",  mx: "auto",mt: 10,p: 5,  border: "1px solid #ccc", color: "black",backgroundColor: "white",boxShadow: 3  }}className="page-break">
      <Typography variant="h6" gutterBottom>
        Applicant's Identity Verification
      </Typography>
      <TextField fullWidth margin="normal" label="Application Number"
        value={adDetails.applicationNo} onChange={(e) => handleAdDetailsChange("applicationNo", e.target.value)} size="small" />

      <TextField 
      fullWidth margin="normal"  label="Identification Mark 1"  value={adDetails.idMark1}
        onChange={(e) => handleAdDetailsChange("idMark1", e.target.value)}   size="small"/>

      <TextField
        fullWidth margin="normal"   label="Identification Mark 2" value={adDetails.idMark2}
        onChange={(e) => handleAdDetailsChange("idMark2", e.target.value)} size="small" />

      <TextField
        fullWidth margin="normal"  label="Driving License"   value={adDetails.drivingLicense}
        onChange={(e) => handleAdDetailsChange("drivingLicense", e.target.value)}  size="small" />

      <TextField
        fullWidth   margin="normal"  label="Passport Number"   value={adDetails.passportNumber}
        onChange={(e) => handleAdDetailsChange("passportNumber", e.target.value)} size="small"/>

    <FormControl fullWidth margin="normal" size="small">
     <InputLabel>In Service</InputLabel>
    <Select
      value={adDetails.inService} label="In Service"
      onChange={(e) => handleAdDetailsChange("inService", e.target.value)} >
      <MenuItem value="Yes">Yes</MenuItem>
    <MenuItem value="No">No</MenuItem>
  </Select>
</FormControl>

      <TextField
        fullWidth  margin="normal"label="Aadhar Number"   value={adDetails.aadhar}
        onChange={(e) => handleAdDetailsChange("aadhar", e.target.value)} size="small"  />


      <Box sx={{ mt: 2 }}>
        <Typography>Upload Passport File</Typography>
        <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => setPassportFile(e.target.files[0])} />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography>Upload Voter ID File</Typography>
        <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => setVoterIdFile(e.target.files[0])} />
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle2">Upload Applicant Signature</Typography>
        {voterIdFile && <img src={URL.createObjectURL(voterIdFile)} alt="Preview" width="100" />}
       {passportFile&& <img src={URL.createObjectURL(passportFile)} alt="Signature" width="100" />}
       </Box>

      <Button
        variant="contained" color="primary"  sx={{ mt: 3 }} onClick={handleSubmit}> Next
    </Button>
    </Box>
  );
};

export default IdentityVerification;






