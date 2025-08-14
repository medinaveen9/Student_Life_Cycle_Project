import React, { useEffect, useState } from 'react';
import { Box,Typography,Table,TableBody,TableCell,TableContainer,TableHead,  TableRow, Paper,TextField,Button,} from '@mui/material';
import { toWords } from 'number-to-words';

const FormComponentMPT2 = ({ rollNumber, name, sod, examDate, subjectsData, specialty }) => {
  const [inputRollNumber, setInputRollNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [academicyear, setAcademicYear] = useState('');
  const [grandTotal, setGrandTotal] = useState(0);
  const [totalInWords, setTotalInWords] = useState('');

  const handleFetch = () => {
    console.log('Fetching data for roll number:', inputRollNumber);
  };

  useEffect(() => {
    const total = subjectsData.reduce(
      (acc, subj) => acc + (isNaN(Number(subj.totalSecured)) ? 0 : Number(subj.totalSecured)),
      0
    );
    setGrandTotal(total);
    setTotalInWords(toWords(total));
  }, [subjectsData]);

  return (
   <Box sx={{maxwidth:"1000px", mx:"auto", mt:10, p:5, border:"1px solid #ccc" ,color:"black", backgroundColor:"white", boxShadow: 3  }}className = "page-break"> 
        <Typography variant="h6" gutterBottom></Typography>
  
      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
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
        <Button variant="outlined" onClick={handleFetch}>Fetch</Button>
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Master of Physiotherapy Second Year
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography><strong>Roll No:</strong> {rollNumber}</Typography>
        <Typography>
          <strong>MASTER OF PHYSIOTHERAPY</strong><br />
          2nd Year Final Examination held in {examDate}
        </Typography>
        <Typography><strong>Specialty:</strong> {specialty}</Typography>
        <Typography><strong>Name:</strong> {name}</Typography>
        <Typography><strong>D/o or S/o:</strong> {sod}</Typography>
      </Box>

      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table size="large">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#dddddd' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Paper No.</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center" colSpan={3}>Theory</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center" colSpan={3}>Practical / Viva</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Total Marks Secured</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Result</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#dddddd' }}>
              <TableCell />
              <TableCell />
              <TableCell align="center">Max</TableCell>
              <TableCell align="center">Min.</TableCell>
              <TableCell align="center">Sec.</TableCell>
              <TableCell align="center">Max</TableCell>
              <TableCell align="center">Min.</TableCell>
              <TableCell align="center">Sec.</TableCell>
              <TableCell align="center">(Theory + Practical/Viva)</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {subjectsData.map((subj, index) => (
              <TableRow key={index}>
                <TableCell>{subj.paperNo}</TableCell>
                <TableCell sx={{ wordBreak: 'break-word' }}>{subj.subject}</TableCell>
                <TableCell align="center">{subj.theoryMax}</TableCell>
                <TableCell align="center">{subj.theoryMin}</TableCell>
                <TableCell align="center">{subj.theorySecured}</TableCell>
                <TableCell align="center">{subj.practicalMax}</TableCell>
                <TableCell align="center">{subj.practicalMin}</TableCell>
                <TableCell align="center">
                  {subj.practicalMax === 'NA' ? 'NA' : subj.practicalSecured}
                </TableCell>
                <TableCell align="center">{subj.totalSecured}</TableCell>
                <TableCell>{subj.result}</TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ '& > *': { fontWeight: 'bold' } }}>
              <TableCell colSpan={8} align="right">Total</TableCell>
              <TableCell align="center">{grandTotal}</TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ mt: 1 }}>
        <Typography>
          <strong>Aggregate marks (in words):</strong> {totalInWords}
        </Typography>
        <Typography><strong>Result:</strong> PASS</Typography>
      </Box>
    </Box>
  );
};

export default FormComponentMPT2;
