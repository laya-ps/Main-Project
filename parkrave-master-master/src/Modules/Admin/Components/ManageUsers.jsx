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
} from '@mui/material';
import axios from 'axios';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Fetch users from the API
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8081/api/get/getAllUsers');
            setUsers(response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        setLoading(false);
    };
    useEffect(() => {

        fetchUsers();
    }, []);

    // Handle Block/Unblock User
    const handleBlockUnblock = async (userId, action) => {
        try {
          const url ='http://localhost:8081/api/update/UpdateUserStatus'
            if(action === 'block'){
              await axios.put(url,{id : userId,status:1});
            }else{
              await axios.put(url,{id : userId,status:0});
            }
            fetchUsers()
            setSnackbar({
                open: true,
                message: `User successfully ${action === 'block' ? 'blocked' : 'unblocked'}`,
                severity: 'success',
            });
        } catch (error) {
            console.error(`Error trying to ${action} user:`, error);
            setSnackbar({
                open: true,
                message: `Failed to ${action} user. Please try again.`,
                severity: 'error',
            });
        }
    };

    // Close Snackbar
    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Manage Users
            </Typography>
            <Typography variant="body1" gutterBottom>
                You can view, block, and unblock users here.
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
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.filter((item)=>item.user_type == 'User').map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone_number}</TableCell>
                                    <TableCell>
                                        {user.status == 1 ? (
                                            <Typography color="error">Blocked</Typography>
                                        ) : (
                                            <Typography color="success">Active</Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {user.status == 1 ? (
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={() => handleBlockUnblock(user.id, 'unblock')}
                                            >
                                                Unblock
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleBlockUnblock(user.id, 'block')}
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

export default ManageUsers;
