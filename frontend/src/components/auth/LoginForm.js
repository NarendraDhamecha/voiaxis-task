import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";

const LoginForm = ({ handleGoogleSignIn, handleLogin }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Handle input changes for Login form
  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  // Handle Login
  const handleLoginCall = async (event) => {
    setLoading(true);
    try {
      await handleLogin(event, loginData);
    } catch (error) {
      console.log("Error while log in", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>

      <form onSubmit={handleLoginCall}>
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
