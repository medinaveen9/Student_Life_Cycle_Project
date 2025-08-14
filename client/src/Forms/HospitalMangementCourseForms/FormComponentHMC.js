import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Paper, Typography, Box, TextField, Button
} from '@mui/material';

const FormComponentHMC = ({ title, studentInfo = {}, subjectsData = [] }) => {
  const { name, soName, date } = studentInfo;
  const formattedDate = date ? new Date(date).toLocaleDateString() : '';

  const [rollNumber, setRollNumber] = useState('');
  const [course, setCourse] = useState('');
 
  const [year, setYear] = useState('');
  const [academicyear, setAcademicYear] = useState('');

  const handleFetch = () => {
    console.log('Fetching data for:', rollNumber);
 
  };

  return (
 <Box sx={{maxwidth:"1000px", mx:"auto", mt:10, p:5, border:"1px solid #ccc" ,color:"black", backgroundColor:"white", boxShadow: 3  }}className = "page-break"> 
      <Typography variant="h6" gutterBottom></Typography>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Student ID"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
        <TextField
          label="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          fullWidth
        />
     
        <TextField
          label="Year of Study"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          fullWidth
        />
        <TextField
          label="Academic Year"
          value={academicyear}
          onChange={(e) => setAcademicYear(e.target.value)}
          fullWidth
        />
        <Button variant="outlined" onClick={handleFetch}>Fetch</Button>
      </Box>

      <Box mt={3}>
        <Typography><strong>Roll Number:</strong> {rollNumber || ''}</Typography>
        <Typography><strong>Name:</strong> {name || ''}</Typography>
        <Typography><strong>S/o or D/o:</strong> {soName || ''}</Typography>
        <Typography><strong>Date:</strong> {formattedDate}</Typography>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 3, overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#dddddd' }}>
              <TableCell rowSpan={2} sx={{ fontWeight: 'bold' }}>Paper</TableCell>
              <TableCell rowSpan={2} sx={{ fontWeight: 'bold' }} align="center">Subject</TableCell>
              <TableCell colSpan={2} align="center" sx={{ fontWeight: 'bold' }}>Theory</TableCell>
              <TableCell colSpan={2} align="center" sx={{ fontWeight: 'bold' }}>Internal</TableCell>
              <TableCell colSpan={2} align="center" sx={{ fontWeight: 'bold' }}>Total</TableCell>
              <TableCell rowSpan={2} sx={{ fontWeight: 'bold' }}>Result</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#dddddd' }}>
              <TableCell>Max Marks</TableCell>
              <TableCell>Secured</TableCell>
              <TableCell>Max Marks</TableCell>
              <TableCell>Secured</TableCell>
              <TableCell>Max Marks</TableCell>
              <TableCell>Secured</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjectsData.length > 0 ? (
              subjectsData.map((subject, index) => (
                <TableRow key={subject.id || index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell sx={{ wordBreak: 'break-word' }}>{subject.subject || '-'}</TableCell>
                  <TableCell>{subject.theoryMax || 0}</TableCell>
                  <TableCell>{subject.theorySecured || 0}</TableCell>
                  <TableCell>{subject.internalMax || 0}</TableCell>
                  <TableCell>{subject.internalSecured || 0}</TableCell>
                  <TableCell>{subject.totalMax || 0}</TableCell>
                  <TableCell>{subject.totalSecured || 0}</TableCell>
                  <TableCell>{subject.result || '-'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">No subjects data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FormComponentHMC;
