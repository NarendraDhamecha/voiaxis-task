import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import axiosInstance from "../../config/axiosInstance";
import axios from "axios";
import { toast } from "react-toastify";

const AdvertisementForm = ({ setIsFetch }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      let imageUrl = null;

      if (formData.image) {
        const formDataImage = new FormData();
        formDataImage.append("image", formData.image);
        formDataImage.append("key", process.env.REACT_APP_IMGBB_API_KEY);

        const responseImage = await axios.post(
          "https://api.imgbb.com/1/upload",
          formDataImage,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imageUrl = responseImage.data.data.url; // Get the image URL from Imgbb response
      }

      await axiosInstance.post("/advertisement/create", {
        title: formData.title,
        description: formData.description,
        imageUrl, // Send the image URL to the server
      });

      // reset the form and refetch the advertisement list
      setFormData({
        title: "",
        image: null,
        description: "",
      });
      setIsFetch(true);
      toast.success("Advertisement submited successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Post an Advertisement
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <TextField
          fullWidth
          label="Title"
          name="title"
          variant="outlined"
          required
          value={formData.title}
          onChange={handleInputChange}
          sx={{ marginBottom: "20px" }}
        />

        {/* Description Input */}
        <TextField
          fullWidth
          label="Description"
          name="description"
          variant="outlined"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          sx={{ marginBottom: "20px" }}
        />

        {/* Image Upload */}
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUpload />}
          fullWidth
          sx={{ marginBottom: formData.image ? "unset" : "20px" }}
        >
          Upload Image
          <input type="file" hidden onChange={handleImageChange} />
        </Button>
        {formData.image && (
          <Typography variant="body2" sx={{ marginBottom: "20px" }}>
            {formData.image.name}
          </Typography>
        )}

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : undefined
          }
        >
          {loading ? "Submitting..." : "Submit Advertisement"}
        </Button>
      </form>
    </Box>
  );
};

export default AdvertisementForm;
