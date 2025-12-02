import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

const PlotTable = ({ plots, OnDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Location</strong></TableCell>
            <TableCell><strong>Vehicle Types</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {plots.map(plot => (
            <TableRow key={plot.plot_id}>
              <TableCell>{plot.location}</TableCell>
              <TableCell>
                {Object.entries(plot.vehicle_types).map(
                  ([type, details]) =>
                    `${type}: Slots - ${details.slots}, Price - ${details.price}`
                ).join(', ')}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => OnDelete(plot.plot_id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlotTable;
