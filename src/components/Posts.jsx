import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import Navbar from '../views/navbar/nav';
import Sidebar from './Sidebar';

const API_BASE_URL = 'http://localhost:3001/posts'; 
const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");

    const storedData = localStorage.getItem('persist:root');
    const parsedData = storedData ? JSON.parse(storedData) : {};
    const token = parsedData.token ? JSON.parse(parsedData.token) : null;

    const handleUpdate = (post) => {
        console.log("Updating post...");
    };

    const handleDelete = async (postId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/delete/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to delete post');
            }
            setPosts(posts.filter(post => post._id !== postId));
            console.log("Post deleted successfully"); 
        } catch (error) {
            console.error("Failed to delete post:", error.message);
            setError("Failed to delete post: " + error.message);
        }
    };

    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        { field: 'firstName', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerName: 'Last Name', width: 150 },
        { field: 'description', headerName: 'Description', width: 300 },
        { field: 'likes', headerName: 'Likes', type: 'number', width: 100 },
        { field: 'comments', headerName: 'Comments', type: 'number', width: 120 },
        { field: 'createdAt', headerName: 'Created At', width: 180 },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            width: 250,
            renderCell: (params) => {
                return (
                    <>
                        <Button
                            color="primary"
                            size="small"
                            onClick={() => handleUpdate(params.row)}
                            style={{ marginRight: 16 }}
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
            }
        }
    ];

    useEffect(() => {
        const fetchPosts = async () => {
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
                const postData = await response.json();
                setPosts(postData);
            } catch (error) {
                console.error("Failed to fetch posts:", error.message);
                setError(error.message);
            }
        };

        if (token) {
            fetchPosts();
        }
    }, [token]);

    return (
      <>
          <Navbar />
          <div style={{ display: 'flex', height: '100vh' }}>
              <Sidebar />
              <Box sx={{ flexGrow: 1, p: 3 }}>
                  <h3>List of Posts:</h3>
                  {error ? (
                      <p>Error: {error}</p>
                  ) : (
                      <Box sx={{ height: 400, width: '100%' }}>
                          <DataGrid
                              rows={posts}
                              columns={columns}
                              pageSize={5}
                              checkboxSelection
                              disableSelectionOnClick
                              getRowId={(row) => row._id}
                          />
                      </Box>
                  )}
              </Box>
          </div>
      </>
  );
}

export default Posts;