import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Search, Print, Download } from "@mui/icons-material";
import Sidebar from "../components/Sidebar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { endpoint } from "../constants";

function PayrollPage() {
  const [employees, setEmployees] = useState([]);
  const [payrollData, setPayrollData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(6);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${endpoint}/payroll?month=${selectedMonth}&year=${selectedYear}`
      );
      const json = await res.json();
      const data = json.payroll || [];

      const employeesWithLeaves = data.map((emp) => ({
        ...emp,
        unpaidLeaves: parseFloat(emp.unpaidLeaves) || 0,
      }));

      setEmployees(employeesWithLeaves);
    } catch (error) {
      console.error("Failed to fetch payroll data:", error);
    }
  };

  const calculatePayroll = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);

    const calculated = employees.map((emp) => {
      const basic = parseFloat(emp.basicSalary) || 0;
      const allowances = parseFloat(emp.allowances) || 0;
      const deductions = parseFloat(emp.deductions) || 0;
      const unpaidLeaves = parseFloat(emp.unpaidLeaves) || 0;

      const totalSalary = basic + allowances;
      const dailyRate = totalSalary / daysInMonth;
      const unpaidDeduction = dailyRate * unpaidLeaves;
      const grossSalary = totalSalary;
      const netSalary = grossSalary - deductions - unpaidDeduction;

      return {
        ...emp,
        basicSalary: basic,
        allowances,
        deductions,
        unpaidLeaves,
        dailyRate,
        unpaidDeduction,
        grossSalary,
        netSalary,
        month: selectedMonth,
        year: selectedYear,
      };
    });

    console.log("Calculated Payroll:", calculated);
    setPayrollData(calculated);
  };

  const handleExport = () => {
    const exportData = filteredPayrollData.map((emp) => ({
      Employee: emp.name,
      Department: emp.department,
      Designation: emp.designation,
      "Basic Salary": emp.basicSalary,
      Allowances: emp.allowances,
      "Unpaid Days": emp.unpaidLeaves,
      "Unpaid Deduction": emp.unpaidDeduction.toFixed(2),
      Deductions: emp.deductions,
      "Gross Salary": emp.grossSalary,
      "Net Salary": emp.netSalary,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payroll");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, `Payroll_${selectedMonth}_${selectedYear}.xlsx`);
  };

  const handleCreatePayroll = () => {
    localStorage.setItem(
      `payroll_${selectedMonth}_${selectedYear}`,
      JSON.stringify(payrollData)
    );
    alert("Payroll Created Successfully");
  };

  const filteredPayrollData = payrollData.filter((emp) => {
    const matchSearch = emp.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchDept =
      selectedDepartment === "" || emp.department === selectedDepartment;
    return matchSearch && matchDept;
  });

  const departments = [...new Set(employees.map((emp) => emp.department))];

  const totals = {
    basicSalary: payrollData.reduce((sum, e) => sum + (e.basicSalary || 0), 0),
    allowances: payrollData.reduce((sum, e) => sum + (e.allowances || 0), 0),
    deductions: payrollData.reduce((sum, e) => sum + (e.deductions || 0), 0),
    unpaidDeduction: payrollData.reduce(
      (sum, e) => sum + (e.unpaidDeduction || 0),
      0
    ),
    grossSalary: payrollData.reduce((sum, e) => sum + (e.grossSalary || 0), 0),
    netSalary: payrollData.reduce((sum, e) => sum + (e.netSalary || 0), 0),
  };

  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    if (employees.length > 0) {
      calculatePayroll();
    }
  }, [employees]);

  return (
    <Box display="flex">
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginTop: "60px", marginLeft: "-250px" }}
      >
        <Typography variant="h4" gutterBottom>
          Payroll -{" "}
          {new Date(selectedYear, selectedMonth - 1).toLocaleString("default", {
            month: "long",
          })}{" "}
          {selectedYear}
        </Typography>

        {/* Controls */}
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Month</InputLabel>
              <Select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                label="Month"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("default", {
                      month: "long",
                    })}
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
                {[2023, 2024, 2025, 2026, 2027].map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
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
                <MenuItem value="">All</MenuItem>
                {departments.map((dept, i) => (
                  <MenuItem key={i} value={dept}>
                    {dept}
                  </MenuItem>
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
            <Button variant="contained" startIcon={<Print />}>
              Print
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<Download />}
              onClick={handleExport}
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
                <TableCell align="right">Basic</TableCell>
                <TableCell align="right">Allowances</TableCell>
                <TableCell align="right">Unpaid Days</TableCell>
                <TableCell align="right">Unpaid Deduction</TableCell>
                <TableCell align="right">Gross</TableCell>
                <TableCell align="right">Net</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPayrollData.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>{emp.designation}</TableCell>
                  <TableCell align="right">
                    ₹{(emp.basicSalary || 0).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    ₹{(emp.allowances || 0).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">{emp.unpaidLeaves}</TableCell>
                  <TableCell align="right">
                    ₹{(emp.unpaidDeduction || 0).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    ₹{(emp.grossSalary || 0).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    ₹{(emp.netSalary || 0).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell colSpan={3} align="right">
                  <strong>Totals:</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>₹{totals.basicSalary.toLocaleString()}</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>₹{totals.allowances.toLocaleString()}</strong>
                </TableCell>
                <TableCell />
                <TableCell align="right">
                  <strong>₹{totals.unpaidDeduction.toLocaleString()}</strong>
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
