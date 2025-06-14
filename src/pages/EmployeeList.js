import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { endpoint } from "../constants";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get(`${endpoint}/get-employees`)
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch employee data:", err);
      });
  }, []);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Typography variant="h5" sx={{ p: 2 }}>
        Employee List
      </Typography>
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
            <TableCell>Basic Salary</TableCell>
            <TableCell>Allowance</TableCell>
            <TableCell>Total Salary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.employee_id}>
              <TableCell>{emp.employee_id}</TableCell>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.gender}</TableCell>
              <TableCell>{new Date(emp.dob).toLocaleDateString()}</TableCell>
              <TableCell>{emp.mail}</TableCell>
              <TableCell>{emp.department}</TableCell>
              <TableCell>{emp.designation}</TableCell>
              <TableCell>
                {new Date(emp.joining_date).toLocaleDateString()}
              </TableCell>
              <TableCell>₹{emp.basic_salary}</TableCell>
              <TableCell>₹{emp.allowance}</TableCell>
              <TableCell>₹{emp.total_salary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeList;
