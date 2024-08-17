import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar as ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'; 
import { Box, Typography, useTheme } from '@mui/material';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';  
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';  
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';  

const Sidebar = () => {
 const [isCollapsed, setIsCollapsed] = useState(false);
    const theme = useTheme();
    const background = theme.palette.mode === 'dark' ? '#000000' : theme.palette.background.default; // Manually set black for dark mode

  return (
    <Box>
      <ProSidebar collapsed={isCollapsed} onToggle={setIsCollapsed}  style={{ height: '100%', background }}>
        <Menu iconShape="square">
          <MenuItem icon={<MenuOutlinedIcon />} onClick={() => setIsCollapsed(!isCollapsed)}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Menu
            </Typography>
          </MenuItem>

          <MenuItem icon={<HomeOutlinedIcon />}>
            <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: 'inherit'}}>
              <Typography>Dashboard</Typography>
            </Link>
          </MenuItem>

          <MenuItem icon={<PeopleOutlineIcon />}>
            <Link to="/dashboard/users" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography>Users</Typography>
            </Link>
          </MenuItem>

          <MenuItem icon={<DescriptionOutlinedIcon />}>
            <Link to="/dashboard/posts" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography>Posts</Typography>
            </Link>
          </MenuItem>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
