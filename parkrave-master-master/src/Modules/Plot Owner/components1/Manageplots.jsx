import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import axios from 'axios';
import SnackbarComponent from './ManagePlots/SnackbarComponent';
import PlotTable from './ManagePlots/PlotTable';

const ManagePlots = () => {
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPlot, setCurrentPlot] = useState({ location: '', locationUrl: '', vehicleTypes: {} });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [errors, setErrors] = useState({});
  const [isopen, setIsopen] = useState(false);
  const userData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchPlots();
  }, []);

  const fetchPlots = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8081/api/get/getAllplots');
      console.log(response.data.data);
      const userId = userData.id; 
      const filteredPlots = response.data.data.filter(plot => plot.owner_id == userId);
      setPlots(filteredPlots);
    } catch (error) {
      console.error('Error fetching plots:', error);
    }
    setLoading(false);
  };
  


  const deletePlots = async (id) => {
    console.log('Hyy',id);
    
    try {
      const response = await axios.delete(`http://localhost:8081/api/delete/deletePlot/${id}`,);
      fetchPlots()
      if(response.status == 200){

        setSnackbar({ open: true, message: 'Plot deleted successfully!', severity: 'success' });
      }
    } catch (error) {
      console.error('Error fetching plots:', error);
    }
  };

  const handleAddPlot = () => {
    setIsopen(true)
    setCurrentPlot({ location: '', locationUrl: '', vehicleTypes: {} });
  };
  const handleEditPlot = (data) => {
    setIsopen(true)
    setCurrentPlot({
      ...data,
      locationUrl: data.location_url || ''
    });
  };

  const handleSave = async () => {
    if (!validate()) return;

    const payload = {
      ownerId: userData.id,
      location: currentPlot.location,
      locationUrl: currentPlot.locationUrl,
      vehicleTypes: currentPlot.vehicleTypes,
    };

    try {
      await axios.post('http://localhost:8081/api/add/addPlotSlots', payload);
      setSnackbar({ open: true, message: 'Plot added successfully!', severity: 'success' });
      fetchPlots();
      setIsopen(false)
      setCurrentPlot({ location: '', locationUrl: '', vehicleTypes: {} });
    } catch (error) {
      console.error('Error saving plot:', error);
      setSnackbar({ open: true, message: 'Failed to add plot. Please try again.', severity: 'error' });
    }
  };

  const handleCancel = () => {
    setIsopen(false)
    setCurrentPlot({ location: '', locationUrl: '', vehicleTypes: {} });
  };

  const validate = () => {
    const currentErrors = {};

    if (!currentPlot.location || currentPlot.location.trim().length < 4) {
      currentErrors.location = 'Location must be at least 4 characters long.';
    }

    if (!currentPlot.locationUrl || !isValidUrl(currentPlot.locationUrl)) {
      currentErrors.locationUrl = 'Please enter a valid location URL (e.g., Google Maps URL)';
    }

    if (Object.keys(currentPlot.vehicleTypes).length === 0) {
      currentErrors.vehicleTypes = 'At least one vehicle type must be selected.';
    }

    Object.entries(currentPlot.vehicleTypes).forEach(([type, details]) => {
      if (!details.slots || details.slots <= 0) {
        currentErrors[`${type}-slots`] = `Slots for ${type} must be greater than 0.`;
      }
      if (!details.price || details.price <= 0) {
        currentErrors[`${type}-price`] = `Price for ${type} must be greater than 0.`;
      }
    });

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Plots
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddPlot}>
        Add Plot
      </Button>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <PlotTable OnDelete={deletePlots} plots={plots} onEdit={handleEditPlot} />
      )}

      <Dialog open={isopen} onClose={handleCancel} maxWidth="sm" fullWidth>
        <DialogTitle>{currentPlot?.location ? 'Edit Plot' : 'Add Plot'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Location Name"
            value={currentPlot?.location || ''}
            error={!!errors.location}
            helperText={errors.location}
            onChange={(e) => setCurrentPlot({ ...currentPlot, location: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Location URL (Google Maps)"
            value={currentPlot?.locationUrl || ''}
            error={!!errors.locationUrl}
            helperText={errors.locationUrl}
            onChange={(e) => setCurrentPlot({ ...currentPlot, locationUrl: e.target.value })}
            placeholder="https://maps.google.com/..."
          />
          <FormGroup>
            <Typography>Select Vehicle Types</Typography>
            {['Car', 'Bike', 'Truck', 'EV'].map(type => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={currentPlot.vehicleTypes[type] !== undefined}
                    onChange={(e) => {
                      const vehicleTypes = { ...currentPlot.vehicleTypes };
                      if (e.target.checked) {
                        vehicleTypes[type] = { slots: 0, price: 0 };
                      } else {
                        delete vehicleTypes[type];
                      }
                      setCurrentPlot({ ...currentPlot, vehicleTypes });
                    }}
                  />
                }
                label={type}
              />
            ))}
          </FormGroup>

          {Object.keys(currentPlot?.vehicleTypes || {}).map(type => (
            <div key={type} style={{ marginTop: 16 }}>
              <Typography>{type}</Typography>
              <TextField
                fullWidth
                margin="normal"
                type="number"
                label="Number of Slots"
                value={currentPlot.vehicleTypes[type]?.slots || 0}
                error={!!errors[`${type}-slots`]}
                helperText={errors[`${type}-slots`]}
                onChange={(e) => setCurrentPlot({
                  ...currentPlot,
                  vehicleTypes: {
                    ...currentPlot.vehicleTypes,
                    [type]: { ...currentPlot.vehicleTypes[type], slots: e.target.value }
                  }
                })}
              />
              <TextField
                fullWidth
                margin="normal"
                type="number"
                label="Price Per Hour"
                value={currentPlot.vehicleTypes[type]?.price || 0}
                error={!!errors[`${type}-price`]}
                helperText={errors[`${type}-price`]}
                onChange={(e) => setCurrentPlot({
                  ...currentPlot,
                  vehicleTypes: {
                    ...currentPlot.vehicleTypes,
                    [type]: { ...currentPlot.vehicleTypes[type], price: e.target.value }
                  }
                })}
              />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary" variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      <SnackbarComponent
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default ManagePlots;
