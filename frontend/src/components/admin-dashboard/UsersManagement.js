import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import axiosInstance from "../../config/axiosInstance";
import { assignRole, ROLES } from "../../utils/_helpers";
import { toast } from "react-toastify";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const usersResponse = await axiosInstance.get("/user/getAll");
      const usersWithRoles = usersResponse.data.data.map((user) => ({
        ...user,
        role: assignRole(user.email),
      }));
      setUsers(usersWithRoles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (user, newRole) => {
    try {
      //Update email domain with new role
      const splitEmail = user.email.split("@");
      const emailWithUpdatedRole = `${splitEmail[0]}${newRole.domain}`;

      //Update permissions based on new role
      const permissionsWithUpdatedRole = newRole.permissions;

      //Payload for update the role of user
      const payload = {
        email: emailWithUpdatedRole,
        permissions: permissionsWithUpdatedRole,
      };
      await axiosInstance.patch(`/user/${user._id}`, payload);
      toast.success("Role updated successfully");
      fetchUsers();
    } catch (error) {
      toast.success(error.response.data.message);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      {users.length > 0 ? (
        users.map((user) => (
          <Card key={user._id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">{user.fullName}</Typography>
              <Typography variant="body2">Email: {user.email}</Typography>
              <Typography variant="body2">Role: {user.role}</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 1,
                }}
              >
                {/* Render role buttons dynamically */}
                {ROLES.map((role) => {
                  // Skip rendering the button if it's the user's current role
                  if (role.role === user.role) return null;
                  return (
                    <Button
                      key={role.id}
                      variant="contained"
                      color={role.color}
                      size="small"
                      sx={{ marginLeft: 1 }}
                      onClick={() => changeRole(user, role)}
                    >
                      Make {role.role}
                    </Button>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No users found.</Typography>
      )}
    </Box>
  );
};

export default UsersManagement;
