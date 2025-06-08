import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Paper, Typography, Box, Table, TableHead,
  TableRow, TableCell, TableBody, Chip, MenuItem, Select, InputLabel, 
  FormControl, TableContainer
} from '@mui/material';
import Sidebar from '../components/Sidebar';

function LeavePage() {
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({ 
    employee: '', 
    leaveType: '',
    start_date: '', 
    end_date: '', 
    reason: '', 
    days: 0 
  });
  
  // Mock data - in a real app, this would come from your backend or state management
  const [leaveTypes, setLeaveTypes] = useState([
    'Annual Leave',
    'Sick Leave',
    'Maternity Leave',
    'Paternity Leave',
    'Unpaid Leave'
  ]);
  
  const employees = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Robert Johnson' },
    { id: '4', name: 'Emily Davis' },
  ];

  // In a real app, you would fetch leave types from your API or state management
  useEffect(() => {
    // This is where you would fetch leave types from your backend
    // For example:
    // fetchLeaveTypes().then(data => setLeaveTypes(data));
  }, []);

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
    updatedForm.days = calculateWorkingDays(updatedForm.start_date, updatedForm.end_date);
    setForm(updatedForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const applyLeave = () => {
    if (!form.employee || !form.start_date || !form.end_date || !form.leaveType) {
      alert('Please fill all required fields');
      return;
    }
    
    const selectedEmployee = employees.find(emp => emp.id === form.employee);
    const newLeave = {
      id: Date.now(),
      ...form,
      employee_name: selectedEmployee?.name || '',
      status: 'Pending',
      leaveType: form.leaveType
    };
    
    setLeaves([...leaves, newLeave]);
    setForm({ 
      employee: '', 
      leaveType: '',
      start_date: '', 
      end_date: '', 
      reason: '', 
      days: 0 
    });
  };

  return (
    <Box display="flex" sx={{ height: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 30, overflow: 'auto', marginTop: '-230px' }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>Leave Management</Typography>

        {/* Application Form */}
        <Paper elevation={3} sx={{ p: 3, mb: 4, maxWidth: 600 }}>
          <Typography variant="h6" mb={2}>Apply for Leave</Typography>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Employee</InputLabel>
            <Select
              name="employee"
              value={form.employee}
              onChange={handleChange}
              label="Employee"
              required
            >
              {employees.map(emp => (
                <MenuItem key={emp.id} value={emp.id}>{emp.name}</MenuItem>
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
                <MenuItem key={index} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
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
          
          <Button variant="contained" onClick={applyLeave}>Apply</Button>
        </Paper>

        {/* Compact Leave History */}
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>Leave History</Typography>
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: '15%' }}>Employee</TableCell>
                  <TableCell sx={{ width: '15%' }}>Leave Type</TableCell>
                  <TableCell sx={{ width: '12%' }}>Start Date</TableCell>
                  <TableCell sx={{ width: '12%' }}>End Date</TableCell>
                  <TableCell sx={{ width: '10%' }}>Days</TableCell>
                  <TableCell sx={{ width: '20%' }}>Reason</TableCell>
                  <TableCell sx={{ width: '10%' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaves.map(leave => (
                  <TableRow key={leave.id} hover>
                    <TableCell>{leave.employee_name}</TableCell>
                    <TableCell>{leave.leaveType}</TableCell>
                    <TableCell>{leave.start_date}</TableCell>
                    <TableCell>{leave.end_date}</TableCell>
                    <TableCell>{leave.days}</TableCell>
                    <TableCell sx={{ 
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: 150
                    }}>
                      {leave.reason}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={leave.status} 
                        color={
                          leave.status === 'Approved' ? 'success' : 
                          leave.status === 'Rejected' ? 'error' : 'warning'
                        } 
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
}

export default LeavePage;