
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, Grid, Button, TextField, CircularProgress, Alert, Select, MenuItem, InputLabel, FormControl, Paper } from '@mui/material';
import axios from 'axios';

const Reports = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ vehicleType: '', date: '' });

  // Fetch booking data
  const fetchBookingReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8081/api/get/getAllBookings');
      if (response.status === 200) {
        setBookings(response.data.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingReports();
  }, []);

  // Calculate earnings
  const calculateEarnings = (bookings) => {
    const totalEarnings = bookings.reduce((sum, booking) => {
      // Convert price to number and handle any non-numeric values
      const price = Number(booking.price) || 0;
      return sum + price;
    }, 0);
    
    const platformFee = totalEarnings * 0.1; // 10% platform fee
    const netEarnings = totalEarnings - platformFee;

    return {
      totalEarnings: Number(totalEarnings.toFixed(2)),
      platformFee: Number(platformFee.toFixed(2)),
      netEarnings: Number(netEarnings.toFixed(2))
    };
  };

  // Filter function based on selected vehicle type and date
  const filteredBookings = bookings.filter((booking) => {
    const vehicleTypeMatch = booking.vehicle_type
      .toLowerCase()
      .includes(filter.vehicleType.toLowerCase());

    const bookingDate = new Date(booking.booking_date);
    const formattedBookingDate = bookingDate.toISOString().split('T')[0];
    const dateMatch = filter.date ? formattedBookingDate === filter.date : true;

    return vehicleTypeMatch && dateMatch;
  });

  const earnings = calculateEarnings(filteredBookings);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom sx={{ marginTop: 4, fontWeight: 'bold' }}>
        Booking & Earnings Reports
      </Typography>

      {loading && <CircularProgress sx={{ margin: '20px auto', display: 'block' }} />}
      
      {error && (
        <Alert severity="error" sx={{ marginTop: 3, textAlign: 'center' }}>
          {error}
        </Alert>
      )}

      {/* Earnings Summary Card */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: '#f8f9fa' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: '#e3f2fd' }}>
              <CardContent>
                <Typography variant="h6" color="primary">Total Revenue</Typography>
                <Typography variant="h4">₹{earnings.totalEarnings}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              backgroundColor: '#fff3e0',
              transform: 'scale(1.05)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '2px solid #ff9800'
            }}>
              <CardContent>
                <Typography variant="h6" color="warning.main" sx={{ fontWeight: 'bold' }}>
                  Your Earnings (Platform Fee)
                </Typography>
                <Typography variant="h4" sx={{ color: '#f57c00', fontWeight: 'bold' }}>
                  ₹{earnings.platformFee}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: '#e8f5e9' }}>
              <CardContent>
                <Typography variant="h6" color="success.main">Parking Owner Revenue</Typography>
                <Typography variant="h4">₹{earnings.netEarnings}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      <Box display="flex" justifyContent="center" alignItems="center" marginTop={4}>
        <FormControl sx={{ marginRight: 2 }} size="small" variant="outlined">
          <InputLabel>Vehicle Type</InputLabel>
          <Select
            label="Vehicle Type"
            value={filter.vehicleType}
            onChange={(e) => setFilter({ ...filter, vehicleType: e.target.value })}
            displayEmpty
            style={{minWidth:"120px"}}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Car">Car</MenuItem>
            <MenuItem value="Bike">Bike</MenuItem>
            <MenuItem value="Truck">Truck</MenuItem>
            <MenuItem value="EV">EV</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Filter by Date"
          type="date"
          value={filter.date}
          onChange={(e) => setFilter({ ...filter, date: e.target.value })}
          sx={{ marginRight: 2 }}
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        
        <Button variant="contained" sx={{ backgroundColor: '#3f51b5' }} onClick={fetchBookingReports}>
          Apply Filters
        </Button>
      </Box>

      <Box mt={4}>
        {filteredBookings.length === 0 && !loading && !error && (
          <Typography variant="h6" align="center">
            No bookings found for the given filters.
          </Typography>
        )}
        {filteredBookings.length > 0 && (
          <Grid container spacing={3}>
            {filteredBookings.map((booking) => (
              <Grid item xs={12} sm={6} md={4} key={booking.booking_id}>
                <Card sx={{ padding: 2, boxShadow: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                      Booking ID: PARKRAVE00{booking.booking_id}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Vehicle Type:</strong> {booking.vehicle_type}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Booking Date:</strong>{' '}
                      {new Date(booking.booking_date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Time Slot:</strong> {booking.time_slot}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Status:</strong> {booking.status || 'Pending'}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                      <strong>Amount:</strong> ₹{booking.price || 0}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Reports;
