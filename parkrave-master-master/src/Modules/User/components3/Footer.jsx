import React from 'react';
import { Box, Grid, Typography, Button, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import footerbg from '../../../Assets/footerbg.jpeg'

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${footerbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '40px 20px',
          borderRadius: '10px',
        }}
      >
        <Grid container spacing={4}>

          {/* About Us */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
              About ParkRave
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.8' }}>
              ParkRave makes parking stress-free and easy. With our platform, users can book parking
              slots, avoid congestion, and save time. Join us to experience hassle-free parking
              services.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
              Quick Links
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0, color: 'rgba(255, 255, 255, 0.8)' }}>
              <li>
                <a href="/home" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Home
                </a>
              </li>
              <li>
                <a href="/bookings" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Book Slots
                </a>
              </li>
              <li>
                <a href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Contact
                </a>
              </li>
            </ul>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '8px' }}>
              Address: MES Asmabi College , Thrissur , Kerela
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '8px' }}>
              Phone: +91 7778889990
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Email: support@parkrave.com
            </Typography>
          </Grid>

          {/* Social Media Icons */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: '16px' }}>
              <IconButton sx={{ color: 'white' }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: 'white' }}>
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: 'white' }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: 'white' }}>
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

        </Grid>

        {/* Footer Bottom Section */}
        <Box
          sx={{
            marginTop: '40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.3)',
            paddingTop: '20px',
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            © {new Date().getFullYear()} ParkRave. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
