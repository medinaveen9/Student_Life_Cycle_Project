import React, { useState } from 'react';
import {Box, Typography,  Table,TableHead,TableRow,TableCell, TableBody,Paper,TableContainer,TextField,Button} from '@mui/material';

const FormComponentAnesthesia = ({
  title,
  studentInfo,
  subjectsData,
  idLabel = 'Student ID',
}) => {
  const [rollNumber, setRollNumber] = useState(studentInfo?.rollNumber || '');
  const [name, setName] = useState(studentInfo?.name || '');
  const [soName, setSoName] = useState(studentInfo?.soName || '');
  const [date, setDate] = useState(studentInfo?.date || '');
  const [course, setCourse] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [year, setYear] = useState('');
  const  [academicyear, setAcademicYear]=useState('')

  const formattedDate = date ? new Date(date).toLocaleDateString() : '-';

  const totalMaxMarks = subjectsData.reduce((sum, subject) => sum + (subject.maxMarks || 0), 0);
  const totalMinMarks = subjectsData.reduce((sum, subject) => sum + (subject.minMarks || 0), 0);
  const totalSecuredMarks = subjectsData.reduce((sum, subject) => sum + (subject.marksSecured || 0), 0);

  const overallResult = subjectsData.every(subject =>
    (subject.marksSecured || 0) >= (subject.minMarks || 0)
  ) ? 'Pass' : 'Fail';

  const handleFetch = () => {
  
    console.log({ rollNumber, course, department, semester, year });
  };

  return (
  <Box sx={{maxwidth:"1000px", mx:"auto", mt:10, p:5, border:"1px solid #ccc" ,color:"black", backgroundColor:"white", boxShadow: 3  }}className = "page-break"> 
       <Typography variant="h6" gutterBottom></Typography>
      <Typography variant="h5" gutterBottom>{title}</Typography>

      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label={idLabel}
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
          label="Year of study"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          fullWidth
        />  <TextField
        label="AcademicYear"
        value={academicyear}
        onChange={(e) => setAcademicYear(e.target.value)}
        fullWidth
      />
        <Button variant="outlined" onClick={handleFetch}>Fetch</Button>
      </Box>

      <Box mt={3} mb={4}>
        <Typography><strong>Roll Number:</strong> {rollNumber || ''}</Typography>
        <Typography><strong>Name:</strong> {name || ''}</Typography>
        <Typography><strong>S/o or D/o:</strong> {soName || ''}</Typography>
        <Typography><strong>Date:</strong> {formattedDate}</Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#dddddd' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Paper</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Max Marks</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Min Marks</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Marks Secured</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjectsData.map((subject, index) => {
              const result = (subject.marksSecured || 0) >= (subject.minMarks || 0) ? 'Pass' : 'Fail';
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell sx={{ wordBreak: 'break-word' }}>{subject.subject || '-'}</TableCell>
                  <TableCell align="right">{subject.maxMarks || 0}</TableCell>
                  <TableCell align="right">{subject.minMarks || 0}</TableCell>
                  <TableCell align="right">{subject.marksSecured || 0}</TableCell>
                  <TableCell align="center">{result}</TableCell>
                </TableRow>
              );
            })}
            <TableRow sx={{ backgroundColor: '#dddddd' }}>
              <TableCell colSpan={2} align="right"><strong>Grand Total</strong></TableCell>
              <TableCell align="right"><strong>{totalMaxMarks}</strong></TableCell>
              <TableCell align="right"><strong>{totalMinMarks}</strong></TableCell>
              <TableCell align="right"><strong>{totalSecuredMarks}</strong></TableCell>
              <TableCell align="center"><strong>{overallResult}</strong></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FormComponentAnesthesia;
