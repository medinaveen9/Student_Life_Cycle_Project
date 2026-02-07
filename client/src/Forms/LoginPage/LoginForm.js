import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, InputAdornment, IconButton, Typography, MenuItem, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../../styles/RegistrationForm.css";
import axiosInstance from '../../components/AxiosInstance';

const LoginForm = ({ setUser, setSidebarOpen}) => {

  const [formData, setFormData] = useState({ userId: '', password: '', conformPassword : "",  role: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConformPassword, setShowConformPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  
  // Handle input changes
  const handleChange = (e) => {
    const name = e.target.name;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { userId, password, conformPassword } = formData;

    // Basic validations
    if (!userId.trim()) return setError("User ID required");
    if (!password.trim()) return setError("Password required");

    // If register page → validate confirm password
    if (!isLogin && password !== conformPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {
      let endpoint = isLogin ? "/api/user/login" : "/api/user/register";

      const res = await axiosInstance.post(endpoint, formData, {
        withCredentials: true,
      });

      if (!isLogin) {
        // Registration success → redirect to login
        setFormData({ userId: '', password: '', conformPassword : "",  role: '' });
        setError("success");
        return;
      }

      // Login success
      setUser(res.data.user);
      setSidebarOpen(true);
      navigate("/");
    } catch (err) {
      console.error("Auth Error:", err.response?.data?.message || err);
      setError(err.response?.data?.message || "Something went wrong");
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

  const conformInputProps = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => setShowConformPassword(!showConformPassword)}>
          {showConformPassword ? <VisibilityOff sx={{ color: 'gray' }} /> : <Visibility sx={{ color: 'gray' }} />}
        </IconButton>
      </InputAdornment>
    )
  };

  // Move to Login and Registration forms vice versa
  const handleLoginRegister = () => {
    setIsLogin(!isLogin);
    setShowPassword(false);
    setShowConformPassword(false);
    setFormData({ userId: '', password: '', conformPassword : "",  role: '' });
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", paddingTop: "80px" }}>
      <Box className="registration-container">
        <Typography sx={{ textAlign: "center", fontSize: "24px", fontWeight: "600" }}>
          {isLogin ? "Login" :  "Sign up"}
        </Typography>

        {error && error === "success" ? (
            <Typography color="primary" className="registration-error registration-success">Registration successful! Please login.</Typography>
        ) :
           (<Typography color="error" className="registration-error">{error}</Typography>

           )}

        { isLogin ? (
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
            <Typography onClick = {handleLoginRegister}  sx ={{ cursor: 'pointer', marginTop: '10px', textAlign: 'center' }} 
              >No account? <span style = {{cursor: 'pointer', color : 'blue'}}>{" " + "Sign up"}</span></Typography>
          </form>
          ) : (
            <form onSubmit={handleSubmit} className="form_container">
            <TextField label="User ID" name="userId" fullWidth value={formData.userId} onChange={handleChange} required />
            <TextField label="Password" name="password" type={showPassword ? 'text' : 'password'}
              fullWidth value={formData.password} onChange={handleChange}
              required
              InputProps={inputProps}
            />
            <TextField label="Conform Password" name="conformPassword" type={showConformPassword ? 'text' : 'password'}
              fullWidth value={formData.conformPassword} onChange={handleChange}
              required
              InputProps={conformInputProps}
            />
            <Button disabled={loading} type="submit" variant="contained" fullWidth
              sx={{ backgroundColor: "#4b1d77", color: "white", textTransform: "initial", fontSize: "18px", "&.Mui-disabled": { backgroundColor: "#ccc", color: "#666", cursor: "not-allowed" } }}>
              Sign up
            </Button>
            <Typography onClick = {handleLoginRegister}  sx ={{ cursor: 'pointer', marginTop: '10px', textAlign: 'center' }} 
              >Already have an account? <span style = {{cursor: 'pointer', color : 'blue'}}>{" " + "Login"}</span></Typography>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default LoginForm;
 