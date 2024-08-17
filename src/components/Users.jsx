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
        <Box padding="2rem 6%">
          <div>Registered users:</div>
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
            gap="20px"
            m={3}
          >
            <div>User one</div>
            <div>User two</div>
            <div>User three</div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Users;

