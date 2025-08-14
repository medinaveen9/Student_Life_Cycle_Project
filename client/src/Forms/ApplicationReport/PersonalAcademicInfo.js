import React from "react";
import {Card, CardContent, Box,Typography, Divider,Table,TableBody,TableCell,TableContainer,TableRow,Paper,} from "@mui/material";

const PersonalAcademicInfo = () => {
  const data = {
    applicationNo: "10003202500015",
    courseCode: "10003",
    courseName: "Bachelor of Physiotherapy",
    applicantName: "Ms. VAISHNAVI MOKTHALA",
    fatherName: "ANJAIAH MOKTHALA",
    age: "20 Years / 0 Months / 2 Days",
    dob: "29-Dec-2005",
    placeOfBirth: "AMANGAL",
    socialStatus: "BC-D",
    nationality: "Indian",
    maritalStatus: "Unmarried",
    gender: "Female",
    differentlyAbled: "No",
    idMark1: "A MOLE ON THE LEFT CHEEK",
    idMark2: "A MOLE ON THE LEFT HAND",
    localArea: "Local",
    inService: "No",
    aadhar: "225135167216",
    email: "vaishnavimokthala65@gmai",
    fatherOccupation: "BUSINESS",
    fatherIncome: "25000",
    motherName: "ARUNA MOKTHALA",
    motherOccupation: "HOUSE WIFE",
    motherIncome: "0",
    fatherAge: "45",
    motherAge: "40",
  };

  return (
   <Box sx={{ maxWidth: "1000px", mx: "auto", mt: 10, p: 5, border: "1px solid #ccc", color: "black", backgroundColor: "white", boxShadow: 3 }} className="page-break">

      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            APPLICATION FORM
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom>
            Bachelor of Physiotherapy - 2025
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Typography variant="subtitle1" sx={{ fontWeight: "bold",fontSize: "1.4rem", mb: 2 }}>
            Applicant Details
          </Typography>

          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableBody>
                <Row label="Application No" value={data.applicationNo} />
                <Row label="Course" value={`${data.courseCode} - ${data.courseName}`} />
                <Row label="Applicant Name" value={data.applicantName} />
                <Row label="Father's Name" value={data.fatherName} />
                <Row label="Age (As on last date)" value={data.age} />
                <Row label="Date of Birth" value={data.dob} />
                <Row label="Place of Birth" value={data.placeOfBirth} />
                <Row label="Social Status" value={data.socialStatus} />
                <Row label="Nationality" value={data.nationality} />
                <Row label="Marital Status" value={data.maritalStatus} />
                <Row label="Gender" value={data.gender} />
                <Row label="Differently Abled" value={data.differentlyAbled} />
                <Row label="Identification Mark 1" value={data.idMark1} />
                <Row label="Identification Mark 2" value={data.idMark2} />
                <Row label="University Area" value={data.localArea} />
                <Row label="In-service (Govt.)" value={data.inService} />
                <Row label="Aadhar No" value={data.aadhar} />
                <Row label="Father's Email" value={data.email} />
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="subtitle1" sx={{ fontWeight: "bold",fontSize: "1.4rem", mb: 2 }}>
            Detail of Parents / Spouse
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <Row label="Father's Name" value={data.fatherName} />
                <Row label="Father's Age" value={`${data.fatherAge} Years`} />
                <Row label="Father's Occupation" value={data.fatherOccupation} />
                <Row label="Father's Income" value={`₹${data.fatherIncome}`} />
                <Row label="Mother's Name" value={data.motherName} />
                <Row label="Mother's Age" value={`${data.motherAge} Years`} />
                <Row label="Mother's Occupation" value={data.motherOccupation} />
                <Row label="Mother's Income" value={`₹${data.motherIncome}`} />
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

const Row = ({ label, value }) => (
  <TableRow>
    <TableCell sx={{ fontWeight: 600, width: "40%" }}>{label}</TableCell>
    <TableCell>{value}</TableCell>
  </TableRow>
);

export default PersonalAcademicInfo;
