import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,TextField,Button} from '@mui/material';

const FormComponent4 = ({ title,subjectsData, name,soName,idLabel,rollNumber,semester, course,department,year,sgpa ,setSemester,  setRollNumber,  setCourse,setDepartment,setYear // ✅ Add this
}) => {

  return (
    <Box sx={{maxwidth:"1000px", mx:"auto", mt:10, p:5, border:"1px solid #ccc" ,color:"black", backgroundColor:"white", boxShadow: 3  }}className = "page-break"> 
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label={idLabel || "Student ID"} value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />
        <TextField label="Course" value={course} onChange={(e) => setCourse(e.target.value)} fullWidth />
        <TextField label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} fullWidth />
        <TextField label="Semester" value={semester} onChange={(e) => setSemester(e.target.value)} fullWidth />
        <TextField label="Year Of Study" value={year} onChange={(e) => setYear(e.target.value)} fullWidth />
        <Button variant="outlined">Fetch</Button>
      </Box>
    <Box mt={3}>
   
        <Typography><strong>Name:</strong> {name || '-'}</Typography>
        <Typography><strong>S/o or D/o:</strong> {soName || '-'}</Typography>
     
      </Box>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '	#dddddd' }}>
              <TableCell sx={{ fontWeight: 'bold'}} >S.No.</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}    >Subject Code & Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}  >Credits (C)</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}  >Max. Marks (I.A / S.E)</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}  >Marks Secured (I.A / S.E)</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}  >Total Marks %</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}  >Grade Secured</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}  >Grade Point (G)</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}} >Credit Points (C×G)</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}  >Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjectsData.map((subject, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
            <TableCell sx={{ wordBreak: 'break-word' }}> {subject.title }
            </TableCell>
                <TableCell>{subject.credits}</TableCell>
                <TableCell>{`${subject.maxIA} / ${subject.maxSE}`}</TableCell>
                <TableCell>{`${subject.marksIA} / ${subject.marksSE}`}</TableCell>
                <TableCell>{subject.percentage}</TableCell>
                <TableCell>{subject.grade}</TableCell>
                <TableCell>{subject.gradepoint}</TableCell>
                <TableCell>{subject.creditpoints}</TableCell>
                <TableCell>{subject.result}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={9} align="right"><strong>Semester Grade Point Average (SGPA):</strong></TableCell>
              <TableCell><strong>{sgpa}</strong></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FormComponent4;
