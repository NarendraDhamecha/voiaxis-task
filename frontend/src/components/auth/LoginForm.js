import React, { useState } from "react";
import { TextField, Button, Typography, Box, CircularProgress } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import axiosInstance from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/_helpers";
import { toast } from "react-toastify";

const LoginForm = ({ handleGoogleSignIn }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes for Login form
  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  // Handle Login form submission
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when login starts
    try {
      const response = await axiosInstance.post("auth/login", loginData);
      localStorage.setItem("token", response.data.token);
      const { role } = getUser(response.data.token);
      if (role === "User") {
        navigate("/user/create-advertisement");
      } else {
        navigate("/user/admin/dashboard");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false); // Set loading to false when login is complete
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>

      <form onSubmit={handleLogin}>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          value={loginData.email}
          required
          onChange={handleLoginChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          required
          value={loginData.password}
          onChange={handleLoginChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : undefined
          }
        >
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>
      <Button
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        startIcon={<GoogleIcon />}
        onClick={handleGoogleSignIn}
      >
        Sign in with Google
      </Button>
    </Box>
  );
};

export default LoginForm;
