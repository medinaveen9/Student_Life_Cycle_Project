import React, { useState } from 'react';
import { TextField, Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Box,Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const AcademicRecord = () => {
  const [educationData, setEducationData] = useState([
    { className: 'Inter 2nd Year', yearOfStudy: '', schoolName: '', place: '', state: '', district: '' },
    { className: 'Inter 1st Year', yearOfStudy: '', schoolName: '', place: '', state: '', district: '' },
    { className: '10th Class', yearOfStudy: '', schoolName: '', place: '', state: '', district: '' },
    { className: '9th Class', yearOfStudy: '', schoolName: '', place: '', state: '', district: '' },
    { className: '8th Class', yearOfStudy: '', schoolName: '', place: '', state: '', district: '' },
    { className: '7th Class', yearOfStudy: '', schoolName: '', place: '', state: '', district: '' },
    { className: '6th Class', yearOfStudy: '', schoolName: '', place: '', state: '', district: '' }
  ]);
 

  const handleChange = (index, field, value) => {
    const updated = [...educationData];
    updated[index][field] = value;
    setEducationData(updated);
  };
    const navigate = useNavigate();
    
    const handleNext = () => {
      navigate('/upload');
         
    };
    
  return (
   <Box sx={{maxWidth: "1000px", mx:"auto", mt:10, p:5, border:"1px solid #ccc",color:"black", backgroundColor:"white", boxShadow: 3 }} className="page-break">
      <Typography variant="h6" gutterBottom>Educational Details</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#dddddd' }}>
              <TableCell>Class</TableCell>
              <TableCell>Year of Study</TableCell>
              <TableCell>Name of School / College</TableCell>
              <TableCell>Place</TableCell>
              <TableCell>State</TableCell>
              <TableCell>District</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {educationData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.className || '-'}</TableCell>

                <TableCell>
                  <TextField
                    size="small"
                    value={row.yearOfStudy}
                    onChange={(e) => handleChange(index, 'yearOfStudy', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={row.schoolName}
                    onChange={(e) => handleChange(index, 'schoolName', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={row.place}
                    onChange={(e) => handleChange(index, 'place', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={row.state}
                    onChange={(e) => handleChange(index, 'state', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={row.district}
                    onChange={(e) => handleChange(index, 'district', e.target.value)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 3, textAlign: 'right' }}>
        <Button variant="contained" onClick={handleNext}>Next</Button>
      </Box>
    </Box>
  );
};

export default AcademicRecord;

