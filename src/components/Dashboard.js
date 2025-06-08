import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const StatCard = ({ icon, title, value, color }) => (
  <Paper elevation={3} sx={{ padding: 2, width: '100%', display: 'flex', alignItems: 'center', gap: 2 }}>
    <Box sx={{ fontSize: 40, color }}>{icon}</Box>
    <Box>
      <Typography variant="subtitle1" color="textSecondary">{title}</Typography>
      <Typography variant="h5">{value}</Typography>
    </Box>
  </Paper>
);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        console.error(err);
        setError("Could not load dashboard data. Showing sample data.");
        // Sample fallback data for development
        setDashboardData({
          totalEmployees: 42,
          employeesOnLeave: 5,
          monthlyPayroll: 125000,
          newestEmployee: {
            name: "Alex Johnson",
            position: "Frontend Developer",
            joinDate: "2023-06-01"
          },
          genderDistribution: [
            { name: 'Male', value: 25 },
            { name: 'Female', value: 17 },
            { name: 'Other', value: 2 }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh" ml="240px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 , marginLeft: "-230px"}}>
      <Typography variant="h4" gutterBottom>Dashboard Overview</Typography>

      {error && (
        <Box mb={2}>
          <Alert severity="warning">{error}</Alert>
        </Box>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<PeopleIcon />}
            title="Total Employees"
            value={dashboardData.totalEmployees}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<EventBusyIcon />}
            title="On Leave Today"
            value={dashboardData.employeesOnLeave}
            color="#d32f2f"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<AttachMoneyIcon />}
            title="Monthly Payroll"
            value={`$${dashboardData.monthlyPayroll.toLocaleString()}`}
            color="#388e3c"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<PersonAddIcon />}
            title="Newest Employee"
            value={dashboardData.newestEmployee.name}
            color="#ffa000"
          />
        </Grid>

        {/* Gender Ratio Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: 300 }}>
            <Typography variant="h6" gutterBottom>Gender Distribution</Typography>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={dashboardData.genderDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Number of Employees" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Newest Employee Details */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Newest Team Member</Typography>
            <Box display="flex" alignItems="center" gap={2} mt={2}>
              <PersonAddIcon color="primary" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h5">{dashboardData.newestEmployee.name}</Typography>
                <Typography color="textSecondary">{dashboardData.newestEmployee.position}</Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  <AccessTimeIcon color="action" sx={{ mr: 1 }} />
                  <Typography>Joined on {formatDate(dashboardData.newestEmployee.joinDate)}</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
