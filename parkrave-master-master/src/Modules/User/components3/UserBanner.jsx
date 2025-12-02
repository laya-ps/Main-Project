import React from 'react';
import { Box, Typography } from '@mui/material';
import bg from '../../../Assets/aju.png'; // Ensure the path is correct

const UserBanner = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(120vh - 70px)',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end', // Centers the text
        // paddingRight: '10%', 
  
        
      }}
    >
      <Box>
        <Typography
          variant="h2"
          fontWeight="bold"
          color='#ccc'
          
          sx={{
            marginBottom: '16px',
            textShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
            transition: "color 0.3s ease, transform 0.3s ease",
              cursor: "pointer",
              '&:hover': {
                transform: "scale(1.08)",
                color: "#FFD700", // Golden effect on hover
                fontFamily:"'Trebuchet MS', sans-serif",
              }
          }}
        >
          Park with Ease
        </Typography>
        <Typography
          variant="h2"
          fontWeight="bold"
           color='#ccc'
          sx={{
            marginBottom: '16px',
            textShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
            transition: "color 0.3s ease, transform 0.3s ease",
              cursor: "pointer",
              '&:hover': {
                transform: "scale(1.08)",
                color: "#FFD700", // Golden effect on hover
                fontFamily:"'Trebuchet MS', sans-serif",
              }
          }}
        >
          Book with Confidence.
        </Typography>
        <Typography
          variant="h2"
          fontWeight="bold"
           color='#ccc'
          sx={{
            textShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
            transition: "color 0.3s ease, transform 0.3s ease",
              cursor: "pointer",
              '&:hover': {
                transform: "scale(1.08)",
                color: "#FFD700", // Golden effect on hover
                fontFamily:"'Trebuchet MS', sans-serif",
              }
          }}
        >
          Find Spot in a Snap!
        </Typography>
      </Box>
    </Box>
  );
};

export default UserBanner;
