import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography
} from '@mui/material';

const dummyEmployees = [
  {
    emp_id: 'EMP001',
    name: 'Suraj Sannuli',
    gender: 'Male',
    dob: '1995-08-15',
    email: 'suraj@example.com',
    department: 'IT',
    designation: 'Software Engineer',
    joining_date: '2022-04-10',
    monthly_basic: 30000,
    monthly_allowance: 8000
  },
  {
    emp_id: 'EMP002',
    name: 'Priya Sharma',
    gender: 'Female',
    dob: '1992-12-05',
    email: 'priya@example.com',
    department: 'HR',
    designation: 'HR Manager',
    joining_date: '2021-07-01',
    monthly_basic: 40000,
    monthly_allowance: 10000
  },
  {
    emp_id: 'EMP003',
    name: 'Ravi Kumar',
    gender: 'Male',
    dob: '1990-03-22',
    email: 'ravi@example.com',
    department: 'Finance',
    designation: 'Accountant',
    joining_date: '2020-01-15',
    monthly_basic: 28000,
    monthly_allowance: 5000
  }
];

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // No API call, using dummy data instead
    setEmployees(dummyEmployees);
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
