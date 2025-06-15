import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TableContainer,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { endpoint, leaveType, status } from "../constants";

function LeavePage() {
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee: "",
    leaveType: "",
    start_date: "",
    end_date: "",
    reason: "",
    days: 0,
  });

  const role = localStorage.getItem("role");
  const employeeId = localStorage.getItem("employeeId");

  const [leaveTypes] = useState([
    "Annual Leave",
    "Sick Leave",
    "Maternity Leave",
    "Paternity Leave",
    leaveType.unpaid,
  ]);

  useEffect(() => {
    axios
      .get(`${endpoint}/get-employees`)
      .then((res) => {
        setEmployees(res.data);

        // If ESS, preselect their own employee ID
        if (role === "ess") {
          const emp = res.data.find((e) => e.employee_id === employeeId);
          if (emp) {
            setForm((prev) => ({
              ...prev,
              employee: emp.employee_id,
            }));
          }
        }
      })
      .catch((err) => console.error("Failed to fetch employees", err));
  }, [role, employeeId]);

  const calculateWorkingDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) return 0;

    let count = 0;
    const current = new Date(start);
    while (current <= end) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) count++;
      current.setDate(current.getDate() + 1);
    }
    return count;
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    updatedForm.days = calculateWorkingDays(
      updatedForm.start_date,
      updatedForm.end_date
    );
    setForm(updatedForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const applyLeave = async () => {
    if (
      !form.employee ||
      !form.start_date ||
      !form.end_date ||
      !form.leaveType
    ) {
      alert("Please fill all required fields");
      return;
    }

    const selectedEmployee = employees.find(
      (emp) => emp.employee_id === form.employee
    );
    const payload = {
      employee_id: selectedEmployee.employee_id,
      employee_name: selectedEmployee.name,
      leaveType: form.leaveType,
      start_date: form.start_date,
      end_date: form.end_date,
      reason: form.reason,
      leave_days: form.days,
      leave_status: role === "ess" ? status.pending : status.approved,
    };

    try {
      await axios.post(`${endpoint}/applyleave`, payload);
      setLeaves([...leaves, { id: Date.now(), ...payload }]);
      setForm({
        employee: role === "ess" ? employeeId : "",
        leaveType: "",
        start_date: "",
        end_date: "",
        reason: "",
        days: 0,
      });
      alert(
        role === "ess"
          ? "Leave application submitted and is pending for approval."
          : "Leave application submitted and auto-approved."
      );
    } catch (error) {
      console.error("Failed to apply leave:", error);
      alert("Error submitting leave application");
    }
  };

  return (
    <Box display="flex" sx={{ height: "100vh" }}>
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          p: 30,
          overflow: "auto",
          marginTop: "-230px",
          marginLeft: "-450px",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Leave Management
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 4, maxWidth: 600 }}>
          <Typography variant="h6" mb={2}>
            Apply for Leave
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Employee</InputLabel>
            <Select
              name="employee"
              value={form.employee}
              onChange={handleChange}
              label="Employee"
              required
              disabled={role === "ess"} // ESS can't change employee
            >
              {(role === "admin"
                ? employees
                : employees.filter((e) => e.employee_id === employeeId)
              ).map((emp) => (
                <MenuItem key={emp.employee_id} value={emp.employee_id}>
                  {emp.employee_id} - {emp.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Leave Type</InputLabel>
            <Select
              name="leaveType"
              value={form.leaveType}
              onChange={handleChange}
              label="Leave Type"
              required
            >
              {leaveTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              label="Start Date"
              name="start_date"
              type="date"
              fullWidth
              value={form.start_date}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="End Date"
              name="end_date"
              type="date"
              fullWidth
              value={form.end_date}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Box>

          <TextField
            label="Leave Days"
            fullWidth
            value={form.days}
            sx={{ mb: 2 }}
            InputProps={{ readOnly: true }}
          />

          <TextField
            label="Reason"
            fullWidth
            multiline
            rows={3}
            name="reason"
            value={form.reason}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <Button variant="contained" onClick={applyLeave}>
            Apply
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}

export default LeavePage;
