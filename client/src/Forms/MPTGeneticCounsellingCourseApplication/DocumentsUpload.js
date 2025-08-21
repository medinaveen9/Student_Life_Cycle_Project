import React, { useState } from 'react';
import { useCourse } from "../../CourseContext"; 
import { Typography, Box, Table, TableBody, TableCell,TableContainer, TableHead, TableRow, Paper, Button, TextField,Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

  const DocumentsUpload = () => {
  const { courseName,socialStatus } = useCourse();  
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const mptDocs = [
    'CASTE CERTIFICATE',
    '10th Class Marks Memo ',
    'MARKS MEMO OF BPT ',
    'PROVISIONAL/FINAL CERTIFICATE OF BPT ',
    'INTERNSHIP CERTIFICATE OF BPT ',
    'STUDY AND CONDUCT CERTIFICATE FROM 9th to INTERMEDIATE ',
    'STUDY AND CONDUCT CERTIFICATE OF BPT ',
    'TRANSFER/MIGRATION CERTIFICATE OF BPT ',
  ];

  const gcDocs = [
    '10th Class Marks Memo ',
    'MARKS MEMOS OF B.SC/B.TECH/MBBS/BDS ',
    'STUDY AND CONDUCT CERTIFICATES FROM 9TH CLASS TO B.SC/B.TECH/MBBS/BDs ',
    'PROVISIONAL/FINAL DEGREE CERTIFICATE of B.SC/B.TECH/MBBS/BDS ',
    'TRANSFER/MIGRATION CERTIFICATE OF B.SC/B.TECH/MBBS/BDS ',
    'CASTE CERTIFICATE ',
  ];

//   let documents = courseName === "MPT" ? mptDocs : gcDocs;
//   if (socialStatus === "OC") {
//   documents = documents.filter(doc => !doc.toLowerCase().includes("caste certificate"));
// }
const baseDocs = courseName === "MPT" ? mptDocs : gcDocs;

const documents = socialStatus === "OC"
  ? baseDocs.filter(doc => !doc.trim().toLowerCase().includes("caste certificate"))
  : baseDocs;

  const [uploadedDocs, setUploadedDocs] = useState({});
  const [formData, setFormData] = useState({
    application_no: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (index, file) => {
    setUploadedDocs(prev => ({
      ...prev,
      [index]: file
    }));
  };



const handleSubmit = async () => {
  try {
    const uploadForm = new FormData();
    // uploadForm.append("formID", formData.application_no); // match backend "formId"
  uploadForm.append("application_no", formData.application_no); 
  
    documents.forEach((doc, idx) => {
      if (uploadedDocs[idx]) {
   
        uploadForm.append(`file_${idx + 1}`, uploadedDocs[idx]); 
        uploadForm.append(`label_name_${idx + 1}`, doc); 
      }
    });

    const response = await axios.post(
      `http://localhost:4000/api/master/research`,
      uploadForm,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.log("Upload successful:", response.data);

 
    const documentStatus = documents.map((doc, idx) => ({
      name: doc,
      uploaded: !!uploadedDocs[idx],
      fileName: uploadedDocs[idx]?.name || null,
    }));

    const updatedFormData = {
      ...formData,
      documentUploads: documentStatus,
    };

    setFormData(updatedFormData);
    console.log("FINAL FORM DATA:", updatedFormData);

    setSuccessMessage("✅ Form submitted successfully!");
    alert("✅ Form Submitted Successfully!");
    setTimeout(() => {
      navigate('/gcadministration');
    }, 3000);
  } catch (error) {
    console.error("Upload failed:", error);
    alert("❌ Upload failed! Check console for details.");
  }
};

  return (
  
    <Box sx={{ maxWidth: "1000px", mx: "auto", mt: 10, p: 5, border: "1px solid #ccc", color: "black", backgroundColor: "white", boxShadow: 3 }}>
      
      <Typography variant="h6" gutterBottom>
        Document Uploads for {courseName} Course
      </Typography>

      <TextField
        label="Application No"
        value={formData.application_no}
        onChange={(e) => handleChange('application_no', e.target.value)}
        size="small"
        fullWidth
        sx={{ mb: 3 }}
        type="number"
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>Document Type</TableCell>
              <TableCell>Upload File</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((doc, idx) => (
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  {doc.includes("*") ? (
                    <Typography color="error">{doc}</Typography>
                  ) : (
                    doc
                  )}
                </TableCell>
                <TableCell>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => handleFileChange(idx, e.target.files[0])}
                  />
                  {uploadedDocs[idx] && (
                    <Typography variant="caption" color="primary">
                      {uploadedDocs[idx].name}
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3, textAlign: 'right' }}>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </Box>

    </Box>
    
  );
};

export default DocumentsUpload;

