import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import CardContent from "@material-ui/core/CardContent";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 650,
    margin: "20px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  text: {
    width: 350,
    margin: "10px",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop:"130px"
  },
  button: {
    marginRight: 20,
  }
});

export default function PaymentMode({ handleNext ,activeStep ,handleBack ,steps}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    card: true,
    cod: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { card, cod } = state;
  const error = [card, cod].filter((v) => v).length !== 2;
  return (
    <div>
    <Card className={classes.root}>
      <CardContent>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Payment Mode</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={card}
                  onChange={handleChange}
                  name="card"
                  color="primary"
                />
              }
              label="Credit / Debit Card"
            />
            <FormControlLabel
              disabled
              control={
                <Checkbox checked={cod} onChange={handleChange} name="cod" />
              }
              label="COD(Cash On Delivery) *"
            />
          </FormGroup>
          <FormHelperText>* Not Available </FormHelperText>
        </FormControl>
      </CardContent>
    </Card>
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
                            style={{ background: "#2E3B55", color: "#ffffff" }}
                            onClick={handleNext}
                            className={classes.button}
                          >
                            {activeStep === steps.length - 1
                              ? "Finish"
                              : "Next"}
                          </Button>
                        </div>
    </div>
  );
}
