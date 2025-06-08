import React from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import EventBusyIcon from '@mui/icons-material/EventBusy';

const StatCard = ({ icon, title, value, color }) => (
  <Paper elevation={3} sx={{ padding: 2, width: '100%', display: 'flex', alignItems: 'center', gap: 2 }}>
    <Box sx={{ fontSize: 40, color }}>{icon}</Box>
    <Box>
      <Typography variant="subtitle1" color="textSecondary">{title}</Typography>
      <Typography variant="h5">{value}</Typography>
    </Box>
  </Paper>
);

const Dashboard = () => (
  <Box p={4}>
    <Typography variant="h4" gutterBottom>Dashboard Overview</Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <StatCard icon={<PeopleIcon />} title="Total Employees" value="42" color="#1976d2" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatCard icon={<EventBusyIcon />} title="Pending Leaves" value="6" color="#d32f2f" />
      </Grid>
    </Grid>
  </Box>
);

export default Dashboard;
