import React, { useState } from "react";
import { Box, Container, Typography, Tabs, Tab } from "@mui/material";
import AdvertisementTable from "../components/admin-dashboard/AdvertisementsTable";
import UsersManagement from "../components/admin-dashboard/UsersManagement";
import { useUser } from "../context/userContext";

const AdminDashboard = () => {
  const [value, setValue] = useState(0);
  const { user } = useUser();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Tabs for Navigation */}
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="admin tabs"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Advertisements" />
        {user?.role === "Admin" && <Tab label="Users" />}
      </Tabs>

      {/* Tab Panels */}
      <Box sx={{ padding: 2 }}>
        {value === 0 && <AdvertisementTable />}
        {value === 1 && user?.role === "Admin" && <UsersManagement />}
      </Box>
    </Container>
  );
};

export default AdminDashboard;
