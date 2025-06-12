import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, TextField, Button, Select, MenuItem, InputLabel,
  FormControl
} from '@mui/material';
import { Search, Print, Download } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const dummyEmployees = [
  {
    id: 1,
    name: 'Suraj Sannuli',
    department: 'IT',
    designation: 'Software Engineer',
    basicSalary: 30000,
    allowances: 8000,
    deductions: 2000
  },
  {
    id: 2,
    name: 'Priya Sharma',
    department: 'HR',
    designation: 'HR Manager',
    basicSalary: 40000,
    allowances: 10000,
    deductions: 3000
  },
  {
    id: 3,
    name: 'Ravi Kumar',
    department: 'Finance',
    designation: 'Accountant',
    basicSalary: 28000,
    allowances: 5000,
    deductions: 1800
  }
];

const dummyUnpaidLeaves = [
  { employeeId: 1, month: 6, year: 2025, days: 2 },
  { employeeId: 2, month: 6, year: 2025, days: 0 },
  { employeeId: 3, month: 6, year: 2025, days: 1 }
];

function PayrollPage() {
  const [employees, setEmployees] = useState([]);
  const [payrollData, setPayrollData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(6); // June
  const [selectedYear, setSelectedYear] = useState(2025);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const navigate = useNavigate();

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  // Load dummy data
  const fetchData = () => {
    const employeesWithLeaves = dummyEmployees.map(emp => {
      const leave = dummyUnpaidLeaves.find(
        l => l.employeeId === emp.id && l.month === selectedMonth && l.year === selectedYear
      );
      return {
        ...emp,
        unpaidLeaves: leave ? leave.days : 0
      };
    });

    setEmployees(employeesWithLeaves);
  };

  const calculatePayroll = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);

    const calculated = employees.map(emp => {
      const dailyRate = (emp.basicSalary + emp.allowances) / daysInMonth;
      const unpaidDeduction = dailyRate * emp.unpaidLeaves;
      const grossSalary = emp.basicSalary + emp.allowances;
      const netSalary = grossSalary - emp.deductions - unpaidDeduction;

      return {
        ...emp,
        dailyRate,
        unpaidDeduction,
        grossSalary,
        netSalary,
        month: selectedMonth,
        year: selectedYear
      };
    });

    setPayrollData(calculated);
  };

  const filteredPayrollData = payrollData.filter(emp => {
    const matchSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = selectedDepartment === '' || emp.department === selectedDepartment;
    return matchSearch && matchDept;
  });

  const departments = [...new Set(employees.map(emp => emp.department))];

  const totals = {
    basicSalary: payrollData.reduce((sum, e) => sum + e.basicSalary, 0),
    allowances: payrollData.reduce((sum, e) => sum + e.allowances, 0),
    deductions: payrollData.reduce((sum, e) => sum + e.deductions, 0),
    unpaidDeduction: payrollData.reduce((sum, e) => sum + (e.unpaidDeduction || 0), 0),
    grossSalary: payrollData.reduce((sum, e) => sum + e.grossSalary, 0),
    netSalary: payrollData.reduce((sum, e) => sum + e.netSalary, 0)
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (employees.length > 0) {
      calculatePayroll();
    }
  }, [employees, selectedMonth, selectedYear]);

  return (
    <Box display="flex">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '60px',marginLeft:'-250px' }}>
        <Typography variant="h4" gutterBottom>
          Payroll - {new Date(selectedYear, selectedMonth - 1).toLocaleString('default', { month: 'long' })} {selectedYear}
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap',  }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Month</InputLabel>
              <Select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                label="Month"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Year</InputLabel>
              <Select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                label="Year"
              >
                {[2023, 2024, 2025, 2026, 2027].map(year => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Department</InputLabel>
              <Select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                label="Department"
              >
                <MenuItem value="">All</MenuItem>
                {departments.map((dept, i) => (
                  <MenuItem key={i} value={dept}>{dept}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Search Employee"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{ endAdornment: <Search /> }}
            />

            <Box sx={{ flexGrow: 1 }} />

            <Button variant="contained" startIcon={<Print />} onClick={() => window.print()}>
              Print
            </Button>
            <Button variant="contained" color="success" startIcon={<Download />}>
              Export
            </Button>
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell align="right">Basic</TableCell>
                <TableCell align="right">Allowances</TableCell>
                <TableCell align="right">Unpaid Days</TableCell>
                <TableCell align="right">Unpaid Deduction</TableCell>
                <TableCell align="right">Deductions</TableCell>
                <TableCell align="right">Gross</TableCell>
                <TableCell align="right">Net</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPayrollData.map(emp => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>{emp.designation}</TableCell>
                  <TableCell align="right">₹{emp.basicSalary.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{emp.allowances.toLocaleString()}</TableCell>
                  <TableCell align="right">{emp.unpaidLeaves}</TableCell>
                  <TableCell align="right">₹{emp.unpaidDeduction.toFixed(2)}</TableCell>
                  <TableCell align="right">₹{emp.deductions.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{emp.grossSalary.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{emp.netSalary.toLocaleString()}</TableCell>
                </TableRow>
              ))}

              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell colSpan={3} align="right"><strong>Totals:</strong></TableCell>
                <TableCell align="right"><strong>₹{totals.basicSalary.toLocaleString()}</strong></TableCell>
                <TableCell align="right"><strong>₹{totals.allowances.toLocaleString()}</strong></TableCell>
                <TableCell />
                <TableCell align="right"><strong>₹{totals.unpaidDeduction.toLocaleString()}</strong></TableCell>
                <TableCell align="right"><strong>₹{totals.deductions.toLocaleString()}</strong></TableCell>
                <TableCell align="right"><strong>₹{totals.grossSalary.toLocaleString()}</strong></TableCell>
                <TableCell align="right"><strong>₹{totals.netSalary.toLocaleString()}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
}

export default PayrollPage;
