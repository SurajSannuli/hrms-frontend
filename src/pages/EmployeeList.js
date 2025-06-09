import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography
} from '@mui/material';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Typography variant="h5" sx={{ p: 2 }}>Employee List</Typography>
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
          {employees.map(emp => (
            <TableRow key={emp.emp_id}>
              <TableCell>{emp.emp_id}</TableCell>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.gender}</TableCell>
              <TableCell>{emp.dob}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.department}</TableCell>
              <TableCell>{emp.designation}</TableCell>
              <TableCell>{emp.joining_date}</TableCell>
              <TableCell>{emp.monthly_basic}</TableCell>
              <TableCell>{emp.monthly_allowance}</TableCell>
              <TableCell>{emp.monthly_basic + emp.monthly_allowance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeList;
