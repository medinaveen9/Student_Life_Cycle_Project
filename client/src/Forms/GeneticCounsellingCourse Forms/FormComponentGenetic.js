import React, { useState } from 'react';
import {Box,Typography,Table,TableBody,TableCell,TableContainer, TableHead,TableRow, Paper,TextField,
   Button} from '@mui/material';
import { toWords } from 'number-to-words';

const FormComponentGenetic = ({
  rollNumber = '',
  name = '',
  sod = "",
  examDate = '',
  subjectsData = [],
  title = 'Nuclear Medicine Technology'
}) => {
  const [inputRollNumber, setInputRollNumber] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');
  const [academicyear, setAcademicYear] = useState('');

  const handleFetch = () => {
    console.log('Fetching data for roll number:', inputRollNumber);
  };

  const grandTotal = subjectsData.reduce(
    (total, subject) => total + (subject.totalSecured || 0),
    0
  );
  const totalInWords = toWords(grandTotal).replace(/,/g, ' ').toUpperCase();

  return (
  <Box sx={{maxwidth:"1000px", mx:"auto", mt:10, p:5, border:"1px solid #ccc" ,color:"black", backgroundColor:"white", boxShadow: 3  }}className = "page-break"> 
       <Typography variant="h6" gutterBottom></Typography>
 
      <Typography variant="h6" sx={{ mb: 3 }}>
        {title}
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Student ID"
          value={inputRollNumber}
          onChange={(e) => setInputRollNumber(e.target.value)}
        />
        <TextField
          label="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
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

      <Box sx={{ mb: 3 }}>
        <Typography><strong>Roll No:</strong> {rollNumber}</Typography>
     
     
        <Typography><strong>Name:</strong> {name}</Typography>
        <Typography><strong>S/o or D/O:</strong> {sod}</Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table size="medium">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#dddddd' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Paper</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
              <TableCell align="center" colSpan={2} sx={{ fontWeight: 'bold' }}>
                Theory
              </TableCell>
              <TableCell align="center" colSpan={2} sx={{ fontWeight: 'bold' }}>
                Internal Assessment
              </TableCell>
              <TableCell align="center" colSpan={2} sx={{ fontWeight: 'bold' }}>
                Grand Total
              </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#dddddd' }}>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Max Marks</TableCell>
              <TableCell>Secured</TableCell>
              <TableCell>Max Marks</TableCell>
              <TableCell>Secured</TableCell>
              <TableCell>Max Marks</TableCell>
              <TableCell>Secured</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjectsData.map((subject, index) => (
              <TableRow key={index}>
                <TableCell>{subject.paperNo}</TableCell>
                <TableCell sx={{ wordBreak: 'break-word' }}>{subject.subject}</TableCell>
                <TableCell>{subject.theoryMax}</TableCell>
                <TableCell>{subject.theorySecured || '-'}</TableCell>
                <TableCell>{subject.internalMax || 'NA'}</TableCell>
                <TableCell>{subject.internalMax ? (subject.internalSecured || '-') : 'NA'}</TableCell>
                <TableCell>{subject.totalMax}</TableCell>
                <TableCell>{subject.totalSecured || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2 }}>
        <Typography>
          <strong>Aggregate marks in words:</strong> {totalInWords}
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <strong>Result:</strong> PASS
        </Typography>
      </Box>
    </Box>
  );
};

export default FormComponentGenetic;
