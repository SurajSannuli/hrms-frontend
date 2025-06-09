import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Divider
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import {endpoint} from "../constants";

const EmployeeProfile = () => {
  const [mode, setMode] = useState("add"); // "add" or "edit"
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
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
      const res = await fetch(`${endpoint}/employees`);
      const data = await res.json();
      if (res.ok) {
        setEmployees(data);
      } else {
        console.error("Failed to fetch employees:", data.error);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
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

  const handleEmployeeSelect = (e) => {
    const employeeId = e.target.value;
    setSelectedEmployeeId(employeeId);
    
    if (employeeId) {
      const selectedEmp = employees.find(emp => emp.employeeId === employeeId);
      if (selectedEmp) {
        setEmployee({
          ...selectedEmp,
          dob: selectedEmp.dob ? dayjs(selectedEmp.dob) : null,
          joiningDate: selectedEmp.joiningDate ? dayjs(selectedEmp.joiningDate) : null
        });
      }
      setMode("edit");
    } else {
      setMode("add");
      resetForm();
    }
  };

  const resetForm = () => {
    setEmployee({
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
  };

  const validateForm = () => {
    return (
      employee.name &&
      employee.department &&
      employee.designation &&
      employee.mailId &&
      employee.essPassword
    );
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Please fill all required fields");
      return;
    }

    const employeeData = {
      ...employee,
      dob: employee.dob ? dayjs(employee.dob).format("YYYY-MM-DD") : null,
      joiningDate: employee.joiningDate ? dayjs(employee.joiningDate).format("YYYY-MM-DD") : null,
      totalSalary: totalSalary(employee.basicSalary, employee.allowance)
    };

    try {
      const url = mode === "add" 
        ? `${endpoint}/employees` 
        : `${endpoint}/employees/${selectedEmployeeId}`;
      
      const method = mode === "add" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(employeeData)
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Employee ${mode === "add" ? "added" : "updated"} successfully!`);
        fetchEmployees();
        if (mode === "add") resetForm();
      } else {
        alert(`Failed to ${mode} employee: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Error ${mode === "add" ? "adding" : "updating"} employee`);
    }
  };

  return (
    <Box p={3}>
      <Card sx={{ p: 3, borderRadius: 3, boxShadow: 6 }}>
        <Typography variant="h6" gutterBottom>
          {mode === "add" ? "Add New Employee" : "Edit Employee"}
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
                <MenuItem key={emp.employeeId} value={emp.employeeId}>
                  {emp.name} ({emp.employeeId})
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button 
              variant="outlined" 
              fullWidth
              onClick={() => {
                setMode("add");
                setSelectedEmployeeId("");
                resetForm();
              }}
            >
              Add New
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Employee ID"
                name="employeeId"
                value={employee.employeeId}
                onChange={handleChange}
                fullWidth
                disabled={mode === "edit"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Full Name *"
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
                <MenuItem value="" disabled>Gender</MenuItem>
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
                label="Mail ID *"
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
                <MenuItem value="" disabled>Department *</MenuItem>
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
                <MenuItem value="" disabled>Designation *</MenuItem>
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
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="ESS Password *"
                name="essPassword"
                value={employee.essPassword}
                onChange={handleChange}
                fullWidth
                type="password"
              />
            </Grid>

            <Grid item xs={12}>
              <Button 
                variant="contained" 
                fullWidth 
                onClick={handleSubmit}
                color={mode === "add" ? "primary" : "success"}
              >
                {mode === "add" ? "ADD EMPLOYEE" : "SAVE CHANGES"}
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </Card>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Mail ID</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Joining Date</TableCell>
              <TableCell>Monthly Basic</TableCell>
              <TableCell>Monthly Allowance</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.employeeId}>
                <TableCell>{emp.employeeId}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.gender}</TableCell>
                <TableCell>{emp.dob ? dayjs(emp.dob).format("DD/MM/YYYY") : ""}</TableCell>
                <TableCell>{emp.mailId}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>{emp.designation}</TableCell>
                <TableCell>{emp.joiningDate ? dayjs(emp.joingDate).format("DD/MM/YYYY") : ""}</TableCell>
                <TableCell>{emp.basicSalary}</TableCell>
                <TableCell>{emp.allowance}</TableCell>
                <TableCell>{totalSalary(emp.basicSalary, emp.allowance)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployeeProfile;