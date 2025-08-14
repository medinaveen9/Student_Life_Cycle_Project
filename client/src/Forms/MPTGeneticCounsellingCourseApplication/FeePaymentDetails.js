import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";  

const FeePaymentDetails = ({ courseName = "Genetic Counselling" }) => {
  const [paymentData, setPaymentData] = useState({
    application_number: "",
    amount: "",
  });

  const [upiLink, setUpiLink] = useState("");
  const navigate = useNavigate();  

  const handleChange = (field, value) => {
    setPaymentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateUpiQr = () => {
    const upiId = "yourupiid@bank";
    const { application_number, amount } = paymentData;

    const upiString = `upi://pay?pa=${upiId}&pn=NIMSUniversity&am=${amount}&cu=INR&tn=AppFee-${application_number}`;
    setUpiLink(upiString);
  };

  const handlePay = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          application_number: paymentData.application_number,
          amount: paymentData.amount,
        }),
      });

      const data = await res.json();

      if (data.success) {
        const options = {
          key: "rzp_test_xxxxxxxxx", 
          amount: data.amount,
          currency: data.currency,
          name: "NIMS Institute",
          description: "Application Fee",
          order_id: data.orderId,
          handler: function (response) {
            alert("✅ Payment Success! Payment ID: " + response.razorpay_payment_id);
       
            navigate("/gcpersonalinfo", { state: { courseName } });
          },
          prefill: {
            name: "Student",
            email: "student@email.com",
            contact: "9876543210",
          },
          theme: { color: "#3399cc" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (err) {
      console.error("❌ Payment error:", err);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 10, p: 3, border: "1px solid #ccc" }}>
      <Typography variant="h6">Application Fee Payment</Typography>

      <TextField
        label="Application Number"
        fullWidth
        margin="normal"
        value={paymentData.application_number}
        onChange={(e) => handleChange("application_number", e.target.value)}
        type="number"
      />

      <TextField
        label="Amount (Rs.)"
        type="number"
        fullWidth
        margin="normal"
        value={paymentData.amount}
        onChange={(e) => handleChange("amount", e.target.value)}
      />

      <Button variant="contained" sx={{ mt: 2 }} onClick={generateUpiQr}>
        Generate QR Code
      </Button>

      {upiLink && (
        <Box sx={{ textAlign: "center", my: 3 }}>
          <Typography variant="subtitle1">Scan to Pay</Typography>
          <QRCodeCanvas value={upiLink} size={200} includeMargin={true} />

        </Box>
      )}
    </Box>
  );
};

export default FeePaymentDetails;
