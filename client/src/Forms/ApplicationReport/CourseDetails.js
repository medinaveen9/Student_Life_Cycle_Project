import React from "react";
import {Box,  Typography, Table, TableHead, TableBody,TableRow,TableCell,  Divider,Grid, Card,
  CardContent,  Paper, TableContainer} from "@mui/material";

const  CourseDetails = () => {
  const subjectMarks = [
    { subject: "Botany", t1: 59, t1Max: 60, t2: 51, t2Max: 60, practical: 30, practicalMax: 30, total: 140, totalMax: 150 },
    { subject: "Zoology", t1: 57, t1Max: 60, t2: 54, t2Max: 60, practical: 30, practicalMax: 30, total: 141, totalMax: 150 },
    { subject: "Physics", t1: 60, t1Max: 60, t2: 47, t2Max: 60, practical: 30, practicalMax: 30, total: 137, totalMax: 150 },
    { subject: "Chemistry", t1: 60, t1Max: 60, t2: 40, t2Max: 60, practical: 30, practicalMax: 30, total: 130, totalMax: 150 },
    { subject: "English", t1: 92, t1Max: 100, t2: 92, t2Max: 100, total: 184, totalMax: 200 },
    { subject: "Second Language", t1: 98, t1Max: 100, t2: 98, t2Max: 100, total: 196, totalMax: 200 },
  ];

  const educationDetails = [
    {
      class: "Inter 2nd Year",
      year: "2023",
      college: "SR JUNIOR COLLEGE",
      place: "PEDDAMBERPET",
      district: "Rangareddy",
      state: "Telangana",
    },
    {
      class: "Inter 1st Year",
      year: "2022",
      college: "SR JUNIOR COLLEGE",
      place: "PEDDAMBERPET",
      district: "Rangareddy",
      state: "Telangana",
    },
    {
      class: "10th Class",
      year: "2021",
      college: "FORTUNE BUTTERFLY SCHOOL",
      place: "AMANGAL, KADTHAL",
      district: "Rangareddy",
      state: "Telangana",
    },
    {
      class: "9th Class",
      year: "2020",
      college: "FORTUNE BUTTERFLY SCHOOL",
      place: "AMANGAL, KADTHAL",
      district: "Rangareddy",
      state: "Telangana",
    },
    {
      class: "8th Class",
      year: "2019",
      college: "FORTUNE BUTTERFLY SCHOOL",
      place: "AMANGAL, KADTHAL",
      district: "Rangareddy",
      state: "Telangana",
    },
    {
      class: "7th Class",
      year: "2018",
      college: "FORTUNE BUTTERFLY SCHOOL",
      place: "AMANGAL, KADTHAL",
      district: "Rangareddy",
      state: "Telangana",
    },
    {
      class: "6th Class",
      year: "2017",
      college: "FORTUNE BUTTERFLY SCHOOL",
      place: "AMANGAL, KADTHAL",
      district: "Rangareddy",
      state: "Telangana",
    },
  ];

  const totals = {
    intermediateTotal: 928,
    intermediateMax: 1000,
    intermediatePercentage: "92.8%",
    groupTotal: 548,
    groupMax: 600,
    groupPercentage: "91.33%",
  };

  const eapcet = {
    regNo: "A151427674D7",
    hallTicket: "2513C03232",
    rank: 14660,
  };

  return (
 <Box sx={{ maxWidth: "1000px", mx: "auto", mt: 10, p: 5, border: "1px solid #ccc", color: "black", backgroundColor: "white", boxShadow: 3 }} className="page-break">
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Intermediate Academic Record
          </Typography>
          <Divider sx={{ mb: 2 }} />

  
           <Typography variant="subtitle1" sx={{ fontWeight: "bold",fontSize: "1.4rem", mb: 2 }}>
                            intermediate Marks
                             </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell>1st Year Marks</TableCell>
                <TableCell>1st Year Max</TableCell>
                <TableCell>2nd Year Marks</TableCell>
                <TableCell>2nd Year Max</TableCell>
                <TableCell>Practical</TableCell>
                <TableCell>Practical Max</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Total Max</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjectMarks.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.subject}</TableCell>
                  <TableCell>{row.t1}</TableCell>
                  <TableCell>{row.t1Max}</TableCell>
                  <TableCell>{row.t2}</TableCell>
                  <TableCell>{row.t2Max}</TableCell>
                  <TableCell>{row.practical ?? "-"}</TableCell>
                  <TableCell>{row.practicalMax ?? "-"}</TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell>{row.totalMax}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box mt={3}>
            <Typography><strong>Total Marks:</strong> {totals.intermediateTotal} / {totals.intermediateMax}</Typography>
            <Typography><strong>Total %:</strong> {totals.intermediatePercentage}</Typography>
            <Typography><strong>Group Marks:</strong> {totals.groupTotal} / {totals.groupMax}</Typography>
            <Typography><strong>Group %:</strong> {totals.groupPercentage}</Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Educational History (6th–Inter)
          </Typography>

          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Class</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>College</TableCell>
                  <TableCell>Place</TableCell>
                  <TableCell>District</TableCell>
                  <TableCell>State</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {educationDetails.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.class}</TableCell>
                    <TableCell>{item.year}</TableCell>
                    <TableCell>{item.college}</TableCell>
                    <TableCell>{item.place}</TableCell>
                    <TableCell>{item.district}</TableCell>
                    <TableCell>{item.state}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" sx={{ fontWeight: "bold",fontSize: "1.4rem", mb: 2 }}>
                          EAPCET Details
                          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, width: "40%" }}>Registration Number</TableCell>
                  <TableCell>{eapcet.regNo}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Hall Ticket Number</TableCell>
                  <TableCell>{eapcet.hallTicket}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Rank</TableCell>
                  <TableCell>{eapcet.rank}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseDetails;


