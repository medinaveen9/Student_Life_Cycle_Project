import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, InputAdornment, IconButton, Typography, MenuItem } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../../styles/RegistrationForm.css";

const LoginForm = ({selectedRole, setSelectedRole}) => {
  const [formData, setFormData] = useState({ userId: '', password: '', role: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); 
  

  const handleChange = (e) => {
    const name = e.target.name;
    if (name === 'role') {
      setSelectedRole(e.target.value);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.userId.trim()) return setError('User ID required');
    if (!formData.password.trim()) return setError('Password required');
    if (!formData.role) return setError('Please select a role');

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/login",
        formData,
        { withCredentials: true }
      );
      console.log("Login success response:", res.data);
      alert("Login successful");
      if(selectedRole === "Maker") {
        navigate("/selectcertificate");
      } else if(selectedRole === "Checker") {
        navigate("/checker");
      } else if(selectedRole === "Approver") {
        navigate("/approver");
      }
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
      const res = await axios.get("http://localhost:4000/api/login/verify", { withCredentials: true });
      console.log("Logged-in user:", res.data.user);
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
          <TextField
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={formData.password}
            onChange={handleChange}
            required
            InputProps={inputProps}
          />
          <TextField select label="Role" name="role" fullWidth value={formData.role} onChange={handleChange} required>
            <MenuItem value="Maker">Maker</MenuItem>
            <MenuItem value="Checker">Checker</MenuItem>
            <MenuItem value="Approver">Approver</MenuItem>
          </TextField>

          <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: "#4b1d77", color: "white", textTransform: "initial", fontSize: "18px" }}>
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
