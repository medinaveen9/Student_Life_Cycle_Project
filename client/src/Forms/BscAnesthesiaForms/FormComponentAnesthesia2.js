import React, { useState } from 'react';
import { TextField, Button, Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography,Box} from 
'@mui/material';

const FormComponentAnesthesia2 = ({ title, studentInfo = {}, subjectsData = [] }) => {
  const { name, soName, date } = studentInfo;
  const formattedDate = date ? new Date(date).toLocaleDateString() : '';

  const [rollNumber, setRollNumber] = useState('');
  const [course, setCourse] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [year, setYear] = useState('');
  const [academicyear, setAcademicYear] = useState('');

  const idLabel = 'Student ID';

  const handleFetch = () => {
    console.log('Fetching data for:', rollNumber);
    
  };

  return (
  <Box sx={{maxwidth:"1000px", mx:"auto", mt:10, p:5, border:"1px solid #ccc" ,color:"black", backgroundColor:"white", boxShadow: 3  }}className = "page-break"> 
       <Typography variant="h6" gutterBottom></Typography>
      <Typography variant="h5" gutterBottom>{title}</Typography>

      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label={idLabel} value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />
        <TextField label="Course" value={course} onChange={(e) => setCourse(e.target.value)} fullWidth />
        <TextField label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} fullWidth />
        <TextField label="Semester" value={semester} onChange={(e) => setSemester(e.target.value)} fullWidth />
        <TextField label="Year of study" value={year} onChange={(e) => setYear(e.target.value)} fullWidth />
        <TextField label="Academic Year" value={academicyear} onChange={(e) => setAcademicYear(e.target.value)} fullWidth />
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
              <TableCell rowSpan={2} sx={{ fontWeight: 'bold' }}>Sl. No</TableCell>
              <TableCell rowSpan={2} sx={{ fontWeight: 'bold' }}>Subject</TableCell>
              <TableCell align="center" colSpan={2} sx={{ fontWeight: 'bold' }}>Internal Assessment</TableCell>
              <TableCell align="center" colSpan={2} sx={{ fontWeight: 'bold' }}>Theory</TableCell>
              <TableCell align="center" colSpan={2} sx={{ fontWeight: 'bold' }}>Practicals</TableCell>
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
                  <TableCell sx={{ wordBreak: 'break-word' }}>{subject.subject}</TableCell>
                  <TableCell>{subject.internalMax || 0}</TableCell>
                  <TableCell>{subject.internalSecured || 0}</TableCell>
                  <TableCell>{subject.theoryMax || 0}</TableCell>
                  <TableCell>{subject.theorySecured || 0}</TableCell>
                  <TableCell>{subject.practicalMax || 0}</TableCell>
                  <TableCell>{subject.practicalSecured || 0}</TableCell>
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

export default FormComponentAnesthesia2;
