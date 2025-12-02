import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from './Assets/banner (2).png'


const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
    const navigate = useNavigate()
  

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = ()=>{
    localStorage.clear('user')
    navigate('/')
  }
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor:'rgba(0, 0, 0, 0.8)',
        transition: 'background-color 0.3s ease-in-out',
        boxShadow: 'none',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingX: '2rem',
        }}
      >
        <img className='logoMain' style={{height:"40px"}} src={logo} />

        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Button
            component={Link}
            to="/UserHome"
            sx={{ color: 'white', fontSize: '1rem', textTransform: 'none' }}
          >
            Home
          </Button>
          <Button
            component={Link}
            sx={{ color: 'white', fontSize: '1rem', textTransform: 'none' }}
            to="/BookSlots"
          >
            Book Slots
          </Button>
            <Button
            component={Link}
            sx={{ color: 'white', fontSize: '1rem', textTransform: 'none' }}
            to="/Bookings"
            >
My Bookings
            </Button>
          <Button
            component={Link}
            to="/AboutUs"
            sx={{ color: 'white', fontSize: '1rem', textTransform: 'none' }}
          >
            About Us
          </Button>
          <Button
            sx={{ color: 'white', fontSize: '1rem', textTransform: 'none' }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
