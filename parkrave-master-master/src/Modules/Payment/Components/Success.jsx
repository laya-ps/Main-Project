import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import succlogo from "../assets/animat-checkmark.gif"; // Adjust the import path
import errorlogo from "../assets/failed.gif"; // Add an appropriate error GIF or image

const useStyles = makeStyles({
  root: {
    minWidth: 400,
    margin: "20px",
  },
  title: {
    fontSize: 14,
    textAlign: "center",
  },
  text: {
    width: 350,
    margin: "10px",
  },
  img: { width: "200px" },
  con: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Success({ onClose,bookingStatus }) {
  const classes = useStyles();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timeout
  }, [onClose]);

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.con}>
          <img
            src={bookingStatus === "success" ? succlogo : errorlogo}
            alt={bookingStatus === "success" ? "Success" : "Error"}
            className={classes.img}
          />
        </div>
        <Typography
          className={classes.title}
          variant="h5"
          color={bookingStatus === "success" ? "primary" : "error"}
          gutterBottom
        >
          <b>
            {bookingStatus === "success"
              ? "Order Confirmed"
              : "Booking Failed"}
          </b>
        </Typography>
        {bookingStatus === "fail" && (
          <Typography variant="body2" color="textSecondary" align="center">
            Please try again later.
          </Typography>
        )}
        {bookingStatus !== null && (
          <div className={classes.con}>
            <Button
              variant="contained"
              color="primary"
              onClick={onClose}
              style={{ marginTop: "10px" }}
            >
              Close
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
