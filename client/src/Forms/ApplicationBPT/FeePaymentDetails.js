import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {Typography,TextField, Box,Button} from '@mui/material';

const FeePaymentDetails = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({
    applicationNumber:'',
    paymentType: '',
    transactionId: '',
    date: '',
    bankName: '',
    branchDetails: '',
    amount: '',
    remarks: ''
  });

  const handlePaymentChange = (field, value) => {
    setPaymentData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = () => {
    navigate('/personalinfo');

  };
  return (
 <Box sx={{maxWidth: "1000px", mx:"auto", mt:10, p:5, border:"1px solid #ccc",color:"black", backgroundColor:"white", boxShadow: 3 }} className="page-break">
      <Typography variant="h6" gutterBottom>Payment Details</Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
      <TextField
          label="Application Number"
          value={paymentData.applicationNumber}
          onChange={(e) => handlePaymentChange('applicationNumber', e.target.value)}
          size="small"
        />
        <TextField
          label="Payment Type"
          value={paymentData.paymentType}
          onChange={(e) => handlePaymentChange('paymentType', e.target.value)}
          size="small"
        />
        <TextField
          label="Transaction ID"
          value={paymentData.transactionId}
          onChange={(e) => handlePaymentChange('transactionId', e.target.value)}
          size="small"
        />
        <TextField
          label="Date"
          type="date"
          value={paymentData.date}
          onChange={(e) => handlePaymentChange('date', e.target.value)}
          InputLabelProps={{ shrink: true }}
          size="small"
        />
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
        <TextField
          label="Name of Bank"
          value={paymentData.bankName}
          onChange={(e) => handlePaymentChange('bankName', e.target.value)}
          size="small"
        />
        <TextField
          label="Branch Details"
          value={paymentData.branchDetails}
          onChange={(e) => handlePaymentChange('branchDetails', e.target.value)}
          size="small"
        />
        <TextField
          label="Amount (Rs.)"
          value={paymentData.amount}
          onChange={(e) => handlePaymentChange('amount', e.target.value)}
          size="small"
        />
      </Box>

      <TextField
        label="Remarks, If Any"
        value={paymentData.remarks}
        onChange={(e) => handlePaymentChange('remarks', e.target.value)}
        size="small"
        fullWidth
        sx={{ mb: 3 }}
      />
            <Box sx={{ textAlign: 'right' }}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default  FeePaymentDetails ;
