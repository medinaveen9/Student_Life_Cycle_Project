import React from 'react';
import { Typography,  Table, TableBody,TableCell, TableHead, TableRow,Box, Paper} from '@mui/material';

const FormComponentInternship = ({ marksData, rollNumber, name }) => {
  return (
    <Box >
      <Typography variant="h6" gutterBottom>
        <strong>Roll Number:</strong> {rollNumber}
      </Typography>
      <Typography variant="h6" gutterBottom>
        <strong>Name:</strong> {name}
      </Typography>

      <Box
        sx={{
          mt: 3,p: 2, color: 'rgb(7, 1, 14)', boxShadow: '0 2px 6px rgba(0,0,0,0.1)',   }} >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Subject-wise Marks
        </Typography>
        
        <Table component={Paper}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#dddddd' }}>
              <TableCell sx={{ fontWeight: 'bold', color: 'rgb(7, 1, 14)' }}>Semester</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'rgb(7, 1, 14)' }}>Subject</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'rgb(7, 1, 14)' }}>Max Marks</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'rgb(7, 1, 14)' }}>Passing Marks</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'rgb(7, 1, 14)' }}>Marks Awarded</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'rgb(7, 1, 14)' }}>Attempts</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {marksData.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: 'rgb(7, 1, 14)' }}>{row.semester}</TableCell>
                <TableCell sx={{ wordBreak: 'break-word', color: 'rgb(7, 1, 14)' }}>{row.subject}</TableCell>
                <TableCell sx={{ color: 'rgb(7, 1, 14)' }}>{row.maxMarks}</TableCell>
                <TableCell sx={{ color: 'rgb(7, 1, 14)' }}>{row.passingMarks}</TableCell>
                <TableCell sx={{ color: 'rgb(7, 1, 14)' }}>{row.marksAwarded}</TableCell>
                <TableCell sx={{ color: 'rgb(7, 1, 14)' }}>{row.attempts}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default FormComponentInternship;
