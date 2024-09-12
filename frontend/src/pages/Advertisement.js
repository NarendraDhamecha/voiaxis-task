import { useState } from "react";
import AdvertisementForm from "../components/advertisement/AdvertisementForm";
import UserAdvertisements from "../components/advertisement/UserAdvertisements";
import { Box } from "@mui/material";

const Advertisement = () => {
  const [isFetch, setIsFetch] = useState(true);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // Flex column for mobile, row for larger screens
        gap: 2,
        padding: 2,
      }}
    >
      <Box
        sx={{
          flexBasis: { xs: "100%", sm: "40%" }, // Full width for mobile, 40% for larger screens
          mb: { xs: 2, sm: 0 }, // Margin bottom for mobile
        }}
      >
        <AdvertisementForm setIsFetch={setIsFetch} />
      </Box>
      <Box
        sx={{
          flexBasis: { xs: "100%", sm: "60%" }, // Full width for mobile, 60% for larger screens
          maxHeight: "65vh",
          overflowY: "auto",
          padding: 1,
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <UserAdvertisements isFetch={isFetch} setIsFetch={setIsFetch} />
      </Box>
    </Box>
  );
};

export default Advertisement;
