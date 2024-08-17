import React from 'react';
import { Box, useTheme } from '@mui/material';
import Navbar from '../../views/navbar/nav'; 
import Sidebar from '../../components/Sidebar';

const Admin = () => {
  const theme = useTheme();
  const backgroundColor = theme.palette.background.default;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor }}>
      <Navbar />
      <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <Sidebar />
      </Box>
    </Box>
  );
};

export default Admin;
