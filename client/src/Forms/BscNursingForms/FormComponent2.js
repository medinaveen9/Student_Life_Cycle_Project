import React, { useState } from 'react';
import { Box,Typography, Table, TableBody,TableCell,TableContainer, TableHead,TableRow, Paper, TextField, Button}
 from '@mui/material';

const FormComponent2 = ({ title, subjectsData, idLabel = 'Roll Number' }) => {
  const [name, setName] = useState('');
  const [idValue, setIdValue] = useState('');
  const [dob, setDob] = useState('');
  const [inputRollNumber, setInputRollNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [academicyear, setAcademicYear] = useState('');

  const handleFetch = () => {
    console.log('Fetch clicked for:', inputRollNumber);
  };

  const subjects = subjectsData || [];
  const totalMaxMarks = subjects.reduce((sum, s) => sum + (s.maxMarks || 0), 0);
  const totalMinMarks = subjects.reduce((sum, s) => sum + (s.minMarks || 0), 0);
  const totalSecuredMarks = subjects.reduce((sum, s) => sum + Number(s.secured || 0), 0);

  return (
   <Box sx={{maxwidth:"1000px", mx:"auto", mt:10, p:5, border:"1px solid #ccc" ,color:"black", backgroundColor:"white", boxShadow: 3  }}className = "page-break"> 
        <Typography variant="h6" gutterBottom></Typography>
   
      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
           <Typography variant="h6" sx={{ mb: 3 }}> {title}
              </Typography>
        <TextField
          label="Student ID"
          value={inputRollNumber}
          onChange={(e) => setInputRollNumber(e.target.value)}
        />
        <TextField
          label="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <TextField
          label="Year of Study"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <TextField
          label="Academic Year"
          value={academicyear}
          onChange={(e) => setAcademicYear(e.target.value)}
        />
        <Button variant="outlined" onClick={handleFetch}>
          Fetch
        </Button>
      </Box>

      <Typography><strong>Name:</strong> {name}</Typography>
      <Typography><strong>{idLabel}:</strong> {idValue}</Typography>
      <Typography><strong>Date of Birth:</strong> {dob}</Typography>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#dddddd' }}>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Sl. No.</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Maximum Marks</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Minimum Marks</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Marks Secured</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.map((subject, index) => (
              <TableRow key={index}>
                <TableCell align="center">{subject.SlNo || index + 1}</TableCell>
                <TableCell>{subject.name}</TableCell>
                <TableCell align="right">{subject.maxMarks}</TableCell>
                <TableCell align="right">{subject.minMarks}</TableCell>
                <TableCell align="right">{subject.secured}</TableCell>
                <TableCell align="center">{subject.result}</TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ backgroundColor: '#eeeeee' }}>
              <TableCell colSpan={2}><strong>Grand Total</strong></TableCell>
              <TableCell align="right"><strong>{totalMaxMarks}</strong></TableCell>
              <TableCell align="right"><strong>{totalMinMarks}</strong></TableCell>
              <TableCell align="right"><strong>{totalSecuredMarks}</strong></TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FormComponent2;
