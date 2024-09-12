import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import axiosInstance from "../../config/axiosInstance";

// Component to display a list of advertisements posted by the user
const UserAdvertisements = ({ isFetch, setIsFetch }) => {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await axiosInstance.get("/advertisement/user");
        setAdvertisements(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
        setLoading(false);
      }
    };
    if (isFetch) {
      fetchAdvertisements();
      setIsFetch(false);
    }
  }, [isFetch]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box padding={2}>
      {advertisements.length > 0 ? (
        <Stack spacing={2}>
          {advertisements.map((ad) => (
            <Card key={ad._id}>
              <CardContent>
                <Typography variant="h5">{ad.title}</Typography>
                <img
                  src={ad.imageUrl}
                  alt="..."
                  style={{
                    width: "100%",
                    height: "auto",
                    marginBottom: "10px",
                  }}
                />
                <Typography variant="body2">{ad.description}</Typography>

                {/* Display review and status info */}
                <Typography variant="body2" color="textSecondary">
                  {ad.isReviewed ? "Reviewed" : "Not Reviewed"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: {ad.status}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <Typography>No advertisements found.</Typography>
      )}
    </Box>
  );
};

export default UserAdvertisements;
