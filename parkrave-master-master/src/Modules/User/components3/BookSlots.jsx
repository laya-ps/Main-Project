import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, MenuItem, Select, FormControl, InputLabel, TextField, Button, CircularProgress, styled, outlinedInputClasses, Snackbar, Alert, Autocomplete } from '@mui/material';
import MapIcon from '@mui/icons-material/LocationOn'; // Assuming a parking-related icon
import bg2 from '../../../Assets/bg2.jpg'
import bg1 from '../../../Assets/bg1.avif'
import Navbar2 from './Navbar2';
import { CalendarToday } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const StyledSelect = styled(Select)`
  & .${outlinedInputClasses.notchedOutline} {
    border-color: white; /* Default outline color */
  }
  &:hover .${outlinedInputClasses.notchedOutline} {
    border-color: white; /* Hover outline color */
  }
  &.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline} {
    border-color: lightblue; /* Focus outline color */
  }
  & .MuiInputLabel-root {
    color: white; /* Label color */
  }
  & .MuiInputBase-input {
    color: white; /* Value text color */
  }
  & .MuiSelect-icon {
    color: white; /* Dropdown icon color */
  }
`;

const StyledTextField = styled(TextField)`
  & .${outlinedInputClasses.notchedOutline} {
    border-color: white;
  }
  &:hover .${outlinedInputClasses.notchedOutline} {
    border-color: white;
  }
  &.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline} {
    border-color: lightblue;
  }
  & .MuiInputLabel-root {
    color: white;  // Label color
  }
`;

const StyledAutocomplete = styled(Autocomplete)`
  & .MuiOutlinedInput-root {
    border-color: white;
    color: white;
    &:hover {
      border-color: white;
    }
    &.Mui-focused {
      border-color: lightblue;
    }
  }
  & .MuiInputLabel-root {
    color: white;
  }
  & .MuiInputBase-input {
    color: white;
  }
  & .MuiAutocomplete-popupIndicator {
    color: white;
  }
  & .MuiAutocomplete-clearIndicator {
    color: white;
  }
  & .MuiAutocomplete-paper {
    background-color: #333;
    color: white;
  }
  & .MuiAutocomplete-option {
    &:hover {
      background-color: #444;
    }
    &.Mui-focused {
      background-color: #555;
    }
  }
`;

const BookSlots = () => {
    const [plots, setPlots] = useState([]);
    const [plotPositions, setPlotPositions] = useState([]); // State for storing positions
    const [loading, setLoading] = useState(false);
    const [vehicleType, setVehicleType] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        fetchPlots();
      }, []);
    
      const fetchPlots = async () => {
        setLoading(true);
        try {
          const response = await axios.get('http://localhost:8081/api/get/getAllplots');
          const fetchedPlots = response.data.data;
    
          // Generate random positions for each plot
          const positions = fetchedPlots.map(() => ({
            top: Math.random() * (85 - 45) + 45,
            left: Math.random() * (80 - 20) + 20,
          }));
          setPlots(fetchedPlots);
          setPlotPositions(positions); // Save positions in state
        } catch (error) {
          console.error('Error fetching plots:', error);
        }
        setLoading(false);
      };



  const handleVehicleTypeChange = (event) => {
    setVehicleType(event.target.value);
  };

  const handleLocationChange = (event, newValue) => {
    setSelectedLocation(newValue);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = () => {
    if (!selectedLocation || !vehicleType || !selectedDate || new Date(selectedDate) < new Date()) {
      alert('All fields must be selected, and the date cannot be in the past.');
      return;
    }
      const filteredPlots = plots.filter(plot => 
        plot.location === selectedLocation.location && 
        plot.vehicle_types.hasOwnProperty(vehicleType) // Check if the vehicleType exists in vehicle_types
      );

      console.log(filteredPlots);
      const queryString = `?location=${selectedLocation.location}&vehicle=${vehicleType}&date=${selectedDate}&filteredPlots=${encodeURIComponent(JSON.stringify(filteredPlots))}`;

      if (filteredPlots.length > 0) {
        navigate(`/ViewSlots${queryString}`);
    } else {
        alert('No Parking found');
    }

    console.log(filteredPlots);
    
  };
  

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bg1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: "70px",
        paddingBottom: "40px"
      }}
    >
        <Navbar2/>
        <Box sx={{ 
            width: '100%', 
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px'
        }}>
            <Typography 
                variant="h3" 
                sx={{ 
                    marginBottom: '40px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
            >
                Find Your Parking Slot
            </Typography>

            <Box
                sx={{
                    width: '100%',
                    padding: '30px',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    gap: '20px',
                    alignItems: 'center',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
            >
                {loading ? (
                    <CircularProgress color="inherit" />
                ) : (
                    <>
                        <StyledAutocomplete
                            options={plots}
                            getOptionLabel={(option) => option.location}
                            value={selectedLocation}
                            onChange={handleLocationChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search Location"
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderColor: 'white',
                                            color: 'white',
                                            '&:hover fieldset': {
                                                borderColor: 'white',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'lightblue',
                                            },
                                            height: '56px',
                                            backgroundColor: 'rgba(255,255,255,0.05)',
                                            borderRadius: '8px',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'white',
                                        },
                                    }}
                                />
                            )}
                            renderOption={(props, option) => (
                                <Box component="li" {...props} sx={{ 
                                    padding: '12px 16px',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                    }
                                }}>
                                    <MapIcon sx={{ mr: 2, color: '#1e88e5' }} />
                                    <Box>
                                        <Typography variant="body1">{option.location}</Typography>
                                        {option.location_url && (
                                            <Typography variant="caption" sx={{ color: '#aaa' }}>
                                                View on Map
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            )}
                            sx={{ flex: 2 }}
                        />

                        <FormControl fullWidth sx={{ flex: 1 }}>
                            <InputLabel style={{color:"white"}} id="select-vehicle-type">Select Type of Vehicle</InputLabel>
                            <StyledSelect
                                labelId="select-vehicle-type"
                                value={vehicleType}
                                onChange={handleVehicleTypeChange}
                                label="Select Type of Vehicle"
                                sx={{
                                    height: '56px',
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    borderRadius: '8px',
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused': {
                                            borderColor: 'white',
                                        },
                                        borderColor: 'white',
                                        color: 'white',
                                    },
                                    '& .MuiInputBase-root': {
                                        color: 'white',
                                    },
                                    '& .MuiSelect-icon': {
                                        color: 'white',
                                    }
                                }}
                            >
                                <MenuItem value="Car">Car</MenuItem>
                                <MenuItem value="Bike">Bike</MenuItem>
                                <MenuItem value="Truck">Truck</MenuItem>
                                <MenuItem value="EV">Electric Vehicle (EV)</MenuItem>
                            </StyledSelect>
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                                label="Select Date"
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                                format="dd/MM/yyyy"
                                disablePast
                                slotProps={{
                                    textField: {
                                        sx: {
                                            flex: 1,
                                            '& .MuiOutlinedInput-root': {
                                                height: '56px',
                                                backgroundColor: 'rgba(255,255,255,0.05)',
                                                borderRadius: '8px',
                                                color: 'white',
                                                '& fieldset': { borderColor: 'white' },
                                                '&:hover fieldset': { borderColor: 'white' },
                                                '&.Mui-focused fieldset': { borderColor: 'white' },
                                            },
                                            '& .MuiInputBase-input': { color: 'white' },
                                            '& .MuiInputLabel-root': { color: 'white' },
                                            '& .MuiSvgIcon-root': { color: 'white' },
                                        },
                                    },
                                    dialog: {
                                        sx: {
                                            '& .MuiPaper-root': {
                                                backgroundColor: '#333',
                                                color: 'white',
                                            },
                                            '& .MuiButtonBase-root': {
                                                color: 'white',
                                            },
                                        },
                                    },
                                }}
                            />
                        </LocalizationProvider>

                        <Button 
                            variant="contained" 
                            onClick={handleSubmit}
                            sx={{
                                height: '56px',
                                backgroundColor: '#1e88e5',
                                '&:hover': {
                                    backgroundColor: '#1565c0',
                                },
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                padding: '0 32px',
                                boxShadow: '0 4px 12px rgba(30,136,229,0.3)'
                            }}
                        >
                            Find Parking
                        </Button>
                    </>
                )}
            </Box>

            <Box
                sx={{
                    width: '100%',
                    marginTop: '40px',
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bg2})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    padding: '30px',
                    borderRadius: '16px',
                    height: 400,
                    position: 'relative',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
            >
                <Grid container spacing={4}>
                    {plots.map((plot, index) => (
                        <Grid
                            key={index}
                            item
                            xs={6}
                            sm={4}
                            md={3}
                            sx={{
                                position: 'absolute',
                                top: `${plotPositions[index]?.top}%`,
                                left: `${plotPositions[index]?.left}%`,
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: 'white',
                                    minWidth: '120px',
                                    textAlign: 'center',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                    }
                                }}
                            >
                                <MapIcon sx={{ marginRight: '8px', color: '#1e88e5' }} />
                                {plot.location}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    </Box>
  );
};

export default BookSlots;
