// frontend/src/pages/EditProfilePage.js

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { endpoint } from "../constants";

const EditProfilePage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [employee, setEmployee] = useState({
    employeeId: "",
    name: "",
    gender: "",
    dob: null,
    mailId: "",
    department: "",
    designation: "",
    joiningDate: null,
    basicSalary: "",
    allowance: "",
    totalSalary: "",
    essPassword: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${endpoint}/get-employees`);
      setEmployees(res.data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  const handleEmployeeSelect = (e) => {
    const empId = e.target.value;
    setSelectedEmployeeId(empId);
    const selectedEmp = employees.find((emp) => emp.employee_id === empId);
    if (selectedEmp) {
      setEmployee({
        employeeId: selectedEmp.employee_id,
        name: selectedEmp.name,
        gender: selectedEmp.gender,
        dob: selectedEmp.dob ? dayjs(selectedEmp.dob) : null,
        mailId: selectedEmp.mail,
        department: selectedEmp.department,
        designation: selectedEmp.designation,
        joiningDate: selectedEmp.joining_date
          ? dayjs(selectedEmp.joining_date)
          : null,
        basicSalary: selectedEmp.basic_salary,
        allowance: selectedEmp.allowance,
        totalSalary: selectedEmp.total_salary,
        essPassword: selectedEmp.ess_password,
      });
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleDateChange = (key, date) => {
    setEmployee({ ...employee, [key]: date });
  };

  const totalSalary = (basicSalary, allowance) =>
    (parseFloat(basicSalary || 0) + parseFloat(allowance || 0)).toFixed(2);

  const handleSave = async () => {
    const updatedData = {
      ...employee,
      dob: employee.dob ? dayjs(employee.dob).format("YYYY-MM-DD") : null,
      joiningDate: employee.joiningDate
        ? dayjs(employee.joiningDate).format("YYYY-MM-DD")
        : null,
      totalSalary: totalSalary(employee.basicSalary, employee.allowance),
    };

    try {
      await axios.put(
        `${endpoint}/update-employee/${employee.employeeId}`,
        updatedData
      );
      alert("Profile updated successfully");
      fetchEmployees();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Update failed");
    }
  };

  return (
    <Box p={3}>
      <Card sx={{ p: 3, borderRadius: 3, boxShadow: 6 }}>
        <Typography variant="h6" gutterBottom>
          Edit Employee Profile
        </Typography>

        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Select
              value={selectedEmployeeId}
              onChange={handleEmployeeSelect}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">Select Employee to Edit</MenuItem>
              {employees.map((emp) => (
                <MenuItem key={emp.employee_id} value={emp.employee_id}>
                  {emp.name} ({emp.employee_id})
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Employee ID"
                value={employee.employeeId}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Full Name"
                name="name"
                value={employee.name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Select
                displayEmpty
                name="gender"
                value={employee.gender}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="" disabled>
                  Gender
                </MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="Date of Birth"
                value={employee.dob}
                onChange={(date) => handleDateChange("dob", date)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Mail ID"
                name="mailId"
                value={employee.mailId}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Select
                name="department"
                value={employee.department}
                onChange={handleChange}
                displayEmpty
                fullWidth
              >
                <MenuItem value="" disabled>
                  Department
                </MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
                <MenuItem value="Development">Development</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Select
                name="designation"
                value={employee.designation}
                onChange={handleChange}
                displayEmpty
                fullWidth
              >
                <MenuItem value="" disabled>
                  Designation
                </MenuItem>
                <MenuItem value="HR Executive">HR Executive</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Developer">Developer</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="Joining Date"
                value={employee.joiningDate}
                onChange={(date) => handleDateChange("joiningDate", date)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Monthly Basic Salary"
                name="basicSalary"
                value={employee.basicSalary}
                onChange={handleChange}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Monthly Allowance"
                name="allowance"
                value={employee.allowance}
                onChange={handleChange}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Total Salary"
                value={totalSalary(employee.basicSalary, employee.allowance)}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="ESS Password"
                name="essPassword"
                value={employee.essPassword}
                onChange={handleChange}
                fullWidth
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                color="success"
                onClick={handleSave}
              >
                SAVE CHANGES
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </Card>
    </Box>
  );
};

export default EditProfilePage;
