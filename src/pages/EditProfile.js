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
  InputAdornment
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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

  // 🔹 Dummy Data for Testing
  const fetchEmployees = async () => {
    const dummyData = [
      {
        employeeId: "EMP001",
        name: "John Doe",
        gender: "Male",
        dob: "1990-03-15",
        mailId: "john.doe@example.com",
        department: "Development",
        designation: "Developer",
        joiningDate: "2022-01-10",
        basicSalary: "50000",
        allowance: "10000",
        totalSalary: "60000",
        essPassword: "john123"
      },
      {
        employeeId: "EMP002",
        name: "Jane Smith",
        gender: "Female",
        dob: "1988-07-22",
        mailId: "jane.smith@example.com",
        department: "HR",
        designation: "HR Executive",
        joiningDate: "2021-06-05",
        basicSalary: "45000",
        allowance: "8000",
        totalSalary: "53000",
        essPassword: "jane123"
      }
    ];
    setEmployees(dummyData);
  };

  const handleEmployeeSelect = (e) => {
    const empId = e.target.value;
    setSelectedEmployeeId(empId);
    const selectedEmp = employees.find(emp => emp.employeeId === empId);
    if (selectedEmp) {
      setEmployee({
        ...selectedEmp,
        dob: selectedEmp.dob ? dayjs(selectedEmp.dob) : null,
        joiningDate: selectedEmp.joiningDate ? dayjs(selectedEmp.joiningDate) : null
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

  const handleSave = () => {
    const updatedData = {
      ...employee,
      dob: employee.dob ? dayjs(employee.dob).format("YYYY-MM-DD") : null,
      joiningDate: employee.joiningDate ? dayjs(employee.joiningDate).format("YYYY-MM-DD") : null,
      totalSalary: totalSalary(employee.basicSalary, employee.allowance)
    };
    console.log("Updated Employee Data:", updatedData);
    alert("Mock Save: Changes logged to console.");
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
                <MenuItem key={emp.employeeId} value={emp.employeeId}>
                  {emp.name} ({emp.employeeId})
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
                <MenuItem value="" disabled>Department</MenuItem>
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
                <MenuItem value="" disabled>Designation</MenuItem>
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
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth color="success" onClick={handleSave}>
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
