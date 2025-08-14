import React from "react";
import {Box, Typography, Divider,Card,CardContent,  Table, TableBody,  TableCell,TableContainer,TableRow,Paper,  List,
  ListItem,ListItemText,Grid,} from "@mui/material";

const Uploads = () => {
  const address = {
    addressLine: "HNO 7-29/1A, Gandhi Nagar Colony, Amangal Village and Mandal",
    country: "India",
    state: "Telangana",
    district: "Rangareddy",
    pin: "509321",
    phone: "",
    mobile: "9346490142",
    email: "vaishnavimokthala65@gmail.com"
  };

  const payment = {
    type: "Online Payment",
    reference: "136189873101",
    date: "09-Jun-2025",
    bank: "",
    branch: "",
    amount: "2500",
    remarks: "Online Payment"
  };

  const documents = [
    "CASTE CERTIFICATE",
    "10th Class Marks Memo",
    "INTERMEDIATE MARKS MEMO",
    "6TH to 10TH Study and Conduct Certificate",
    "INTER STUDY AND CONDUCT CERTIFICATE",
    "TRANSFER OR MIGRATION CERTIFICATE of Intermediate",
    "TELANGANA STATE EAPCET-2025 RANK CARD"
  ];

  return (
   <Box sx={{ maxWidth: "1000px", mx: "auto", mt: 10, p: 5, border: "1px solid #ccc", color: "black", backgroundColor: "white", boxShadow: 3 }} className="page-break">
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Address, Payment & Declaration
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {/* Address Section */}
          
           <Typography variant="subtitle1" sx={{ fontWeight: "bold",fontSize: "1.4rem", mb: 2 }}>
                     Correspondence Address
                    </Typography>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableBody>
                <Row label="Address" value={address.addressLine} />
                <Row label="Country" value={address.country} />
                <Row label="State" value={address.state} />
                <Row label="District" value={address.district} />
                <Row label="Pin Code" value={address.pin} />
                <Row label="Mobile No" value={address.mobile} />
                <Row label="Email ID" value={address.email} />
              </TableBody>
            </Table>
          </TableContainer>

           <Typography variant="subtitle1" sx={{ fontWeight: "bold",fontSize: "1.4rem", mb: 2 }}>
                   Payment Details
                    </Typography>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableBody>
                <Row label="Payment Type" value={payment.type} />
                <Row label="Transaction ID" value={payment.reference} />
                <Row label="Date" value={payment.date} />
                <Row label="Amount (₹)" value={`₹${payment.amount}`} />
                <Row label="Remarks" value={payment.remarks} />
              </TableBody>
            </Table>
          </TableContainer>

     
           <Typography variant="subtitle1" sx={{ fontWeight: "bold",fontSize: "1.4rem", mb: 2 }}>
                    Uploaded Documents
                    </Typography>
          <List dense sx={{ pl: 2 }}>
            {documents.map((doc, idx) => (
              <ListItem key={idx} disablePadding>
                <ListItemText primary={`${idx + 1}. ${doc}`} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 3 }} />

      
          <Typography variant="subtitle1" sx={{ fontWeight: "bold",fontSize: "1.4rem", mb: 2 }}>
                   Declaration
                    </Typography>
          <Typography paragraph>
            I declare that the particulars given above are correct. I agree to abide by the admission prospectus issued by the Institute.
            I also declare that in the event the information provided is incorrect or false, I may be prosecuted as per law.
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">Signature</Typography>
              <Box sx={{ borderBottom: '1px solid #000', height: 30 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">Date</Typography>
              <Box sx={{ borderBottom: '1px solid #000', height: 30 }} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const Row = ({ label, value }) => (
  <TableRow>
    <TableCell sx={{ fontWeight: 600, width: '35%' }}>{label}</TableCell>
    <TableCell>{value}</TableCell>
  </TableRow>
);

export default Uploads;
