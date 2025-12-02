import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  styled,
  Paper,
  Chip,
  Fade
} from '@mui/material';
import Navbar from '../../../Navbar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import DirectionsIcon from '@mui/icons-material/Directions';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import bg1 from '../../../Assets/bg1.avif';

const StyledCard = styled(Card)`
  transition: all 0.3s ease-in-out;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const SearchContainer = styled(Paper)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const NearbyPumps = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [pumps, setPumps] = useState([]);
  const [error, setError] = useState('');
  const [fadeIn, setFadeIn] = useState(false);

  const searchNearbyPetrolPumps = async (latitude, longitude) => {
    try {
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="fuel"](around:5000,${latitude},${longitude});
        );
        out body;
      `;

      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      
      if (data.elements && data.elements.length > 0) {
        const formattedPumps = data.elements
          .filter(pump => pump.lat && pump.lon) // Only include pumps with valid coordinates
          .map(pump => {
            const tags = pump.tags || {};
            return {
              id: pump.id || Math.random().toString(),
              name: tags.name || tags.brand || 'Petrol Station',
              address: tags['addr:street'] || tags['addr:full'] || 'Address not available',
              distance: calculateDistance(latitude, longitude, pump.lat, pump.lon),
              location_url: `https://www.openstreetmap.org/?mlat=${pump.lat}&mlon=${pump.lon}&zoom=18`,
              brand: tags.brand || tags.operator || 'Unknown Brand',
              open24: tags.opening_hours === '24/7',
              amenities: [
                tags.fuel_diesel && 'Diesel',
                tags.fuel_petrol && 'Petrol',
                tags.fuel_octane_95 && 'Octane 95',
                tags.fuel_octane_91 && 'Octane 91'
              ].filter(Boolean)
            };
          });

        setPumps(formattedPumps);
        setFadeIn(true);
      } else {
        setError('No petrol pumps found in this area');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch petrol pumps. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance.toFixed(1) + ' km';
  };

  const handleSearch = async () => {
    if (!searchLocation) {
      setError('Please enter a location');
      return;
    }
    setLoading(true);
    setError('');
    setFadeIn(false);
    setPumps([]); // Clear previous results

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchLocation)}&limit=1`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch location');
      }

      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        await searchNearbyPetrolPumps(lat, lon);
      } else {
        setError('Location not found. Please try a different search.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to find location. Please try again.');
      setLoading(false);
    }
  };

  const handleDirections = (locationUrl) => {
    window.open(locationUrl, '_blank');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        pt: 10,
        pb: 4
      }}
    >
      <Navbar />
      
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bg1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: { xs: '40px 20px', md: '80px 20px' },
          textAlign: 'center',
          color: 'white',
          marginBottom: 4
        }}
      >
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 3,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            fontSize: { xs: '2.5rem', md: '3.5rem' }
          }}
        >
          Find Nearby Petrol Pumps
        </Typography>
        
        <SearchContainer
          sx={{
            maxWidth: '800px',
            margin: '0 auto',
            p: 3
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' }
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter location (e.g., City, Area)..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              error={!!error}
              helperText={error}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '56px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1e88e5',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
              sx={{
                minWidth: '120px',
                height: '56px',
                backgroundColor: '#1e88e5',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(30,136,229,0.3)'
              }}
            >
              Search
            </Button>
          </Box>
        </SearchContainer>
      </Box>

      {/* Results Section */}
      <Fade in={fadeIn} timeout={1000}>
        <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <Grid container spacing={3}>
            {pumps.map((pump) => (
              <Grid item xs={12} sm={6} md={4} key={pump.id}>
                <StyledCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocalGasStationIcon sx={{ color: '#1e88e5', mr: 1, fontSize: '2rem' }} />
                      <Box>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                          {pump.name}
                        </Typography>
                        {pump.brand !== 'Unknown Brand' && (
                          <Typography variant="body2" color="textSecondary">
                            {pump.brand}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                      <LocationOnIcon sx={{ color: '#666', mr: 1, fontSize: '1.2rem', mt: 0.5 }} />
                      <Typography variant="body2" color="textSecondary">
                        {pump.address}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 2 }}>
                      <Chip 
                        label={pump.distance} 
                        size="small" 
                        sx={{ 
                          backgroundColor: '#e3f2fd',
                          color: '#1e88e5',
                          fontWeight: 'bold'
                        }}
                      />
                      <Chip 
                        label={pump.open24 ? "Open 24/7" : "Limited Hours"}
                        size="small" 
                        color={pump.open24 ? "success" : "warning"}
                      />
                    </Box>

                    {pump.amenities && pump.amenities.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                          Available Fuels:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {pump.amenities.map((amenity, index) => (
                            <Chip
                              key={index}
                              label={amenity}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                fontSize: '0.75rem'
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                    
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<DirectionsIcon />}
                      onClick={() => handleDirections(pump.location_url)}
                      sx={{
                        mt: 2,
                        backgroundColor: '#1e88e5',
                        '&:hover': {
                          backgroundColor: '#1565c0',
                        },
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 12px rgba(30,136,229,0.3)'
                      }}
                    >
                      View on Map
                    </Button>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {!loading && pumps.length === 0 && searchLocation && (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="h6" color="textSecondary">
                No petrol pumps found in this area
              </Typography>
            </Box>
          )}
        </Box>
      </Fade>
    </Box>
  );
};

export default NearbyPumps; 