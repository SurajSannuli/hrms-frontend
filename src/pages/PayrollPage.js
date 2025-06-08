import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, TextField, Button, Select, MenuItem, InputLabel,
  FormControl
} from '@mui/material';
import { Search, Print, Download } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

// Function to fetch employee data from profile API
const fetchEmployeeData = async () => {
  try {
    const response = await fetch('/profile');
    if (!response.ok) throw new Error('Failed to fetch employee data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching employee data:', error);
    return [];
  }
};

// Function to fetch unpaid leaves from leave API
const fetchUnpaidLeaves = async (month, year) => {
  try {
    const response = await fetch(`/leave?month=${month}&year=${year}`);
    if (!response.ok) throw new Error('Failed to fetch leave data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching leave data:', error);
    return [];
  }
};

function PayrollPage() {
  const [employees, setEmployees] = useState([]);
  const [payrollData, setPayrollData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const navigate = useNavigate();

  // Helper function to get days in month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  // Fetch data from APIs
  const fetchData = async () => {
    const employeeData = await fetchEmployeeData();
    const unpaidLeaves = await fetchUnpaidLeaves(selectedMonth, selectedYear);
    
    // Merge employee data with their unpaid leaves
    const employeesWithLeaves = employeeData.map(employee => {
      const employeeLeaves = unpaidLeaves.filter(leave => leave.employeeId === employee.id);
      return {
        ...employee,
        unpaidLeaves: employeeLeaves
      };
    });
    
    setEmployees(employeesWithLeaves);
  };

  // Calculate payroll with unpaid leave deductions
  const calculatePayroll = () => {
    const calculatedPayroll = employees.map(employee => {
      const basic = employee.basicSalary;
      const allowances = employee.allowances;
      const deductions = employee.deductions;
      const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
      const dailyRate = (basic + allowances) / daysInMonth;
      
      // Calculate total unpaid days for this employee in selected month
      const unpaidDays = employee.unpaidLeaves?.reduce((total, leave) => {
        return total + leave.days;
      }, 0) || 0;
      
      const unpaidDeduction = dailyRate * unpaidDays;
      const grossSalary = basic + allowances;
      const netSalary = grossSalary - deductions - unpaidDeduction;

      return {
        ...employee,
        basicSalary: basic,
        allowances: allowances,
        deductions: deductions,
        unpaidLeaves: unpaidDays,
        unpaidDeduction: unpaidDeduction,
        grossSalary: grossSalary,
        netSalary: netSalary,
        month: selectedMonth,
        year: selectedYear,
        dailyRate: dailyRate
      };
    });

    setPayrollData(calculatedPayroll);
  };

  // Filter employees based on search and department
  const filteredPayrollData = payrollData.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === '' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  // Get unique departments for filter
  const departments = [...new Set(employees.map(emp => emp.department))];

  // Calculate totals
  const totals = {
    basicSalary: payrollData.reduce((sum, emp) => sum + emp.basicSalary, 0),
    allowances: payrollData.reduce((sum, emp) => sum + emp.allowances, 0),
    unpaidDeduction: payrollData.reduce((sum, emp) => sum + (emp.unpaidDeduction || 0), 0),
    deductions: payrollData.reduce((sum, emp) => sum + emp.deductions, 0),
    grossSalary: payrollData.reduce((sum, emp) => sum + emp.grossSalary, 0),
    netSalary: payrollData.reduce((sum, emp) => sum + emp.netSalary, 0)
  };

  // Fetch data on initial load
  useEffect(() => {
    fetchData();
  }, []);

  // Calculate payroll when data, month or year changes
  useEffect(() => {
    if (employees.length > 0) {
      calculatePayroll();
    }
  }, [employees, selectedMonth, selectedYear]);

  return (
    <Box display="flex">
      <Sidebar />
      
      <Box component="main" sx={{ flexGrow: 1, p: 30, marginTop: '60px',marginTop: '-230px' }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Payroll Calculation - {new Date(selectedYear, selectedMonth - 1).toLocaleString('default', { month: 'long' })} {selectedYear}
        </Typography>

        {/* Filters and Controls */}
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
                {Array.from({ length: 5 }, (_, i) => (
                  <MenuItem key={i} value={new Date().getFullYear() - 2 + i}>
                    {new Date().getFullYear() - 2 + i}
                  </MenuItem>
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
                <MenuItem value="">All Departments</MenuItem>
                {departments.map((dept, index) => (
                  <MenuItem key={index} value={dept}>{dept}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Search Employee"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: <Search />
              }}
            />

            <Box sx={{ flexGrow: 1 }} />

            <Button 
              variant="contained" 
              startIcon={<Print />} 
              sx={{ ml: 'auto' }}
              onClick={() => window.print()}
            >
              Print
            </Button>
            <Button 
              variant="contained" 
              startIcon={<Download />} 
              color="success"
              onClick={() => {
                // Implement export functionality here
                console.log('Export payroll data');
              }}
            >
              Export
            </Button>
          </Box>
        </Paper>

        {/* Payroll Table */}
        <Paper elevation={3} sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell align="right">Basic Salary</TableCell>
                <TableCell align="right">Allowances</TableCell>
                <TableCell align="right">Unpaid Days</TableCell>
                <TableCell align="right">Unpaid Deduction</TableCell>
                <TableCell align="right">Deductions</TableCell>
                <TableCell align="right">Gross Salary</TableCell>
                <TableCell align="right">Net Salary</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPayrollData.map((employee) => (
                <TableRow key={employee.id} hover>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.designation}</TableCell>
                  <TableCell align="right">₹{employee.basicSalary.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{employee.allowances.toLocaleString()}</TableCell>
                  <TableCell align="right">{employee.unpaidLeaves}</TableCell>
                  <TableCell align="right">₹{employee.unpaidDeduction?.toFixed(2)}</TableCell>
                  <TableCell align="right">₹{employee.deductions.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{employee.grossSalary.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{employee.netSalary.toLocaleString()}</TableCell>
                </TableRow>
              ))}

              {/* Totals Row */}
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell colSpan={3} align="right">
                  <strong>Totals:</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>₹{totals.basicSalary.toLocaleString()}</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>₹{totals.allowances.toLocaleString()}</strong>
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">
                  <strong>₹{totals.unpaidDeduction.toLocaleString()}</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>₹{totals.deductions.toLocaleString()}</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>₹{totals.grossSalary.toLocaleString()}</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>₹{totals.netSalary.toLocaleString()}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
}

export default PayrollPage;