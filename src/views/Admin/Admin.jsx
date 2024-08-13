import { Box, useMediaQuery } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Navbar from 'views/navbar/nav';
import { styled } from '@mui/material/styles';

export const Admin = () => {
    const [users, setUsers] = useState(null);
    const [posts, setPosts] = useState(null);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const getAllUsers = async () => {
        const response = await fetch(`http://localhost:3001/users/all`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUsers(data);
      };

      function generate(element) {
        return [0, 1, 2].map((value) =>
          React.cloneElement(element, {
            key: value,
          }),
        );
      }
      
      const Demo = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
      }));
      
      function InteractiveList() {
        const [dense, setDense] = React.useState(false);
        const [secondary, setSecondary] = React.useState(false);
      }

  return (
    <Box>
        <Navbar />
        <Box>
            <div> Total Users</div>
            <div> Total Likes</div>
            <div> Total Comments</div>
            <div> Total Posts</div>
        </Box>
    </Box>
  )
}
