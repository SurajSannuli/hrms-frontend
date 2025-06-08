import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Paper, Typography, Box, Table,
  TableHead, TableRow, TableCell, TableBody, Grid,
  FormControl, InputLabel, Select, MenuItem, Snackbar, Alert
} from '@mui/material';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

function ProfilePage() {
  const masterDepartments = ['Sales', 'HR', 'IT', 'Finance'];
  const masterDesignations = {
    Sales: ['On Ground', 'Team Lead', 'Manager'],
    HR: ['Recruiter', 'HR Executive', 'HR Manager'],
    IT: ['Developer', 'Tester', 'Project Manager'],
    Finance: ['Accountant', 'Analyst']
  };

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const [form, setForm] = useState({
    employeeID: '',
    name: '',
    email: '',
    department: '',
    designation: '',
    monthlyBasic: '',
    monthlyAllowance: ''
  });

  // Fetch employees on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/employees');
        setEmployees(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch employees');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEmployees();
  }, []);

  const handleAddEmployee = async () => {
    const {
      employeeID, name, email, department,
      designation, monthlyBasic, monthlyAllowance
    } = form;

    if (
      !employeeID || !name || !email || !department ||
      !designation || !monthlyBasic || !monthlyAllowance
    ) {
      setError('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('/api/employees', {
        employeeID,
        name,
        email,
        department,
        designation,
        monthlyBasic: parseFloat(monthlyBasic),
        monthlyAllowance: parseFloat(monthlyAllowance)
      });
      
      setEmployees([response.data, ...employees]);
      setForm({
        employeeID: '',
        name: '',
        email: '',
        department: '',
        designation: '',
        monthlyBasic: '',
        monthlyAllowance: ''
      });
      setSuccess('Employee added successfully');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add employee');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (basic, allowance) =>
    (parseFloat(basic || 0) + parseFloat(allowance || 0)).toFixed(2);

  const handleCloseAlert = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <Box display="flex">
      <Sidebar />

      <Box component="main" sx={{ p: 30, marginTop: '-230px' }}>
        

          <Typography variant="h5" gutterBottom>Employee Profile</Typography>

        {/* Add Employee Form */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" mb={2}>Add New Employee</Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Employee ID"
                fullWidth
                value={form.employeeID}
                onChange={e => setForm({ ...form, employeeID: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full Name"
                fullWidth
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Mail ID"
                type="email"
                fullWidth
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  value={form.department}
                  onChange={e =>
                    setForm({
                      ...form,
                      department: e.target.value,
                      designation: ''
                    })
                  }
                  label="Department"
                >
                  {masterDepartments.map((dept, idx) => (
                    <MenuItem key={idx} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Designation</InputLabel>
                <Select
                  value={form.designation}
                  onChange={e => setForm({ ...form, designation: e.target.value })}
                  label="Designation"
                  disabled={!form.department}
                >
                  {(masterDesignations[form.department] || []).map((desig, idx) => (
                    <MenuItem key={idx} value={desig}>
                      {desig}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Monthly Basic Salary"
                type="number"
                fullWidth
                value={form.monthlyBasic}
                onChange={e => setForm({ ...form, monthlyBasic: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Monthly Allowance"
                type="number"
                fullWidth
                value={form.monthlyAllowance}
                onChange={e => setForm({ ...form, monthlyAllowance: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Total Monthly Salary"
                value={calculateTotal(form.monthlyBasic, form.monthlyAllowance)}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
       
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          

          <Grid container spacing={2}>
            {/* ... (keep all your existing form fields) ... */}
          </Grid>

          <Box mt={3}>
            <Button 
              variant="contained" 
              onClick={handleAddEmployee}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Employee'}
            </Button>
          </Box>
        </Paper>
        </Paper>

        {/* View Employee Table */}
        <Typography variant="h6" gutterBottom>Employee List</Typography>
        {loading && employees.length === 0 ? (
          <Typography>Loading employees...</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Mail ID</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Monthly Basic Salary</TableCell>
                <TableCell>Monthly Allowance</TableCell>
                <TableCell>Total Monthly Salary</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map(emp => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.employee_id}</TableCell>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>{emp.designation}</TableCell>
                  <TableCell>{emp.monthly_basic.toFixed(2)}</TableCell>
                  <TableCell>{emp.monthly_allowance.toFixed(2)}</TableCell>
                  <TableCell>
                    {(emp.monthly_basic + emp.monthly_allowance).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>

      {/* Error/Success notifications */}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      
      <Snackbar open={!!success} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ProfilePage;