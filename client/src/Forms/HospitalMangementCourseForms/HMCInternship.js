import React from 'react';
import { Typography, Box, Paper, Stack } from '@mui/material';
import FormComponentInternship from '../../components/FormComponentInternship';

const HMCInternship = () => {
  const studentData = {
    personalInfo: {
      name: 'John Doe',
      fatherName: 'Mr. Richard Doe',
      rollNo: 'MHM2023012',
      completionMonthYear: 'June 2025',
      internshipFrom: '01/01/2025',
      internshipTo: '31/03/2025',
    },
    marksData: [
      { semester: 'I', subject: 'HEALTH SYSTEMS & SERVICES', maxMarks: 100, passingMarks: 50, marksAwarded: 75, attempts: 1 },
      { semester: 'I', subject: 'ACCOUNTING IN HOSPITAL MANAGEMENT', maxMarks: 100, passingMarks: 50, marksAwarded: 82, attempts: 1 },
      { semester: 'I', subject: 'PRINCIPLES OF MANAGEMENT', maxMarks: 100, passingMarks: 50, marksAwarded: 82, attempts: 1 },
      { semester: 'I', subject: 'STATISTICS FOR HOSPITAL MANAGEMENT', maxMarks: 100, passingMarks: 50, marksAwarded: 82, attempts: 1 },    
    ]
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, margin: 2 ,marginTop:'80px'}}>
      <Stack spacing={4}>
     
        <Box>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Internship & Final Completion Details
          </Typography>
          <Box display="flex" flexDirection="column" gap={1.5} sx={{ mt: 2 }}>
            <Typography><strong>Candidate Name:</strong> {studentData.personalInfo.name}</Typography>
            <Typography><strong>Father Name:</strong> {studentData.personalInfo.fatherName}</Typography>
            <Typography><strong>Roll Number:</strong> {studentData.personalInfo.rollNo}</Typography>
            <Typography><strong>Final MHM Completion:</strong> {studentData.personalInfo.completionMonthYear}</Typography>
            <Typography><strong>Internship From:</strong> {studentData.personalInfo.internshipFrom}</Typography>
            <Typography><strong>Internship To:</strong> {studentData.personalInfo.internshipTo}</Typography>
          </Box>
        </Box>

        <FormComponentInternship marksData={studentData.marksData} />
      </Stack>
    </Paper>
  );
};

export default HMCInternship;