import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Chip,
  Button,
  Modal,
  Fade,
  Backdrop,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import styled from "@emotion/styled";
import Navbar from "../../../Navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Cards from "react-credit-cards";
import 'react-credit-cards/es/styles-compiled.css';
import DirectionsIcon from '@mui/icons-material/Directions';

const TimeSlotCard = styled(Box)`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px;
  min-height: 100px;
  position: relative;
  background-color: ${({ isSelected }) => (isSelected ? "#e0f7fa" : "#ffffff")};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const HourSection = styled(Box)`
  margin-bottom: 20px;
`;

const OccupancyLine = styled(Box)`
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  height: 5px;
  background-color: ${({ color }) => color || "#e0e0e0"};
  border-radius: 4px;
`;

const ViewParkingSlots = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [filteredPlots, setFilteredPlots] = useState([]);
  const [availableslots, setAvailablePlots] = useState([]);
  const [bookedslots, setbookedslots] = useState([]);
  const [locationParam, setLocationParam] = useState("");
  const [vehicleParam, setVehicleParam] = useState("");
  const [dateParam, setDateParam] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focused: ''
  });
  const [cardErrors, setCardErrors] = useState({});
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setLocationParam(params.get("location"));
    setVehicleParam(params.get("vehicle"));
    setDateParam(params.get("date"));

    const filteredPlotsParam = JSON.parse(
      decodeURIComponent(params.get("filteredPlots"))
    );
    setFilteredPlots(filteredPlotsParam);
    console.log("Location:", params.get("location"));
    console.log("Vehicle:", params.get("vehicle"));
    console.log("Date:", params.get("date"));
    console.log("Filtered Plots:", filteredPlotsParam);
  }, [location]);
console.log(filteredPlots,"filtered");

  const fetchPlots = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/get/getPlotslots", {
        params: {
          plot_id: filteredPlots[0]?.plot_id,
          vehicle_type: vehicleParam,
        },
      });
      const fetchedPlots = response.data.data;
      setAvailablePlots(fetchedPlots);
      console.log(fetchedPlots, "Available");
    } catch (error) {
      console.error("Error fetching plots:", error);
    }
  };
  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/get/getAllBookings");
      const bookedslots = response.data.data;
      setbookedslots(bookedslots);
      console.log(bookedslots, "Booked");
    } catch (error) {
      console.error("Error fetching bookeings:", error);
    }
  };

  useEffect(() => {
    fetchBookings()
    fetchPlots();
    const generateTimeSlots = () => {
      const slots = [];
      for (let hour = 6; hour <= 20; hour++) {
        const formattedHour = hour > 12 ? hour - 12 : hour;
        const period = hour >= 12 ? "PM" : "AM";
        slots.push({
          time: `${formattedHour}:00 ${period}`,
        });
      }
      setTimeSlots(slots);
    };
    generateTimeSlots();
  }, [vehicleParam]);

  const handleSlotClick = (slot,time) => {
    setSelectedSlot(slot);
    setSelectedTime(time)
    setModalOpen(true);
  };

  const validateCard = () => {
    const errors = {};
    if (!/^\d{16}$/.test(cardData.number.replace(/\s/g, ''))) {
      errors.number = 'Invalid card number';
    }
    if (!cardData.name) {
      errors.name = 'Name is required';
    }
    if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
      errors.expiry = 'Invalid expiry date (MM/YY)';
    }
    if (!/^\d{3,4}$/.test(cardData.cvc)) {
      errors.cvc = 'Invalid CVC';
    }
    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInputFocus = (e) => {
    setCardData(prev => ({
      ...prev,
      focused: e.target.name
    }));
  };

  const handlePayment = async () => {
    if (!validateCard()) return;

    try {
      setPaymentProcessing(true);
      const formattedDate = new Date(dateParam).toISOString().split('T')[0];
      
      const response = await axios.post("http://localhost:8081/api/add/bookslot", {
        slot_id: selectedSlot.slot_id,
        plot_id: filteredPlots[0]?.plot_id,
        vehicle_type: vehicleParam,
        vehicle_number: vehicleNumber,
        booking_date: formattedDate,
        time_slot: selectedTime,
        user_id: user.id,
        location: locationParam,
        price: selectedSlot.price,
        payment_status: "completed"
      });
      
      setPaymentSuccess(true);
      setTimeout(() => {
        setShowPaymentDialog(false);
        setModalOpen(false);
        fetchBookings();
      }, 2000);
      
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Error processing payment. Please try again.");
    } finally {
      setPaymentProcessing(false);
    }
  };

  const handleConfirmBooking = () => {
    if (!vehicleNumber) {
      alert("Please enter vehicle number");
      return;
    }
    setShowPaymentDialog(true);
  };

  const handleDirections = (locationUrl) => {
    if (locationUrl) {
      window.open(locationUrl, '_blank');
    } else {
      alert('Location URL not available');
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "calc(100% - 40px)",
          height: "100%",
          padding: "20px",
          paddingTop: "100px",
          backgroundColor: "#f9fafb",
        }}
      >
        <Navbar />
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: "30px"
        }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#3f51b5",
            }}
          >
            Parking Slots
          </Typography>
          <Button
            variant="contained"
            startIcon={<DirectionsIcon />}
            onClick={() => handleDirections(filteredPlots[0]?.location_url)}
            sx={{
              backgroundColor: '#1e88e5',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
              borderRadius: '8px',
              textTransform: 'none',
              padding: '8px 24px',
              boxShadow: '0 4px 12px rgba(30,136,229,0.3)'
            }}
          >
            Go to Direction
          </Button>
        </Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: "#757575",
            marginBottom: "30px",
          }}
        >
          Location: {locationParam}, Vehicle Type: {vehicleParam}, Date: {dateParam}
        </Typography>

        {timeSlots.map(({ time }, index) => (
          <HourSection key={index}>
            <Typography variant="h6" sx={{ marginBottom: "10px", color: "#424242" }}>
              {time}
            </Typography>
            <Grid container spacing={2}>
  {availableslots.map((plot) => {
    const isOccupied = bookedslots.some(
      (booked) =>
        booked.slot_id == plot.slot_id && booked.time_slot == time && booked.booking_date.split("T")[0] == dateParam
    );

    return (
      <Grid item xs={2} key={plot.slot_id}>
        <TimeSlotCard
          onClick={() => !isOccupied && handleSlotClick(plot, time)}
          isSelected={selectedSlot?.slot_id === plot.slot_id}
          sx={{
            backgroundColor: isOccupied ? "#f8d7da" : "#ffffff",
            cursor: isOccupied ? "not-allowed" : "pointer",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              marginBottom: 1,
              textAlign: "center",
              color: isOccupied ? "#dc3545" : "#3f51b5",
            }}
          >
            {`Slot ID: ${plot.slot_id}`}
          </Typography>
          <Typography
            variant="body2"
            sx={{ textAlign: "center", marginBottom: 1 }}
          >
            Slots: {filteredPlots.length}
          </Typography>
          <Chip
            label={`Price: ₹${plot.price}`}
            size="small"
            sx={{
              backgroundColor: isOccupied ? "#f8d7da" : "#85e89d",
              color: isOccupied ? "#dc3545" : "#fff",
            }}
          />
          <OccupancyLine color={isOccupied ? "#dc3545" : "#85e89d"} />
        </TimeSlotCard>
      </Grid>
    );
  })}
</Grid>

          </HourSection>
        ))}
      </Box>

      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Selected Slot Details
            </Typography>
            <Typography>Location: {locationParam}</Typography>
            <Typography>Vehicle Type: {vehicleParam}</Typography>
            <Typography>Time Slot: {selectedTime}</Typography>
            <Typography>Price: ₹{selectedSlot?.price}</Typography>
            <TextField
              fullWidth
              label="Vehicle Number"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              sx={{ mt: 2, mb: 2 }}
              required
            />
            <Button
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={handleConfirmBooking}
            >
              Proceed to Payment
            </Button>
          </Box>
        </Fade>
      </Modal>

      <Dialog 
        open={showPaymentDialog} 
        onClose={() => setShowPaymentDialog(false)}
        maxWidth="sm"
        fullWidth
        disableEscapeKeyDown={paymentProcessing}
      >
        <DialogTitle sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <PaymentIcon />
          {paymentSuccess ? 'Payment Status' : 'Payment Details'}
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {paymentSuccess ? (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              py: 4 
            }}>
              <CheckCircleIcon 
                sx={{ 
                  fontSize: 80, 
                  color: 'success.main',
                  mb: 2
                }} 
              />
              <Typography 
                variant="h5" 
                color="success.main"
              >
                Payment Successful!
              </Typography>
            </Box>
          ) : (
            <>
              <Box sx={{ mb: 3 }}>
                <Cards
                  number={cardData.number}
                  name={cardData.name}
                  expiry={cardData.expiry}
                  cvc={cardData.cvc}
                  focused={cardData.focused}
                />
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    name="number"
                    value={cardData.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    error={!!cardErrors.number}
                    helperText={cardErrors.number}
                    inputProps={{ maxLength: 16 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Cardholder Name"
                    name="name"
                    value={cardData.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    error={!!cardErrors.name}
                    helperText={cardErrors.name}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Expiry Date"
                    name="expiry"
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    error={!!cardErrors.expiry}
                    helperText={cardErrors.expiry}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="CVC"
                    name="cvc"
                    value={cardData.cvc}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    error={!!cardErrors.cvc}
                    helperText={cardErrors.cvc}
                    inputProps={{ maxLength: 4 }}
                  />
                </Grid>
              </Grid>
            </>
          )}
        </DialogContent>
        {!paymentSuccess && (
          <DialogActions sx={{ p: 3, bgcolor: 'grey.50' }}>
            <Button 
              onClick={() => setShowPaymentDialog(false)}
              disabled={paymentProcessing}
              sx={{ color: 'text.secondary' }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handlePayment}
              disabled={paymentProcessing}
              sx={{
                bgcolor: 'success.main',
                '&:hover': {
                  bgcolor: 'success.dark'
                }
              }}
            >
              {paymentProcessing ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  Processing...
                </Box>
              ) : (
                `Pay ₹${selectedSlot?.price}`
              )}
            </Button>
          </DialogActions>
        )}
      </Dialog>

      <Footer />
    </>
  );
};

export default ViewParkingSlots;
