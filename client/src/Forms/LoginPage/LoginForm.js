import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, InputAdornment, IconButton, Typography, MenuItem, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../../styles/RegistrationForm.css";
import axiosInstance from '../../components/AxiosInstance';

const LoginForm = ({ setUser}) => {

  const [formData, setFormData] = useState({ userId: '', password: '', role: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Handle input changes
  const handleChange = (e) => {
    const name = e.target.name;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.userId.trim()) return setError('User ID required');
    if (!formData.password.trim()) return setError('Password required');

    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/user/login", formData, { withCredentials: true } );
      setUser(res.data.user);
      const resRole = res?.data?.user?.role;
      navigate("/");  // Redirect to welcome page after login
    } catch (err) {
      console.error("Login failed:", err.response?.data || err);
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Verify cookie on component mount
  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    try {
      const res = await axiosInstance.get("/api/login/verify", { withCredentials: true });
      setUser(res.data.user);
    } catch (err) {
      console.log("User not logged in or cookie invalid");
      setUser(null);
    }
  };

  const inputProps = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <VisibilityOff sx={{ color: 'gray' }} /> : <Visibility sx={{ color: 'gray' }} />}
        </IconButton>
      </InputAdornment>
    )
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", paddingTop: "80px" }}>
      <Box className="registration-container">
        <Typography sx={{ textAlign: "center", fontSize: "24px", fontWeight: "600" }}>
          User Login
        </Typography>

        {error && <Typography color="error" className="registration-error">{error}</Typography>}
        {/* {user && <Typography color="primary" sx={{ marginBottom: 2 }}>Logged in as: {user.userId} ({user.role})</Typography>} */}

        <form onSubmit={handleSubmit} className="form_container">
          <TextField label="User ID" name="userId" fullWidth value={formData.userId} onChange={handleChange} required />
          <TextField label="Password" name="password" type={showPassword ? 'text' : 'password'}
            fullWidth value={formData.password} onChange={handleChange}
            required
            InputProps={inputProps}
          />
          <Button disabled={loading} type="submit" variant="contained" fullWidth
            sx={{ backgroundColor: "#4b1d77", color: "white", textTransform: "initial", fontSize: "18px", "&.Mui-disabled": { backgroundColor: "#ccc", color: "#666", cursor: "not-allowed" } }}>
            Login
          </Button>
          <Typography onClick = {() => navigate("/forgot-password")} 
            className = "forgot-link">Forgot Password?</Typography>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
 