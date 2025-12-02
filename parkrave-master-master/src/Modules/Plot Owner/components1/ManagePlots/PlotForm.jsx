import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Typography,
} from '@mui/material';

const PlotForm = ({ onSave, onCancel }) => {
  const vehicleTypes = ['Car', 'Bike', 'Truck', 'EV'];



  return (
    <Dialog open={plot !== null} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{plot?.location ? 'Edit Plot' : 'Add Plot'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Location"
          value={plot?.location || ''}
          error={!!errors.location}
          helperText={errors.location}
        />
        <FormGroup>
          <Typography>Select Vehicle Types</Typography>
          {vehicleTypes.map(type => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={plot?.vehicleTypes[type] !== undefined}
                />
              }
              label={type}
            />
          ))}
        </FormGroup>
        {Object.keys(plot?.vehicleTypes || {}).map(type => (
          <div key={type} style={{ marginTop: 16 }}>
            <Typography>{type}</Typography>
            <TextField
              fullWidth
              margin="normal"
              type="number"
              label="Number of Slots"

              error={!!errors[`${type}-slots`]}
              helperText={errors[`${type}-slots`]}
            />
            <TextField
              fullWidth
              margin="normal"
              type="number"
              label="Price Per Hour"
              error={!!errors[`${type}-price`]}
              helperText={errors[`${type}-price`]}
            />
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">Cancel</Button>
        <Button onClick={onSave} color="primary" variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlotForm;
