import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axiosInstance";

const AdvertisementDetails = ({
  open,
  handleCloseModal,
  selectedAd,
  fetchAdvertisements,
}) => {
  const handleApprove = async () => {
    try {
      const response = await axiosInstance.patch(
        `/advertisement/${selectedAd._id}`,
        { status: "Approved" }
      );
      toast.success("Advertisement approved");
      fetchAdvertisements();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleReject = async () => {
    try {
      const response = await axiosInstance.patch(
        `/advertisement/${selectedAd._id}`,
        { status: "Rejected" }
      );
      toast.success("Advertisement rejectedu");
      fetchAdvertisements();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const updateAdvertisement = async () => {
      if (selectedAd.isReviewed) return;
      try {
        const response = await axiosInstance.patch(
          `/advertisement/${selectedAd._id}`,
          { isReviewed: true }
        );
        toast.success("Advertisement reviewed");
        fetchAdvertisements();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    updateAdvertisement();
  }, []);

  return (
    <Dialog open={open} onClose={handleCloseModal} maxWidth="md" fullWidth>
      <DialogTitle>View Advertisement</DialogTitle>
      <DialogContent>
        {selectedAd && (
          <>
            <Typography variant="h6">{selectedAd.title}</Typography>
            <img
              src={selectedAd.imageUrl}
              alt={selectedAd.title}
              style={{
                width: "100%",
                height: "auto",
                marginBottom: 10,
              }}
            />
            <DialogContentText>{selectedAd.description}</DialogContentText>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleApprove} color="primary">
          Approve
        </Button>
        <Button onClick={handleReject} color="error">
          Reject
        </Button>
        <Button onClick={handleCloseModal}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdvertisementDetails;
