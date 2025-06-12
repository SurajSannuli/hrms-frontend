import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import {
  CalendarToday,
  MonetizationOn,
  EventAvailable,
  PendingActions,
  Cancel,
  AccountBalanceWallet
} from '@mui/icons-material';

const Dashboard = () => {
  const employeeData = {
    name: 'John Doe',
    designation: 'Senior Software Engineer',
    department: 'Product Development',
    employeeId: 'EMP-2023-0456',
    joinDate: '15/06/2018'
  };

  const leaveData = {
    approved: 8,
    pending: 2,
    rejected: 1
  };

  const payrollData = {
    currentMonth: 85600,
    lastMonth: 82000,
    ytd: 598400,
    nextPayDate: '25/06/2023'
  };

  const holidays = [
    { date: '15/08/2023', name: 'Independence Day' },
    { date: '02/10/2023', name: 'Gandhi Jayanti' },
    { date: '25/12/2023', name: 'Christmas' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Welcome, {employeeData.name}
      </Typography>

      <Grid container spacing={3}>
        {/* Employee Info */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Employee Information</Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Designation</Typography>
                  <Typography variant="body1">{employeeData.designation}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Department</Typography>
                  <Typography variant="body1">{employeeData.department}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Employee ID</Typography>
                  <Typography variant="body1">{employeeData.employeeId}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Join Date</Typography>
                  <Typography variant="body1">{employeeData.joinDate}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Leave Summary */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Leave Summary</Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                {[
                  { icon: <EventAvailable color="success" />, label: 'Approved', value: leaveData.approved },
                  { icon: <PendingActions color="warning" />, label: 'Pending', value: leaveData.pending },
                  { icon: <Cancel color="error" />, label: 'Rejected', value: leaveData.rejected }
                ].map((item, index) => (
                  <Grid item xs={4} key={index}>
                    <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                      {item.icon}
                      <Typography variant="h6">{item.value}</Typography>
                      <Typography variant="caption">{item.label} Leave</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Payroll */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Payroll Information</Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <MonetizationOn color="primary" />
                      <Typography variant="subtitle1" sx={{ ml: 1 }}>Current Month</Typography>
                    </Box>
                    <Typography variant="h5">₹{payrollData.currentMonth.toLocaleString()}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <AccountBalanceWallet color="secondary" />
                      <Typography variant="subtitle1" sx={{ ml: 1 }}>YTD Earnings</Typography>
                    </Box>
                    <Typography variant="h5">₹{payrollData.ytd.toLocaleString()}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="body1">
                      Next pay date: <strong>{payrollData.nextPayDate}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Last month: ₹{payrollData.lastMonth.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Holidays */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Upcoming Holidays</Typography>
              <Divider sx={{ mb: 2 }} />
              {holidays.map((holiday, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">{holiday.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{holiday.date}</Typography>
                  {index < holidays.length - 1 && <Divider sx={{ mt: 1 }} />}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
