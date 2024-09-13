import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";
import AdvertisementDetails from "./AdvertisementDetails";
import { checkPermission, PERMISSION } from "../../config/features";
import { useUser } from "../../context/userContext";

const AdvertisementTable = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const { user } = useUser();

  const fetchAdvertisements = async () => {
    try {
      const adsResponse = await axiosInstance.get("/advertisement/getAll");
      setAdvertisements(adsResponse.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const handleViewAdvertisement = (ad) => {
    if (!checkPermission(user.allowedPermissions, PERMISSION.REVIEW_AD)) {
      toast.error(
        "You don't have permission to review advertisement! Please contact with your admin."
      );
      return;
    }
    setSelectedAd(ad);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedAd(null);
  };

  const handleDeleteAdvertisement = async (id) => {
    if (!checkPermission(user.allowedPermissions, PERMISSION.DELETE_AD)) {
      toast.error(
        "You don't have permission to delete advertisement! Please contact with your admin."
      );
      return;
    }
    if (!id) return;
    try {
      await axiosInstance.delete(`/advertisement/${id}`);
      toast.success("Advertisement deleted successfully");
      fetchAdvertisements();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      {advertisements.length > 0 ? (
        advertisements.map((ad) => (
          <Card key={ad._id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">{ad.title}</Typography>
              <Typography variant="body2">{ad.description}</Typography>
              {/* Display review and status info */}
              <Typography variant="body2" color="textSecondary">
                {ad.isReviewed ? "Reviewed" : "Not Reviewed"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Status: {ad.status}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 1,
                }}
              >
                <IconButton
                  color="primary"
                  aria-label="view"
                  onClick={() => handleViewAdvertisement(ad)}
                >
                  <Visibility />
                </IconButton>
                <IconButton
                  color="error"
                  aria-label="delete"
                  onClick={() => handleDeleteAdvertisement(ad._id)}
                >
                  <Delete />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No advertisements found.</Typography>
      )}
      {open && (
        <AdvertisementDetails
          open={open}
          handleCloseModal={handleCloseModal}
          fetchAdvertisements={fetchAdvertisements}
          selectedAd={selectedAd}
        />
      )}
    </Box>
  );
};

export default AdvertisementTable;
