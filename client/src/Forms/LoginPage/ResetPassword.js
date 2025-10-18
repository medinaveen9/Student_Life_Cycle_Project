import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import axiosInstance from "../../components/AxiosInstance";
import { useNavigate } from "react-router-dom";
import "../../styles/RegistrationForm.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = new URLSearchParams(window.location.search).get("token");

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setSeverity("error");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post("/api/user/reset-password", {
        token,
        newPassword,
      });

      setMessage(res.data.message || "Password reset successfully!");
      setSeverity("success");

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
      setSeverity("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "100px auto",
        p: 3,
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" mb={2}>
        Reset Password
      </Typography>

      <TextField required
        fullWidth
        type="password"
        label="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField required
        fullWidth
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        sx={{ mb: 2 }}
      />

      {message && (
        <Alert severity={severity} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <Button variant="contained" fullWidth onClick={handleSubmit} disabled={loading}
        sx={{ backgroundColor: "#4b1d77", color: "white", textTransform: "initial", fontSize: "18px", "&.Mui-disabled": { backgroundColor: "#ccc", color: "#666", cursor: "not-allowed" } }}>
        Reset Password
      </Button>
      <Typography onClick = {() => navigate("/login")} 
                      className = "forgot-link">Back to Login</Typography>
    </Box>
  );
};

export default ResetPassword;
