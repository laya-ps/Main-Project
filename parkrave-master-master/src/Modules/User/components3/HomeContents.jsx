import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import p2 from '../../../Assets/area.png'

const HomeContent = () => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", padding: "4rem 2rem", backgroundColor: "#121212" }}>
      {/* Left Section */}
      <Box sx={{ flex: 1, paddingRight: "2rem" }}>
        <Typography
          variant="h3"
          fontWeight="700"

          sx={{
            marginBottom: "1rem",
            color: "#ccc",
            fontFamily:"'Trebuchet MS', sans-serif",
          }}
        >
         Parking at Your Fingertips!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: "2rem",
            lineHeight: 1.7,
            color: "#ccc",
          }}
        >
          Experience the most advanced parking management system that makes your parking hassle-free. With thousands of parking areas and satisfied customers, we ensure convenience at your fingertips.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ borderTop: "3px solid #fff", paddingTop: "1rem" }}>
              <Typography variant="subtitle1" fontWeight="bold" color="#d4af37">
                TOTAL AREAS
              </Typography>
              <Typography variant="body2" color="#ccc">
                Manage and navigate through hundreds of parking lots across multiple cities.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ borderTop: "3px solid #fff", paddingTop: "1rem" }}>
              <Typography variant="subtitle1" fontWeight="bold" color="#d4af37">
                TOTAL CUSTOMERS
              </Typography>
              <Typography variant="body2" color="#ccc">
                Thousands of happy customers trust our service daily to simplify their journeys.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ borderTop: "3px solid #fff", paddingTop: "1rem" }}>
              <Typography variant="subtitle1" fontWeight="bold" color="#d4af37">
                SUSTAINABILITY
              </Typography>
              <Typography variant="body2" color="#ccc">
                Our technology ensures efficient parking solutions, reducing congestion and emissions.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          background: `url(${p2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          borderRadius: "8px",
        }}
      >
        {/* Statistics Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: "-2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Card sx={{ backgroundColor: "#f2ecde", padding: "1rem", textAlign: "center" }}>
            <Typography variant="h4" color="#c18f25" fontWeight="bold">
              500+
            </Typography>
            <Typography variant="body2" color="#c18f25">
              Parking Areas
            </Typography>
          </Card>
          <Card sx={{ backgroundColor: "#f2ecde", padding: "1rem", textAlign: "center" }}>
            <Typography variant="h4" color="#c18f25" fontWeight="bold">
              50K+
            </Typography>
            <Typography variant="body2" color="#c18f25">
              Happy Customers
            </Typography>
          </Card>
          <Card sx={{ backgroundColor: "#f2ecde", padding: "1rem", textAlign: "center" }}>
            <Typography variant="h4" color="#c18f25" fontWeight="bold">
              30+
            </Typography>
            <Typography variant="body2" color="#c18f25">
              Cities Covered
            </Typography>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeContent;
