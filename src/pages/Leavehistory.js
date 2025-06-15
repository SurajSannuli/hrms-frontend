import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  TableContainer,
  Alert,
  Snackbar,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { endpoint } from "../constants";

const LeaveHistory = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const employeeId = localStorage.getItem("employeeId");
  const role = localStorage.getItem("role"); // "admin" or "employee"

  const fetchLeaves = async () => {
    setLoading(true);
    setError(null);

    let url = "";
    if (role === "admin") {
      url = `${endpoint}/get-leaves`; // Admin gets all
    } else if (employeeId) {
      url = `${endpoint}/get-ess-leave/${employeeId}`; // ESS employee-specific
    } else {
      setError("Invalid access. No employee ID found.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(url);
      if (Array.isArray(response.data)) {
        setLeaves(response.data);
      } else {
        throw new Error("Invalid data format from API");
      }
    } catch (err) {
      console.error("Error fetching leave history:", err);
      setError("Failed to fetch leave history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [role, employeeId]);

  const getStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box display="flex" sx={{ height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3, overflow: "auto", marginLeft: "-250px" }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Leave History
        </Typography>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert
            severity="error"
            onClose={() => setError(null)}
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>

        <Paper elevation={3}>
          <TableContainer sx={{ maxHeight: "calc(100vh - 250px)" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {role === "admin" && <TableCell>Employee Name</TableCell>}
                  <TableCell>Leave Type</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Days</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : leaves.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No leave records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  leaves.map((leave, index) => (
                    <TableRow key={index} hover>
                      {role === "admin" && (
                        <TableCell>{leave.employee_name || "N/A"}</TableCell>
                      )}
                      <TableCell>{leave.leave_type || "N/A"}</TableCell>
                      <TableCell>
                        {leave.start_date
                          ? new Date(leave.start_date).toLocaleDateString(
                              "en-GB"
                            )
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {leave.end_date
                          ? new Date(leave.end_date).toLocaleDateString("en-GB")
                          : "N/A"}
                      </TableCell>
                      <TableCell>{leave.leave_days || 0}</TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 200,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {leave.reason || "No reason"}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={leave.leave_status || "Unknown"}
                          color={getStatusColor(leave.leave_status)}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default LeaveHistory;
