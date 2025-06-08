import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Header = () => (
    <Box sx={{ marginLeft: "-230px" }}>
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">HRMS Dashboard</Typography>
    </Toolbar>
  </AppBar>
        </Box>
);

export default Header;
