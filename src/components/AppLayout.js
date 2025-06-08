import React from 'react';
import { Box, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';

const drawerWidth = 240;

const AppLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#f5f5f5',
          p: 3,
          ml: `${drawerWidth}px`, // Prevent sidebar overlap
        }}
      >
        <Toolbar /> {/* Ensures spacing from top AppBar if any */}
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
