import React, { useState } from 'react';
import { Typography, Box, Table, TableBody, TableCell,TableContainer, TableHead, TableRow, Paper, 
  IconButton, Tooltip, Button, TextField} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const DocumentsUpload = ({ }) => {
  const documents = [
    'CASTE CERTIFICATE',
    '10th Class Marks Memo',
    'INTERMEDIATE MARKS MEMO',
    '6TH to 10TH Study and Conduct Certificate',
    'INTER STUDY AND CONDUCT CERTIFICATE',
    'TRANSFER OR MIGRATION CERTIFICATE of Intermediate',
    'TELANGANA STATE EAPCET-2025 RANK CARD'
  ];

  const navigate = useNavigate();
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
const [formData, setFormData] = useState({
    application_no: '', 
  });
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  //Handle file selection
  const handleFileChange = (index, file) => {
    if (file && file.type === "application/pdf") {
      setUploadedDocs(prev => ({
        ...prev,
        [index]: file
      }));
    } else {
      alert("Please upload only PDF files.");
    }
  };


  const handleSubmit = async () => {
  
    const hasAtLeastOneFile = Object.keys(uploadedDocs).length > 0;
    if (!hasAtLeastOneFile) {
      alert("⚠️ Please upload at least one document before submitting.");
      return;
    }

    try {
      const uploadForm = new FormData();
      uploadForm.append("application_no", formData.application_no);

      documents.forEach((doc, idx) => {
        if (uploadedDocs[idx]) {
          uploadForm.append(`file_${idx + 1}`, uploadedDocs[idx]);
          uploadForm.append(`label_name_${idx + 1}`, doc);
        }
      });

      const response = await axios.post(
        `http://localhost:4000/api/bpt/research`,
        uploadForm,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Upload successful:", response.data);

      // Save document status in formData
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
        navigate('/administrative');
      }, 2000);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("❌ Upload failed! Check console for details.");
    }
  };

  return (
    <Box sx={{ maxWidth: "1000px", mx: "auto", mt: 10, p: 5, border: "1px solid #ccc", color: "black", backgroundColor: "white", boxShadow: 3 }} className="page-break">
      <Typography variant="h6" gutterBottom>Document Uploads</Typography>

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
                <TableCell>{doc}</TableCell>
                <TableCell>
                  <input  type="file" accept="application/pdf"
                    onChange={(e) => handleFileChange(idx, e.target.files[0])}
                  />
                  {uploadedDocs[idx] && (
                    <Tooltip title="View uploaded PDF">
                      <IconButton
                        onClick={() => {
                          const fileURL = URL.createObjectURL(uploadedDocs[idx]);
                          window.open(fileURL, "_blank");
                        }}
                      >
                        <PictureAsPdfIcon color="error" />
                      </IconButton>
                    </Tooltip>
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
