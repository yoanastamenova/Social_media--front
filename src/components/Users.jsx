import React from 'react';
import { Box, useTheme } from '@mui/material';
import Navbar from '../views/navbar/nav'; 
import Sidebar from './Sidebar';

const Users = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <Sidebar />
      </Box>
    </Box>
  );
};
export default Users;

