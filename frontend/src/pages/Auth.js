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
import { getUser } from "../utils/_helpers";

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
      console.log(role)
      if (role === "User") {
        navigate("/user/create-advertisement");
      } else {
        navigate("/user/admin/dashboard");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
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
          {tab === 0 && <LoginForm handleGoogleSignIn={handleGoogleSignIn} />}
          {tab === 1 && (
            <SignupForm
              handleGoogleSignIn={{ handleGoogleSignIn }}
              setTab={setTab}
            />
          )}
        </Stack>
      </Box>
    </Container>
  );
};

export default Auth;
