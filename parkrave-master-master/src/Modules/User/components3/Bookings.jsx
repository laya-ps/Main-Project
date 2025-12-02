import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../../Navbar";
import Footer from "./Footer";
import { QRCodeCanvas } from "qrcode.react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";

const Bookings = () => {
  const [bookingID, setBookingID] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const qrCodeRef = useRef({});

  const fetchBookingDetails = async () => {
    setLoading(true);
    setError(null);
    setBookings([]);
  
    try {
      const userId = JSON.parse(localStorage.getItem("user"));
      if (!userId) {
        throw new Error("User ID not found in localStorage.");
      }
  
      const response = await axios.get("http://localhost:8081/api/get/getAllBookings");
  
      if (response.status === 200) {
        const allBookings = response.data.data;
        const userBookings = allBookings
          .filter(booking => booking.user_id == userId.id)
          // Sort bookings in descending order by booking_id
          .sort((a, b) => b.booking_id - a.booking_id);
        setBookings(userBookings);
        console.log(userBookings);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBookingDetails();
  }, []);

  const handleDownloadQR = (booking) => {
    const canvas = qrCodeRef.current[booking.id].querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `booking-${booking.id}.png`;
    downloadLink.click();
  };

  // Function to generate QR code content
  const generateQRContent = (booking) => {
    return JSON.stringify({
      bookingId: `PARKRAVE00${booking.booking_id}`,
      vehicleNumber: booking.vehicle_number
    });
  };

  return (
    <>
      <Navbar />
      <Container
        style={{
          minHeight: "calc(250px)",
          paddingTop: "80px",
          paddingBottom: "20px",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#3f51b5" }}
        >
          My Bookings
        </Typography>

        {loading && <CircularProgress sx={{ margin: "20px auto", display: "block" }} />}

        {error && (
          <Alert severity="error" sx={{ marginTop: 3, textAlign: "center" }}>
            {error}
          </Alert>
        )}

        {bookings.length === 0 && !loading && !error && (
          <Typography variant="h6" align="center" sx={{ marginTop: 3 }}>
            No bookings available.
          </Typography>
        )}

        {bookings.length > 0 && (
          <Box mt={4}>
            {bookings.map((booking) => (
              <Card
                key={booking.id}
                sx={{
                  marginBottom: 4,
                  padding: 3,
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    {/* Booking Details Section */}
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", marginBottom: 2 }}
                      >
                        Booking Details
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Booking ID:</strong> PARKRAVE00{booking.booking_id}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Slot Number:</strong> {booking.slot_id}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Vehicle Type:</strong> {booking.vehicle_type}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Vehicle Number:</strong> {booking.vehicle_number}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Date:</strong>{" "}
                        {new Date(booking.booking_date).toDateString()}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Time Slot:</strong> {booking.time_slot}
                      </Typography>
                    </Box>

                    {/* QR Code Section */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                      }}
                      ref={(el) =>
                        (qrCodeRef.current = { ...qrCodeRef.current, [booking.id]: el })
                      }
                    >
                      <QRCodeCanvas 
                        value={generateQRContent(booking)} 
                        size={200} 
                      />
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "#4caf50" }}
                        onClick={() => handleDownloadQR(booking)}
                      >
                        Download QR Code
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Bookings;
