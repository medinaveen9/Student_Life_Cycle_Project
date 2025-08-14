import React, {  useState } from 'react';
import {  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button 
} from '@mui/material';
import { toWords } from 'number-to-words';

const FormComponentBPT = ({
  title,
  subjectsData,
  name = '',
  soName = '',
  idLabel = '',
  examDate = '',
  submissionDate = '2025-06-24',
}) => {
  const [subjects, setSubjects] = useState(subjectsData || []);
  const [grandTotal, setGrandTotal] = useState(0);
  const [totalInWords, setTotalInWords] = useState('');

  const [department,setDepartment]=useState('');
  const [semester, setSemester]=useState('');
  const [subjectid,setSubjectid]=useState('')
const [year,setYear]=useState('');

  const handleFetch = () => { 
    console.log('Fetching data for:', );
  
  };

  return (
   <Box sx={{maxwidth:"1000px", mx:"auto", mt:10, p:5, border:"1px solid #ccc" ,color:"black", backgroundColor:"white", boxShadow: 3  }}className = "page-break"> 
        <Typography variant="h6" gutterBottom></Typography>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField 
          label="Student Id"
          value={subjectid} 
          onChange={(e) => setSubjectid(e.target.value)} 
          fullWidth
        />
      
        <TextField 
          label="Department" 
          value={department} 
          onChange={(e) => setDepartment(e.target.value)} 
          fullWidth 
        />
        <TextField 
          label="Semester" 
          value={semester} 
          onChange={(e) => setSemester(e.target.value)} 
          fullWidth 
        />
        <TextField 
          label="Year Of Study" 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
          fullWidth 
        />
        <Button variant="outlined" onClick={handleFetch}>Fetch</Button>
      </Box>
      <Typography><strong>{idLabel}:</strong> {subjectid}</Typography>
      <Typography><strong>Name:</strong> {name}</Typography>
      <Typography><strong>S/o or D/o:</strong> {soName}</Typography>
      <Typography><strong>Month & Year of Exam:</strong> {examDate}</Typography>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#dddddd' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
              <TableCell align="center" colSpan={3} sx={{ fontWeight: 'bold' }}>Theory</TableCell>
              <TableCell align="center" colSpan={3} sx={{ fontWeight: 'bold' }}>Practical / Viva</TableCell>
              <TableCell align="center" colSpan={3} sx={{ fontWeight: 'bold' }}>Total</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Result</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#dddddd' }}>
              <TableCell />
              <TableCell>Max</TableCell>
              <TableCell>Min</TableCell>
              <TableCell>Sec</TableCell>
              <TableCell>Max</TableCell>
              <TableCell>Min</TableCell>
              <TableCell>Sec</TableCell>
              <TableCell>Max</TableCell>
              <TableCell>Min</TableCell>
              <TableCell>Sec</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.map((subj, index) => {
              const totalSecured = subj.practicalMax === 'NA'
                ? Number(subj.theorySecured || 0)
                : Number(subj.theorySecured || 0) + Number(subj.practicalSecured || 0);

              return (
                <TableRow key={index}>
                  <TableCell sx={{ wordBreak: 'break-word' }}>{subj.name}</TableCell>
                  <TableCell>{subj.theoryMax}</TableCell>
                  <TableCell>{subj.theoryMin}</TableCell>
                  <TableCell>{subj.theorySecured || 0}</TableCell>
                  <TableCell>{subj.practicalMax}</TableCell>
                  <TableCell>{subj.practicalMin}</TableCell>
                  <TableCell>{subj.practicalMax === 'NA' ? 'NA' : subj.practicalSecured || 0}</TableCell>
                  <TableCell>{subj.totalMax}</TableCell>
                  <TableCell>{subj.totalMin}</TableCell>
                  <TableCell>{totalSecured}</TableCell>
                  <TableCell>{subj.result || '-'}</TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell colSpan={9} align="right"><strong>Grand Total:</strong></TableCell>
              <TableCell><strong>{grandTotal}</strong></TableCell>
              <TableCell><strong>T.M</strong></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3 }}>
        <Typography><strong>Aggregate marks (in words):</strong> {totalInWords.toUpperCase()}</Typography>
      </Box>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Typography><strong>Dated:</strong> {submissionDate}</Typography>
      </Box>
    </Box>
  );
};

export default FormComponentBPT;
