import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import axiosInstance from "../../components/AxiosInstance";
import { useNavigate } from "react-router-dom";
import "../../styles/RegistrationForm.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success"); // success | error
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!email || !userId) {
            setMessage("Please enter required fields.");
            setSeverity("error");
            return;
        }
        try {
            setLoading(true);
            await axiosInstance.post("/api/user/forgot-password", { email, userId });
            setMessage("Password reset link sent to your email!");
            setSeverity("success");

            // Redirect to login after 3 seconds
            setTimeout(() => navigate("/login"), 3000);
        } catch (err) {
            setMessage(err.response?.data?.message || "Error occurred");
            setSeverity("error");
        } finally {
            setLoading(false);
        }
    };

    // Auto-hide message after 3 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <Box sx={{ maxWidth: 400, margin: "100px auto", p: 3, boxShadow: 2, borderRadius: 2, }}>
            <Typography variant="h6" mb={2}>Forgot Password </Typography>

            <TextField fullWidth type="text" label="User ID" value={userId}  required
                onChange={(e) => setUserId(e.target.value)} sx={{ mb: 2 }}/>

            <TextField fullWidth type="email" label="Email" value={email}  required
                onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }}/>

            {message && (
                <Alert severity={severity} sx={{ mb: 2 }}>{message} </Alert>
            )}

            <Button variant="contained" fullWidth disabled={loading} onClick={handleSubmit} 
                sx={{ backgroundColor: "#4b1d77", color: "white", textTransform: "initial", fontSize: "18px", "&.Mui-disabled": { backgroundColor: "#ccc", color: "#666", cursor: "not-allowed" } }}
            >
                Send Reset Link
            </Button>
            <Typography onClick = {() => navigate("/login")} 
                className = "forgot-link">Back to Login</Typography>
        </Box>
    );
};

export default ForgotPassword;
