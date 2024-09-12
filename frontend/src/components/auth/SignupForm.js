import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

const SignupForm = ({ handleGoogleSignIn, setTab }) => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    mobileNo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    mobileNo: "",
    password: "",
  });

  // Handle input changes for Signup form
  const handleSignupChange = (event) => {
    const { name, value } = event.target;
    setSignupData({ ...signupData, [name]: value });
  };

  // Validate Signup form
  const validateSignupForm = () => {
    // Validate Full Name
    const fullName = signupData.fullName.trim().split(" ");
    if (fullName.length < 2) {
      setFormErrors((prev) => ({
        ...prev,
        fullName: "Full Name should contain both first and last names.",
      }));
      return false;
    }

    // Validate Mobile Number
    if (!/^\d{10}$/.test(signupData.mobileNo)) {
      setFormErrors((prev) => ({
        ...prev,
        mobileNo: "Mobile No. must be exactly 10 digits.",
      }));
      return false;
    }

    // Validate Passwords
    if (signupData.password !== signupData.confirmPassword) {
      setFormErrors((prev) => ({
        ...prev,
        password: "Confirm Password does not match the Password.",
      }));
      return false;
    }

    return true;
  };

  // Handle Signup form submission
  const handleSignup = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    if (validateSignupForm()) {
      setLoading(true); // Set loading to true when login starts
      try {
        const response = await axiosInstance.post("auth/register", signupData);
        toast.success(
          `Welcome, ${response.data.data.fullName}! Your account has been created successfully.`
        );
        setTab(0);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false); // Set loading to false when login is complete
      }
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Signup
      </Typography>

      <form onSubmit={handleSignup}>
        <TextField
          fullWidth
          margin="normal"
          label="Full Name"
          required
          variant="outlined"
          name="fullName"
          error={!!formErrors.fullName}
          helperText={formErrors.fullName}
          value={signupData.fullName}
          onChange={handleSignupChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Mobile No."
          variant="outlined"
          name="mobileNo"
          type="number"
          error={!!formErrors.mobileNo}
          helperText={formErrors.mobileNo}
          required
          value={signupData.mobileNo}
          onChange={handleSignupChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          required
          value={signupData.email}
          onChange={handleSignupChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          variant="outlined"
          type="password"
          required
          name="password"
          value={signupData.password}
          onChange={handleSignupChange}
          inputProps={{ minLength: 6 }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          variant="outlined"
          type="password"
          required
          name="confirmPassword"
          error={!!formErrors.password}
          value={signupData.confirmPassword}
          onChange={handleSignupChange}
          helperText={formErrors.password}
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
          {loading ? "Signing up..." : "Signup"}
        </Button>
      </form>
      <Button
        variant="outlined"
        fullWidth
        sx={{ mt: 2, mb: 2 }}
        startIcon={<GoogleIcon />}
        onClick={handleGoogleSignIn}
      >
        Sign in with Google
      </Button>
    </Box>
  );
};

export default SignupForm;
