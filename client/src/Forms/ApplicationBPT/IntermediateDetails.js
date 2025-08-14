
import React, { useState } from 'react';
import {
  TextField, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box, Typography, Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const IntermediateDetails = ({ formData, setFormData }) => {
  const [subjectsData, setSubjectsData] = useState([
    { subject: 'Botany', t1: '', t1Max: '', t2: '', t2Max: '', practical: '', practicalMax: '', total: '', totalMax: '' },
    { subject: 'Zoology', t1: '', t1Max: '', t2: '', t2Max: '', practical: '', practicalMax: '', total: '', totalMax: '' },
    { subject: 'Physics', t1: '', t1Max: '', t2: '', t2Max: '', practical: '', practicalMax: '', total: '', totalMax: '' },
    { subject: 'Chemistry', t1: '', t1Max: '', t2: '', t2Max: '', practical: '', practicalMax: '', total: '', totalMax: '' },
    { subject: 'English', t1: '', t1Max: '', t2: '', t2Max: '', practical: '', practicalMax: '', total: '', totalMax: '' },
    { subject: 'Second Language', t1: '', t1Max: '', t2: '', t2Max: '', practical: '', practicalMax: '', total: '', totalMax: '' }
  ]);

  const [totalMarks, setTotalMarks] = useState({ obtained: '', max: '' });
  const [totalPercentage, setTotalPercentage] = useState('');
  const [groupMarks, setGroupMarks] = useState({ obtained: '', max: '' });
  const [groupPercentage, setGroupPercentage] = useState('');

  const handleChange = (index, field, value) => {
    const updated = [...subjectsData];
    updated[index][field] = value;
    setSubjectsData(updated);
  };

  const navigate = useNavigate();

  const handleNext = () => {
       console.log('intermediate:', formData);
    const intermediateData = {
      subjectsData,
      totalMarks,
      totalPercentage,
      groupMarks,
      groupPercentage
    };

    // Merge with parent formData
    setFormData(prev => ({
      ...prev,
      intermediateDetails: intermediateData
    }));

    navigate('/course');
   
  };

  return (
    <Box sx={{ maxWidth: "1000px", mx: "auto", mt: 10, p: 5, border: "1px solid #ccc", color: "black", backgroundColor: "white", boxShadow: 3 }} className="page-break">
      <Typography variant="h6" gutterBottom>Intermediate Marks Entry</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#dddddd' }}>
              <TableCell>Subject</TableCell>
              <TableCell>1st Yr Theory</TableCell>
              <TableCell>Max</TableCell>
              <TableCell>2nd Yr Theory</TableCell>
              <TableCell>Max</TableCell>
              <TableCell>Practical</TableCell>
              <TableCell>Max</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Max</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjectsData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.subject}</TableCell>
                <TableCell><TextField size="small" value={row.t1} onChange={(e) => handleChange(index, 't1', e.target.value)} /></TableCell>
                <TableCell><TextField size="small" value={row.t1Max} onChange={(e) => handleChange(index, 't1Max', e.target.value)} /></TableCell>
                <TableCell><TextField size="small" value={row.t2} onChange={(e) => handleChange(index, 't2', e.target.value)} /></TableCell>
                <TableCell><TextField size="small" value={row.t2Max} onChange={(e) => handleChange(index, 't2Max', e.target.value)} /></TableCell>
                <TableCell><TextField size="small" value={row.practical} onChange={(e) => handleChange(index, 'practical', e.target.value)} /></TableCell>
                <TableCell><TextField size="small" value={row.practicalMax} onChange={(e) => handleChange(index, 'practicalMax', e.target.value)} /></TableCell>
                <TableCell><TextField size="small" value={row.total} onChange={(e) => handleChange(index, 'total', e.target.value)} /></TableCell>
                <TableCell><TextField size="small" value={row.totalMax} onChange={(e) => handleChange(index, 'totalMax', e.target.value)} /></TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={7} sx={{ fontWeight: 'bold' }}>Total Marks obtained in Intermediate/Equivalent Examination</TableCell>
              <TableCell><TextField size="small" value={totalMarks.obtained} onChange={(e) => setTotalMarks({ ...totalMarks, obtained: e.target.value })} /></TableCell>
              <TableCell><TextField size="small" value={totalMarks.max} onChange={(e) => setTotalMarks({ ...totalMarks, max: e.target.value })} /></TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={7} sx={{ fontWeight: 'bold' }}>Total Percentage</TableCell>
              <TableCell colSpan={2}><TextField size="small" value={totalPercentage} onChange={(e) => setTotalPercentage(e.target.value)} InputProps={{ endAdornment: <span>%</span> }} /></TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={7} sx={{ fontWeight: 'bold' }}>Total Marks obtained in Group</TableCell>
              <TableCell><TextField size="small" value={groupMarks.obtained} onChange={(e) => setGroupMarks({ ...groupMarks, obtained: e.target.value })} /></TableCell>
              <TableCell><TextField size="small" value={groupMarks.max} onChange={(e) => setGroupMarks({ ...groupMarks, max: e.target.value })} /></TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={7} sx={{ fontWeight: 'bold' }}>Total Percentage in Group</TableCell>
              <TableCell colSpan={2}><TextField size="small" value={groupPercentage} onChange={(e) => setGroupPercentage(e.target.value)} InputProps={{ endAdornment: <span>%</span> }} /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3, textAlign: 'right' }}>
        <Button variant="contained" onClick={handleNext}>Next</Button>
      </Box>
    </Box>
  );
};

export default IntermediateDetails;
