import React, { useState, useRef } from "react";
import Card from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";

const useStyles = makeStyles({
  text: {
    width: 350,
    margin: "10px",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "50px",
  },
  button: {
    marginRight: 20,
  },
});

const PayCard = ({ handleNext, activeStep, handleBack, steps,bookNow,setBookingStatus }) => {
  
  const classes = useStyles();

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCVC] = useState("");
  const [issuer, setIssuer] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");
  const [formValid, setFormValid] = useState(false);

  const formRef = useRef(null);

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setIssuer(issuer);
    }
  };

  const handleInputFocus = (e) => {
    setFocused(e.target.name);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
  
    if (name === "number") {
      formattedValue = formatCreditCardNumber(value);
    } else if (name === "expiry") {
      formattedValue = formatExpirationDate(value);
    } else if (name === "cvc") {
      formattedValue = formatCVC(value);
    }
  
    // Update state and validate form after setting all state variables
    if (name === "number") {
      setNumber(formattedValue);
    } else if (name === "name") {
      setName(formattedValue);
    } else if (name === "expiry") {
      setExpiry(formattedValue);
    } else if (name === "cvc") {
      setCVC(formattedValue);
    }
  
    setTimeout(validateForm, 0); // Ensure validation happens after state update
  };
  
  const validateForm = () => {
    if (
      number.replace(/\s+/g, "").length === 16 &&
      name.trim().length > 0 &&
      expiry.length > 3 &&
      cvc.length >= 2
    ) {
      console.log(true, "valid");
      setFormValid(true);
    } else {
      console.log(false, "not valid");
      console.log(cvc.length);
      
      setFormValid(false);
    }
  };
  
  

  const handleNextWithDelay = async() => {
    setLoading(true);
    const res = await bookNow()
    if(res.status == 200){
      setBookingStatus('success')
    }
    else{
      setBookingStatus('failed')
    }
    setTimeout(() => {
      setLoading(false);
      handleNext();
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValid) return;

    const formElements = [...formRef.current.elements];
    const data = formElements
      .filter((el) => el.name)
      .reduce((acc, el) => {
        acc[el.name] = el.value;
        return acc;
      }, {});

    console.log("Form Submitted: ", data);
  };

  return (
    <div>
      <div className="App-payment" >
        <Grid container  spacing={3}>
          <Grid item xs={6} style={{ marginTop: "50px" }}>
            <Typography variant="h5" gutterBottom style={{ textAlign: "center" }}>
              Enter Your Card Details
            </Typography>
            <Card
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              callback={handleCallback}
              style={{ width: '250px', height: '200px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <form ref={formRef} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                type="tel"
                name="number"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                className={classes.text}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <TextField
                variant="outlined"
                type="text"
                name="name"
                placeholder="Name"
                required
                className={classes.text}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <TextField
                variant="outlined"
                type="tel"
                name="expiry"
                placeholder="Valid Thru"
                pattern="\d\d/\d\d"
                required
                className={classes.text}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <TextField
                variant="outlined"
                type="tel"
                name="cvc"
                placeholder="CVC"
                pattern="\d{3,4}"
                required
                className={classes.text}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <div className={classes.actions}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!formValid}
                  onClick={handleNextWithDelay}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default PayCard;
