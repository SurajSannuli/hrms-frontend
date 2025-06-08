import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import { Box } from '@mui/material';

const HomePage = () => (
  <Box sx={{ display: 'flex' }}>
    <Box sx={{ width: 240, flexShrink: 0 }}>
      <Sidebar />
    </Box>
    <Box sx={{ flexGrow: 1, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      <Header />
      <Dashboard />
    </Box>
  </Box>
);

export default HomePage;
