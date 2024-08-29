import React, { useState, useEffect } from 'react';
// import { Box } from '@mui/material';
// import { DataGrid } from "@mui/x-data-grid";
// import Navbar from '../views/navbar/nav';
// import Sidebar from './Sidebar';

const API_BASE_URL = 'http://localhost:3001/users'; // Adjust according to your server

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    // Retrieving and parsing the token correctly from localStorage
    const storedData = localStorage.getItem('persist:root');
    const parsedData = storedData ? JSON.parse(storedData) : {};
    const token = parsedData.token ? JSON.parse(parsedData.token) : null; // Parsing the token JSON string

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
            const users = await response.json(); // Directly assuming response is an array
            console.log("Users fetched:", users);  // Check what the data looks like
            setUsers(users); // Assume response is directly the array
        } catch (error) {
            console.error("Failed to fetch users:", error.message);
            setError(error.message);
        }
    };
        if (token) {
            fetchUsers();
        } else {
            setError("No token found or authentication failed, please login.");
        }
    }, [token]);

    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Server responded with an error');
            }
            const result = await response.json();
            if (result.success) {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
            } else {
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            console.error("Failed to delete user:", error.message);
            setError(error.message);
        }
    };

    return (
        <>
            <h3>List of Users Registered:</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.firstName}</td>
                        <td>
                            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                {users.length === 0 && <tr><td colSpan="4">No users found.</td></tr>}
                </tbody>
            </table>
            {error && <p>Error: {error}</p>}
        </>
    );
};

export default Users;