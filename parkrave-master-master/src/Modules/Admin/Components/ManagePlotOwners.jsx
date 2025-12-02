import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    CircularProgress,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import axios from 'axios';

const ManagePlotOwners = () => {
    const [plotOwners, setPlotOwners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [selectedPlots, setSelectedPlots] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    // Fetch plot owners from the API
    const fetchPlotOwners = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8081/api/get/getAllUsers');
            // Filter users with user_type === 'Plot Owner'
            setPlotOwners(response.data.data.filter((user) => user.user_type === 'Plot Owner'));
        } catch (error) {
            console.error('Error fetching plot owners:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPlotOwners();
    }, []);

    // Handle Block/Unblock Plot Owner
    const handleBlockUnblock = async (plotOwnerId, action) => {
        try {
            const url = 'http://localhost:8081/api/update/UpdateUserStatus';
            if (action === 'block') {
                await axios.put(url, { id: plotOwnerId, status: 1 });
            } else {
                await axios.put(url, { id: plotOwnerId, status: 0 });
            }
            fetchPlotOwners();
            setSnackbar({
                open: true,
                message: `Plot Owner successfully ${action === 'block' ? 'blocked' : 'unblocked'}`,
                severity: 'success',
            });
        } catch (error) {
            console.error(`Error trying to ${action} plot owner:`, error);
            setSnackbar({
                open: true,
                message: `Failed to ${action} plot owner. Please try again.`,
                severity: 'error',
            });
        }
    };

    // Fetch plots for a specific Plot Owner
    const handleViewPlots = async (plotOwnerId) => {
        try {
            const response = await axios.get(`http://localhost:8081/api/get/getOwnerPlots/${plotOwnerId}`);
            setSelectedPlots(response.data.data);
            setOpenDialog(true);
        } catch (error) {
            console.error('Error fetching plots:', error);
            setSnackbar({
                open: true,
                message: 'Failed to fetch plots. Please try again.',
                severity: 'error',
            });
        }
    };

    // Close Snackbar
    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    // Close Dialog
    const handleCloseDialog = () => setOpenDialog(false);

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Manage Plot Owners
            </Typography>
            <Typography variant="body1" gutterBottom>
                You can view, block, and unblock plot owners here.
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell><strong>Phone</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                                <TableCell><strong>Plots</strong></TableCell>
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {plotOwners.map((plotOwner) => (
                                <TableRow key={plotOwner.id}>
                                    <TableCell>{plotOwner.name}</TableCell>
                                    <TableCell>{plotOwner.email}</TableCell>
                                    <TableCell>{plotOwner.phone_number}</TableCell>
                                    <TableCell>
                                        {plotOwner.status === 1 ? (
                                            <Typography color="error">Blocked</Typography>
                                        ) : (
                                            <Typography color="success">Active</Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleViewPlots(plotOwner.id)}
                                        >
                                            View Plots
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        {plotOwner.status === 1 ? (
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={() => handleBlockUnblock(plotOwner.id, 'unblock')}
                                            >
                                                Unblock
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleBlockUnblock(plotOwner.id, 'block')}
                                            >
                                                Block
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Dialog for viewing plots */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Plots</DialogTitle>
                <DialogContent>
                    {selectedPlots.length > 0 ? (
                      <Table>
    <TableHead>
        <TableRow>
            <TableCell>
                <Typography variant="h6" fontWeight="bold">
                    Plot ID
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="h6" fontWeight="bold">
                    Location
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="h6" fontWeight="bold">
                    Vehicle Details
                </Typography>
            </TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        {selectedPlots.map((plot) => (
            <TableRow key={plot.plot_id}>
                <TableCell>
                    <Typography>{plot.plot_id}</Typography>
                </TableCell>
                <TableCell>
                    <Typography>{plot.location}</Typography>
                </TableCell>
                <TableCell>
                    {Object.entries(plot.vehicle_types).map(([type, details]) => (
                        <Box key={type} sx={{ marginBottom: 1 }}>
                            <Typography variant="body2">
                                <strong>{type}:</strong> Slots - {details.slots}, Price - {details.price}
                            </Typography>
                        </Box>
                    ))}
                </TableCell>
            </TableRow>
        ))}
    </TableBody>
</Table>

                    ) : (
                        <Typography>No plots available for this owner.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for feedback */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ManagePlotOwners;
