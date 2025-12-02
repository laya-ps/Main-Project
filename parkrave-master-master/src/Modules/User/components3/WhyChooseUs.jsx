import React from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import { DirectionsCar, Security, AccessTime } from "@mui/icons-material";

const WhyChooseUs = () => {
  return (
    <Box
      sx={{
        padding: "4rem 2rem",
        backgroundColor: "#121212", // Dark background
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        align="center"
        sx={{ marginBottom: "2rem", color: "#ccc" }} // Light green text
      >
        Why Choose Us?
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2rem",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#333", // Dark background for cards
              color: "#fff", // White text inside cards
              transition: "transform 0.3s ease", // Smooth transition for scaling
              "&:hover": {
                transform: "scale(1.05)", // Scale effect on hover
              },
            }}
          >
            <DirectionsCar
              sx={{
                fontSize: "3rem",
                color: "#d4af37", // Light green icon color
                marginBottom: "1rem",
              }}
            />
            <CardContent>
              <Typography variant="h5" fontWeight="bold" color="#fff">
                Hassle-Free Parking
              </Typography>
              <Typography variant="body2" color="#ccc">
                Reserve your spot in advance and save time by avoiding parking struggles.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2rem",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#333", // Dark background for cards
              color: "#fff", // White text inside cards
              transition: "transform 0.3s ease", // Smooth transition for scaling
              "&:hover": {
                transform: "scale(1.05)", // Scale effect on hover
              },
            }}
          >
            <Security
              sx={{
                fontSize: "3rem",
                color: "#d4af37", // Light green icon color
                marginBottom: "1rem",
              }}
            />
            <CardContent>
              <Typography variant="h5" fontWeight="bold" color="#fff">
                Secure Locations
              </Typography>
              <Typography variant="body2" color="#ccc">
                Park with confidence in highly secure, well-monitored parking zones.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2rem",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#333", // Dark background for cards
              color: "#fff", // White text inside cards
              transition: "transform 0.3s ease", // Smooth transition for scaling
              "&:hover": {
                transform: "scale(1.05)", // Scale effect on hover
              },
            }}
          >
            <AccessTime
              sx={{
                fontSize: "3rem",
                color: "#d4af37", // Light green icon color
                marginBottom: "1rem",
              }}
            />
            <CardContent>
              <Typography variant="h5" fontWeight="bold" color="#fff">
                24/7 Accessibility
              </Typography>
              <Typography variant="body2" color="#ccc">
                Access our parking services anytime, anywhere with round-the-clock availability.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WhyChooseUs;
