import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../../views/navbar/nav'; 
import Sidebar from '../../components/Sidebar';

const Admin = () => {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <Sidebar />
        <Box padding="2rem 6%">
        <div>Welcome to the Dashboard</div>
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
