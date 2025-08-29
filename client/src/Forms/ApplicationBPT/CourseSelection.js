import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'; 
import axiosInstance from '../../components/AxiosInstance';
import axios from 'axios';

const CourseSelection = () => {
  const navigate = useNavigate(); // For page navigation

  // State to store course subject details
  const [courseSubjects, setCourseSubjects] = useState([
    {
      course_name: '', course_code: '', year: '', semester: '', subject_code: '',
      subject_name: '', paper_code: '',  exam_code: '', max_marks: '' }
  ]);

  // State to store student academic records
  const [studentRecords, setStudentRecords] = useState([
    {
      applicant_code: '', course_code: '', year: '', semester: '', exam_code: '',
      subject_code: '', paper_code: '', marks_obtained: '' }
  ]);

  // State to store TG EAPCET data
  const [eapcetData, setEapcetData] = useState({
    registrationNumber: '', hallTicketNumber: '', rank: '' });

  // Update subject row data
  const handleSubjectChange = (index, field, value) => {
    const updated = [...courseSubjects];
    updated[index][field] = value;
    setCourseSubjects(updated);
  };

  // Add a new empty subject row
  const addSubjectRow = () => {
    setCourseSubjects([
      ...courseSubjects,
      {
        course_name: '', course_code: '', year: '', semester: '',
        subject_code: '', subject_name: '', paper_code: '',
        exam_code: '', max_marks: ''
      }
    ]);
  };

  // Delete a subject row (keep at least one)
  const deleteSubjectRow = (index) => {
    if (courseSubjects.length > 1) {
      const updated = courseSubjects.filter((_, i) => i !== index);
      setCourseSubjects(updated);
    }
  };

  // Update student record row data
  const handleRecordChange = (index, field, value) => {
    const updated = [...studentRecords];
    updated[index][field] = value;
    setStudentRecords(updated);
  };

  // Add a new empty student record row
  const addRecordRow = () => {
    setStudentRecords([
      ...studentRecords,
      {
        applicant_code: '', course_code: '', year: '', semester: '',
        exam_code: '', subject_code: '', paper_code: '', marks_obtained: ''
      }
    ]);
  };

  // Delete a student record row (keep at least one)
  const deleteRecordRow = (index) => {
    if (studentRecords.length > 1) {
      const updated = studentRecords.filter((_, i) => i !== index);
      setStudentRecords(updated);
    }
  };

  // Submit form data and navigate to next page
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axiosInstance.post("/api/bpt/course-selection",
          { eapcetData, courseSubjects, studentRecords });
    navigate('/academicrecord'); 
  };

  return (
    <Box sx={{maxWidth: "1000px", mx:"auto", mt:10, p:5, border:"1px solid #ccc",color:"black", backgroundColor:"white", boxShadow: 3 }} className="page-break">
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          TG EAPCET Details
        </Typography>

        {/* TG EAPCET input fields */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, my: 3 }}>
          <TextField required label="TG EAPCET Registration Number" value={eapcetData.registrationNumber}
            onChange={(e) => setEapcetData({ ...eapcetData, registrationNumber: e.target.value })}
            size="small" fullWidth />
          <TextField required label="TG EAPCET Hall Ticket Number" value={eapcetData.hallTicketNumber}
            onChange={(e) => setEapcetData({ ...eapcetData, hallTicketNumber: e.target.value })}
            size="small" fullWidth />
          <TextField required label="TG EAPCET Rank" value={eapcetData.rank}
            onChange={(e) => setEapcetData({ ...eapcetData, rank: e.target.value })}
            size="small" fullWidth />
        </Box>

        {/* Course Subject Section */}
        <Typography variant="h6" gutterBottom>E.1 - Course Subject Master Details</Typography>
        {courseSubjects.map((subject, index) => (
          <Box 
            key={index} 
            sx={{ 
              display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3, 
              border: '1px solid #ccc', borderRadius: 2, p: 2, 
              alignItems: 'center'
            }}
          >
            <TextField required label="Course Name" value={subject.course_name} onChange={(e) => handleSubjectChange(index, 'course_name', e.target.value)} size="small" />
            <TextField required label="Course Code" value={subject.course_code} onChange={(e) => handleSubjectChange(index, 'course_code', e.target.value)} size="small" />
            <TextField required label="Year" type="number" value={subject.year} onChange={(e) => handleSubjectChange(index, 'year', e.target.value)} size="small" />
            <TextField required label="Semester (I/II)" value={subject.semester} onChange={(e) => handleSubjectChange(index, 'semester', e.target.value)} size="small" />
            <TextField required label="Subject Code" value={subject.subject_code} onChange={(e) => handleSubjectChange(index, 'subject_code', e.target.value)} size="small" />
            <TextField required label="Subject Name" value={subject.subject_name} onChange={(e) => handleSubjectChange(index, 'subject_name', e.target.value)} size="small" />
            <TextField required label="Paper Code (Theory/Practical)" value={subject.paper_code} onChange={(e) => handleSubjectChange(index, 'paper_code', e.target.value)} size="small" />
            <TextField required label="Exam Code (Mid/End)" value={subject.exam_code} onChange={(e) => handleSubjectChange(index, 'exam_code', e.target.value)} size="small" />
            <TextField required label="Max Marks" type="number" value={subject.max_marks} onChange={(e) => handleSubjectChange(index, 'max_marks', e.target.value)} size="small" />
            <IconButton 
              onClick={() => deleteSubjectRow(index)}
              disabled={courseSubjects.length === 1} // Disable delete if only one row
            >
              <DeleteIcon color = "error"/>
            </IconButton>
          </Box>
        ))}
        <Button variant="outlined" onClick={addSubjectRow} sx={{ mb: 4 }}>
          + Add Subject
        </Button>

        {/* Student Academic Records Section */}
        <Typography variant="h6" gutterBottom>E.2 - Student Academic Records</Typography>
        {studentRecords.map((record, index) => (
          <Box 
            key={index} 
            sx={{ 
              display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3, 
              border: '1px solid #ccc', borderRadius: 2, p: 2, 
              alignItems: 'center'
            }}
          >
            <TextField required label="Applicant Code" value={record.applicant_code} onChange={(e) => handleRecordChange(index, 'applicant_code', e.target.value)} size="small" />
            <TextField required label="Course Code" value={record.course_code} onChange={(e) => handleRecordChange(index, 'course_code', e.target.value)} size="small" />
            <TextField required label="Year" type="number" value={record.year} onChange={(e) => handleRecordChange(index, 'year', e.target.value)} size="small" />
            <TextField required label="Semester" value={record.semester} onChange={(e) => handleRecordChange(index, 'semester', e.target.value)} size="small" />
            <TextField required label="Exam Code" value={record.exam_code} onChange={(e) => handleRecordChange(index, 'exam_code', e.target.value)} size="small" />
            <TextField required label="Subject Code" value={record.subject_code} onChange={(e) => handleRecordChange(index, 'subject_code', e.target.value)} size="small" />
            <TextField required label="Paper Code" value={record.paper_code} onChange={(e) => handleRecordChange(index, 'paper_code', e.target.value)} size="small" />
            <TextField required label="Marks Obtained" type="number" value={record.marks_obtained} onChange={(e) => handleRecordChange(index, 'marks_obtained', e.target.value)} size="small" />
            <IconButton  color="error"  onClick={() => deleteRecordRow(index)}
              disabled={studentRecords.length === 1} // Disable delete if only one row
            >
              <DeleteIcon color = "error"/>
            </IconButton>
          </Box>
        ))}
        <Button variant="outlined" onClick={addRecordRow} sx={{ mb: 4 }}>
          + Add Record
        </Button>

        {/* Submit button */}
        <Box sx={{ textAlign: 'right' }}>
          <Button type="submit" variant="contained">
            Submit & Next
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CourseSelection;
