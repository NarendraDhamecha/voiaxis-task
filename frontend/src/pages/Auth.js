import React, { useState } from "react";
import { Container, Box, Tabs, Tab, Stack } from "@mui/material";
import axiosInstance from "../config/axiosInstance";
import LoginForm from "../components/auth/LoginForm";
import {
  auth,
  googleProvider,
  signInWithPopup,
} from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/auth/SignupForm";
import { getUser, ROLE_IDENTIFIERS } from "../utils/_helpers";
import { toast } from "react-toastify";

const Auth = () => {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  // Handle tab switch between Login and Signup
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken(); // Get Firebase ID Token

      //Send token to server for verification
      const response = await axiosInstance.post("auth/google", {
        idToken,
      });
      localStorage.setItem("token", response.data.token);
      const { role } = getUser(response.data.token);
      console.log(role);
      if (role === "User") {
        navigate("/user/create-advertisement");
      } else {
        navigate("/user/admin/dashboard");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  // Handle Login form submission
  const handleLogin = async (event, loginData) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("auth/login", loginData);
      localStorage.setItem("token", response.data.token);
      const { role } = getUser(response.data.token);
      if (role === ROLE_IDENTIFIERS.USER.ROLE_NAME) {
        navigate("/user/create-advertisement");
      } else {
        navigate("/user/admin/dashboard");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>

        <Stack spacing={2} sx={{ mt: 3 }}>
          {tab === 0 && (
            <LoginForm
              handleGoogleSignIn={handleGoogleSignIn}
              handleLogin={handleLogin}
            />
          )}
          {tab === 1 && (
            <SignupForm
              handleGoogleSignIn={{ handleGoogleSignIn }}
              handleLogin={handleLogin}
            />
          )}
        </Stack>
      </Box>
    </Container>
  );
};

export default Auth;
