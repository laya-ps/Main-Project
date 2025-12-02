import React from 'react';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import parkingImage from '../../../Assets/about1.png'; // You'll need to add an appropriate image

const StyledBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
}));

const ImageSection = styled(Box)(({ theme }) => ({
  position: 'fixed',
  left: 0,
  top: 0,
  width: '50%',
  height: '100vh',
  backgroundImage: `url(${parkingImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
  }
}));

const ContentSection = styled(Box)(({ theme }) => ({
  marginLeft: '50%',
  padding: theme.spacing(4),
  backgroundColor: '#fff',
  minHeight: '100vh',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3.5rem',
  fontWeight: 500,
  marginBottom: theme.spacing(4),
  fontFamily: "'Playfair Display', serif",
  color: '#1e1e1e',
}));

const ContentBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  backgroundColor: '#fff',
  boxShadow: 'none',
  borderRadius: 0,
  '&:hover': {
    transform: 'translateY(-5px)',
    transition: 'transform 0.3s ease',
  },
}));


const AboutUs = () => {
  return (
    <StyledBox>
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Navbar2 />
      </Box>

      <Box sx={{ display: 'flex' }}>
        <ImageSection />

        <ContentSection>
          <Container maxWidth="lg">
            <SectionTitle variant="h1" sx={{ color: '#222' }}>
              About Us
            </SectionTitle>

            <ContentBox elevation={0}>
              <Typography variant="h5" sx={{ color: '#1e1e1e', marginBottom: '6px' }}>
                Focused on excellence for our clients
              </Typography>
              <Typography variant="body1" sx={{ color: '#555', marginBottom: '10px' }}>
                At SnapSpot, we strive to make parking hassle-free by providing a seamless, 
                time-saving, and cost-efficient platform that connects drivers with available 
                parking spots in real-time.
              </Typography>
            </ContentBox>

            <ContentBox elevation={0}>
              <Typography variant="h5" sx={{ color: '#1e1e1e', marginBottom: '6px' }}>
                How It Works
              </Typography>
              <Typography variant="body1" sx={{ color: '#555', marginBottom: '10px' }}>
                SnapSpot uses advanced algorithms to display the most relevant parking spots 
                based on your location and preferences. Our platform provides real-time 
                availability updates and secure booking systems to ensure a smooth parking 
                experience.
              </Typography>
            </ContentBox>

            <ContentBox elevation={0}>
              <Typography variant="h5" sx={{ color: '#1e1e1e', marginBottom: '6px' }}>
                Our Vision
              </Typography>
              <Typography variant="body1" sx={{ color: '#555', marginBottom: '10px' }}>
                The magic happens at SnapSpot - where technology meets convenience. Our 
                state-of-the-art platform is designed to transform the way people think about 
                parking, making it an effortless part of your journey rather than a stressful 
                experience.
              </Typography>
            </ContentBox>
            <ContentBox elevation={0}>
              <Typography variant="h5" sx={{ color: '#1e1e1e', marginBottom: '6px' }}>
              Our Commitment to Users
              </Typography>
              <Typography variant="body1" sx={{ color: '#555', marginBottom: '10px' }}>
              At SnapSpot, we prioritize our users by ensuring a smooth and hassle-free parking experience. Our platform is designed to provide convenience, reliability, and security, making parking effortless. We continuously improve our services based on user feedback and emerging technologies to deliver the best possible experience. 
              </Typography>
            </ContentBox>
          </Container>
        </ContentSection>
      </Box>
    </StyledBox>
  );
};

export default AboutUs;


