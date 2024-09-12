import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { useTheme, useMediaQuery } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  // Hook to check screen size
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // For screens smaller than 600px

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Greeting message with responsive font size */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontSize: isMobile ? "1rem" : "1.25rem", // Smaller font size on mobile
          }}
        >
          {user ? `Hello, ${user.fullName}` : "Welcome to My App"}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: "13px" }}>
          {/* Conditionally render Avatar only for non-mobile screens */}
          {!isMobile && <Avatar alt={user?.fullName} src="/" />}

          {/* Conditionally render Button or IconButton based on screen size */}
          {isMobile ? (
            <IconButton color="inherit" onClick={logOut}>
              <LogoutIcon />
            </IconButton>
          ) : (
            <Button color="inherit" startIcon={<LogoutIcon />} onClick={logOut}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
