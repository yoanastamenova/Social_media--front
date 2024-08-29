import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import Navbar from '../views/navbar/nav';
import Sidebar from './Sidebar';

const API_BASE_URL = 'http://localhost:3001/users'; 
const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    const storedData = localStorage.getItem('persist:root');
    const parsedData = storedData ? JSON.parse(storedData) : {};
    const token = parsedData.token ? JSON.parse(parsedData.token) : null; 

    const handleUpdate = (user) => {
        console.log('Updating user:', user);
        // Implementation for update logic here.
    };

    const handleDelete = (userId) => {
        console.log('Deleting user ID:', userId);
        // Implementation for delete logic here.
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'firstName', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerName: 'Last Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'location', headerName: 'Location', width: 150 },
        { field: 'occupation', headerName: 'Occupation', width: 180 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <Button
                            color="primary"
                            size="small"
                            style={{ marginLeft: 16 }}
                            onClick={() => handleUpdate(params.row)}
                        >
                            Update
                        </Button>
                        <Button
                            color="secondary"
                            size="small"
                            onClick={() => handleDelete(params.id)}
                        >
                            Delete
                        </Button>
                    </>
                );
            },
            sortable: false,
            filterable: false,
        },
    ];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/all`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error(`Server responded with an error: ${response.status}`);
                }
                const userData = await response.json(); // Assuming response is directly the array
                setUsers(userData.map(user => ({
                  ...user,
                  id: user._id // DataGrid requires a unique 'id' property
                })));
            } catch (error) {
                console.error("Failed to fetch users:", error.message);
                setError(error.message);
            }
        };
        
        if (token) {
            fetchUsers();
        }
    }, [token]);

    return (
        <>
            <Navbar />
            <div style={{ display: 'flex', height: '100vh' }}>
                <Sidebar />
                <Box sx={{ flexGrow: 1, p: 3 }}>
                    <h3>List of Users Registered:</h3>
                    {error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={users}
                                columns={columns}
                                pageSize={5}
                                checkboxSelection
                                disableSelectionOnClick
                            />
                        </Box>
                    )}
                </Box>
            </div>
        </>
    );
};

export default Users;