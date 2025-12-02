import React from "react";
import { Box, Typography } from "@mui/material";
import securedParkingImage from "../../../Assets/electric.png"; // Path to your image

const SecuredParking = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem",
        backgroundColor: "#121212", // Dark background
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          flex: 1,
          height: "400px",
          minWidth: "300px",
          backgroundImage: `url(${securedParkingImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "8px",
          marginRight: { xs: 0, md: "2rem" }, // Responsive margin
          marginBottom: { xs: "2rem", md: 0 },
        }}
      ></Box>

      {/* Text Section */}
      <Box
        sx={{
          flex: 1,
          minWidth: "300px",
          maxWidth: "600px",
          padding: "1rem",
          color: "#fff",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="700"
          sx={{
            lineHeight: 1.1,
            marginBottom: "0.5rem",
            color: "#ccc", // Gold color for premium feel
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Drive Electric?
        </Typography>

        <Typography
          variant="h4"
          fontWeight="800"
          sx={{
            lineHeight: 1.2,
            color: "#d4af37",
            marginBottom: "1rem",
          }}
        >
          We've Got You Covered!
        </Typography>

        <Typography
          variant="h6"
          fontWeight="400"
          sx={{
            color: "#e3dfd6",
            fontFamily: "Roboto, sans-serif",
            lineHeight: 1.7,
            fontSize: "1.2rem",
          }}
        >
          Seamlessly charge your electric vehicle while you park with our
          convenient EV recharging service. Our parking app now features access
          to dedicated charging stations at select locations, making it easier
          than ever to power up your car while you go about your day.
        </Typography>
      </Box>
    </Box>
  );
};

export default SecuredParking;
