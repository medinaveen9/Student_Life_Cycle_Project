import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

const CourseSelection = () => {
  const navigate = useNavigate(); 

  const [courseSubjects, setCourseSubjects] = useState([
    {
      course_name: '',
      course_code: '',
      year: '',
      semester: '',
      subject_code: '',
      subject_name: '',
      paper_code: '',
      exam_code: '',
      max_marks: ''
    }
  ]);

  const [studentRecords, setStudentRecords] = useState([
    {
      applicant_code: '',
      course_code: '',
      year: '',
      semester: '',
      exam_code: '',
      subject_code: '',
      paper_code: '',
      marks_obtained: ''
    }
  ]);

  const [eapcetData, setEapcetData] = useState({
    registrationNumber: '',
    hallTicketNumber: '',
    rank: ''
  });

  const handleSubjectChange = (index, field, value) => {
    const updated = [...courseSubjects];
    updated[index][field] = value;
    setCourseSubjects(updated);
  };

  const addSubjectRow = () => {
    setCourseSubjects([...courseSubjects, {
      course_name: '', course_code: '', year: '', semester: '',
      subject_code: '', subject_name: '', paper_code: '',
      exam_code: '', max_marks: ''
    }]);
  };

  const handleRecordChange = (index, field, value) => {
    const updated = [...studentRecords];
    updated[index][field] = value;
    setStudentRecords(updated);
  };

  const addRecordRow = () => {
    setStudentRecords([...studentRecords, {
      applicant_code: '', course_code: '', year: '', semester: '',
      exam_code: '', subject_code: '', paper_code: '', marks_obtained: ''
    }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
   
      courseSubjects,
      studentRecords
    };

    console.log('Complete Course Data:', formData);
    navigate('/academicrecord'); 
    
  };

  return (
    <Box sx={{maxWidth: "1000px", mx:"auto", mt:10, p:5, border:"1px solid #ccc",color:"black", backgroundColor:"white", boxShadow: 3 }} className="page-break">
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          TG EAPCET Details
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, my: 3 }}>
          <TextField label="TG EAPCET Registration Number" value={eapcetData.registrationNumber}
            onChange={(e) => setEapcetData({ ...eapcetData, registrationNumber: e.target.value })}
            size="small" fullWidth />
          <TextField label="TG EAPCET Hall Ticket Number" value={eapcetData.hallTicketNumber}
            onChange={(e) => setEapcetData({ ...eapcetData, hallTicketNumber: e.target.value })}
            size="small" fullWidth />
          <TextField label="TG EAPCET Rank" value={eapcetData.rank}
            onChange={(e) => setEapcetData({ ...eapcetData, rank: e.target.value })}
            size="small" fullWidth />
        </Box>

        <Typography variant="h6" gutterBottom>E.1 - Course Subject Master Details</Typography>
        {courseSubjects.map((subject, index) => (
          <Box key={index} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3, border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
            <TextField label="Course Name" value={subject.course_name} onChange={(e) => handleSubjectChange(index, 'course_name', e.target.value)} size="small" />
            <TextField label="Course Code" value={subject.course_code} onChange={(e) => handleSubjectChange(index, 'course_code', e.target.value)} size="small" />
            <TextField label="Year" type="number" value={subject.year} onChange={(e) => handleSubjectChange(index, 'year', e.target.value)} size="small" />
            <TextField label="Semester (I/II)" value={subject.semester} onChange={(e) => handleSubjectChange(index, 'semester', e.target.value)} size="small" />
            <TextField label="Subject Code" value={subject.subject_code} onChange={(e) => handleSubjectChange(index, 'subject_code', e.target.value)} size="small" />
            <TextField label="Subject Name" value={subject.subject_name} onChange={(e) => handleSubjectChange(index, 'subject_name', e.target.value)} size="small" />
            <TextField label="Paper Code (Theory/Practical)" value={subject.paper_code} onChange={(e) => handleSubjectChange(index, 'paper_code', e.target.value)} size="small" />
            <TextField label="Exam Code (Mid/End)" value={subject.exam_code} onChange={(e) => handleSubjectChange(index, 'exam_code', e.target.value)} size="small" />
            <TextField label="Max Marks" type="number" value={subject.max_marks} onChange={(e) => handleSubjectChange(index, 'max_marks', e.target.value)} size="small" />
          </Box>
        ))}
        <Button variant="outlined" onClick={addSubjectRow} sx={{ mb: 4 }}>
          + Add Subject
        </Button>

        <Typography variant="h6" gutterBottom>E.2 - Student Academic Records</Typography>
        {studentRecords.map((record, index) => (
          <Box key={index} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3, border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
            <TextField label="Applicant Code" value={record.applicant_code} onChange={(e) => handleRecordChange(index, 'applicant_code', e.target.value)} size="small" />
            <TextField label="Course Code" value={record.course_code} onChange={(e) => handleRecordChange(index, 'course_code', e.target.value)} size="small" />
            <TextField label="Year" type="number" value={record.year} onChange={(e) => handleRecordChange(index, 'year', e.target.value)} size="small" />
            <TextField label="Semester" value={record.semester} onChange={(e) => handleRecordChange(index, 'semester', e.target.value)} size="small" />
            <TextField label="Exam Code" value={record.exam_code} onChange={(e) => handleRecordChange(index, 'exam_code', e.target.value)} size="small" />
            <TextField label="Subject Code" value={record.subject_code} onChange={(e) => handleRecordChange(index, 'subject_code', e.target.value)} size="small" />
            <TextField label="Paper Code" value={record.paper_code} onChange={(e) => handleRecordChange(index, 'paper_code', e.target.value)} size="small" />
            <TextField label="Marks Obtained" type="number" value={record.marks_obtained} onChange={(e) => handleRecordChange(index, 'marks_obtained', e.target.value)} size="small" />
          </Box>
        ))}
        <Button variant="outlined" onClick={addRecordRow} sx={{ mb: 4 }}>
          + Add Record
        </Button>
        <Box sx={{ textAlign: 'right' }}>
          <Button type="submit" variant="contained">
            Submit & Next
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CourseSelection ;

