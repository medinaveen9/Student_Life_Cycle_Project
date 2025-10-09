import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axiosInstance from "./AxiosInstance";
import { useNavigate } from "react-router-dom";

const ChangePassword = ({ user }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    try {
      const response = await axiosInstance.post("/api/change-password", {
        userId: user.userId,
        oldPassword,
        newPassword,
      });
      if (response.status === 200) {
        setSuccess("Password changed successfully!");
        setError("");
        setTimeout(() => navigate("/"), 2000); // redirect after 2 sec
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error changing password");
      setSuccess("");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "100px auto", p: 3, boxShadow: 2, borderRadius: 2 }}>
      <Typography variant="h6" mb={2}>Change Password</Typography>
      <TextField
        fullWidth
        type="password"
        label="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        type="password"
        label="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      {error && <Typography color="error" sx={{ mb: 1 }}>{error}</Typography>}
      {success && <Typography color="success.main" sx={{ mb: 1 }}>{success}</Typography>}
      <Button variant="contained" fullWidth onClick={handleSubmit}>Change Password</Button>
    </Box>
  );
};

export default ChangePassword;
