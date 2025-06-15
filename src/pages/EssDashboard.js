import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import {
  MonetizationOn,
  EventAvailable,
  PendingActions,
  Cancel,
  AccountBalanceWallet,
} from "@mui/icons-material";
import { endpoint } from "../constants";
import axios from "axios";

const ESSDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const holidays = [
    { date: "15/08/2023", name: "Independence Day" },
    { date: "02/10/2023", name: "Gandhi Jayanti" },
    { date: "25/12/2023", name: "Christmas" },
  ];

  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    if (!employeeId) return;

    const fetchDashboard = async () => {
      try {
        const res = await axios.get(`${endpoint}/ess-dashboard/${employeeId}`);
        setDashboardData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch ESS dashboard", error);
      }
    };

    fetchDashboard();
  }, [employeeId]);

  const getNextMonthFirstDate = () => {
    const today = new Date();
    const nextMonthFirst = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );
    return nextMonthFirst.toLocaleDateString("en-GB");
  };

  if (!dashboardData) {
    return <Typography sx={{ p: 3 }}>Loading Dashboard...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Welcome, {dashboardData.name}
      </Typography>

      <Grid container spacing={3}>
        {/* Employee Info */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Employee Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Designation
                  </Typography>
                  <Typography variant="body1">
                    {dashboardData.designation}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Department
                  </Typography>
                  <Typography variant="body1">
                    {dashboardData.department}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Employee ID
                  </Typography>
                  <Typography variant="body1">
                    {dashboardData.employee_id}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Join Date
                  </Typography>
                  <Typography variant="body1">
                    {new Date(dashboardData.joining_date).toLocaleDateString(
                      "en-GB"
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Leave Summary */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Leave Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                {[
                  {
                    icon: <EventAvailable color="success" />,
                    label: "Approved",
                    value: dashboardData.approved_leaves,
                  },
                  {
                    icon: <PendingActions color="warning" />,
                    label: "Pending",
                    value: dashboardData.pending_leaves,
                  },
                  {
                    icon: <Cancel color="error" />,
                    label: "Rejected",
                    value: dashboardData.rejected_leaves,
                  },
                ].map((item, index) => (
                  <Grid item xs={4} key={index}>
                    <Paper sx={{ p: 2, textAlign: "center", height: "100%" }}>
                      {item.icon}
                      <Typography variant="h6">{item.value}</Typography>
                      <Typography variant="caption">
                        {item.label} Leave
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Payroll Info */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Payroll Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, height: "100%" }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <MonetizationOn color="primary" />
                      <Typography variant="subtitle1" sx={{ ml: 1 }}>
                        Current Month
                      </Typography>
                    </Box>
                    <Typography variant="h5">
                      ₹{parseFloat(dashboardData.total_salary).toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, height: "100%" }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <AccountBalanceWallet color="secondary" />
                      <Typography variant="subtitle1" sx={{ ml: 1 }}>
                        Next Pay Date
                      </Typography>
                    </Box>
                    <Typography variant="h6">
                      {getNextMonthFirstDate()}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Holidays */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Holidays
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {holidays.map((holiday, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">{holiday.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {holiday.date}
                  </Typography>
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

export default ESSDashboard;
