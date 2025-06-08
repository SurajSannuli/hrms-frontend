import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Link,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import Sidebar from '../components/Sidebar';
import {
  fetchDepartments,
  addDepartment,
  fetchDesignations,
  addDesignation,
  fetchLeaveTypes,
  addLeaveType
} from '../services/api';

function MasterPage() {
  const [masterType, setMasterType] = useState('');
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState({});
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [newDept, setNewDept] = useState('');
  const [newDesig, setNewDesig] = useState('');
  const [newLeaveType, setNewLeaveType] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDeptId, setSelectedDeptId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Load initial data
  useEffect(() => {
    const loadDepartments = async () => {
      setLoading(true);
      try {
        const depts = await fetchDepartments();
        setDepartments(depts);
      } catch (err) {
        setError('Failed to load departments');
      } finally {
        setLoading(false);
      }
    };

    const loadLeaveTypes = async () => {
      try {
        const types = await fetchLeaveTypes();
        setLeaveTypes(types);
      } catch (err) {
        console.error('Failed to load leave types:', err);
      }
    };

    loadDepartments();
    loadLeaveTypes();
  }, []);

  // Load designations when department is selected
  useEffect(() => {
    if (selectedDeptId) {
      const loadDesignations = async () => {
        try {
          const desigs = await fetchDesignations(selectedDeptId);
          setDesignations(prev => ({
            ...prev,
            [selectedDeptId]: desigs
          }));
        } catch (err) {
          console.error('Failed to load designations:', err);
        }
      };
      loadDesignations();
    }
  }, [selectedDeptId]);

  const handleAddDepartment = async () => {
    if (!newDept) return;
    
    setLoading(true);
    try {
      const addedDept = await addDepartment(newDept);
      setDepartments([...departments, addedDept]);
      setNewDept('');
      setSuccess('Department added successfully');
    } catch (err) {
      setError(err.message || 'Failed to add department');
    } finally {
      setLoading(false);
    }
  };

  const handleAddDesignation = async () => {
    if (!newDesig || !selectedDeptId) return;
    
    setLoading(true);
    try {
      const addedDesig = await addDesignation(selectedDeptId, newDesig);
      setDesignations(prev => ({
        ...prev,
        [selectedDeptId]: [...(prev[selectedDeptId] || []), addedDesig]
      }));
      setNewDesig('');
      setSuccess('Designation added successfully');
    } catch (err) {
      setError(err.message || 'Failed to add designation');
    } finally {
      setLoading(false);
    }
  };

  const handleAddLeaveType = async () => {
    if (!newLeaveType) return;
    
    setLoading(true);
    try {
      const addedType = await addLeaveType(newLeaveType);
      setLeaveTypes([...leaveTypes, addedType]);
      setNewLeaveType('');
      setSuccess('Leave type added successfully');
    } catch (err) {
      setError(err.message || 'Failed to add leave type');
    } finally {
      setLoading(false);
    }
  };

  const handleDeptSelect = (deptName) => {
    setSelectedDept(deptName);
    const dept = departments.find(d => d.name === deptName);
    if (dept) {
      setSelectedDeptId(dept.id);
    }
  };

  const handleCloseAlert = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <Box display="flex">
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 30, marginTop: '-230px' }}>
        <Typography variant="h5" gutterBottom>
          Master Page – Departments, Designations & Leave Types
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          {/* Error/Success Alerts */}
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

          {/* Master Type Selection */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Master Name</InputLabel>
            <Select
              value={masterType}
              onChange={(e) => setMasterType(e.target.value)}
              label="Master Name"
            >
              <MenuItem value="Department">Department</MenuItem>
              <MenuItem value="Designation">Designation</MenuItem>
              <MenuItem value="LeaveType">Leave Type</MenuItem>
            </Select>
          </FormControl>

          {loading && (
            <Box display="flex" justifyContent="center" my={2}>
              <CircularProgress />
            </Box>
          )}

          {/* Add Department Section */}
          {masterType === 'Department' && (
            <>
              <Typography variant="h6" mb={2}>Add Department</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Department Name"
                    value={newDept}
                    onChange={e => setNewDept(e.target.value)}
                    fullWidth
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button 
                    variant="contained" 
                    onClick={handleAddDepartment} 
                    sx={{ height: '100%' }}
                    disabled={loading || !newDept}
                  >
                    Add Department
                  </Button>
                </Grid>
              </Grid>

              {/* Department List */}
              {departments.length > 0 && (
                <Box mt={2}>
                  <Typography variant="subtitle1">Departments:</Typography>
                  <List dense>
                    {departments.map((dept) => (
                      <ListItem key={dept.id}>
                        <ListItemText primary={dept.name} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </>
          )}

          {/* Add Designation Section */}
          {masterType === 'Designation' && (
            <>
              <Typography variant="h6" mb={2}>Add Designation</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Select Department</InputLabel>
                    <Select
                      value={selectedDept}
                      onChange={e => handleDeptSelect(e.target.value)}
                      label="Select Department"
                      disabled={loading}
                    >
                      {departments.map((dept) => (
                        <MenuItem key={dept.id} value={dept.name}>
                          {dept.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Designation"
                    value={newDesig}
                    onChange={e => setNewDesig(e.target.value)}
                    fullWidth
                    disabled={loading}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button 
                    variant="contained" 
                    onClick={handleAddDesignation}
                    disabled={loading || !newDesig || !selectedDept}
                  >
                    Add Designation
                  </Button>
                </Grid>
              </Grid>

              {/* Designation List */}
              {selectedDeptId && designations[selectedDeptId]?.length > 0 && (
                <Box mt={2}>
                  <Typography variant="subtitle1">Designations under {selectedDept}:</Typography>
                  <List dense>
                    {designations[selectedDeptId].map((dsg) => (
                      <ListItem key={dsg.id}>
                        <ListItemText primary={dsg.name} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </>
          )}

          {/* Add Leave Type Section */}
          {masterType === 'LeaveType' && (
            <>
              <Typography variant="h6" mb={2}>Add Leave Type</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Leave Type Name"
                    value={newLeaveType}
                    onChange={e => setNewLeaveType(e.target.value)}
                    fullWidth
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button 
                    variant="contained" 
                    onClick={handleAddLeaveType} 
                    sx={{ height: '100%' }}
                    disabled={loading || !newLeaveType}
                  >
                    Add Leave Type
                  </Button>
                </Grid>
              </Grid>

              {/* Leave Type List */}
              {leaveTypes.length > 0 && (
                <Box mt={2}>
                  <Typography variant="subtitle1">Leave Types:</Typography>
                  <List dense>
                    {leaveTypes.map((type) => (
                      <ListItem key={type.id}>
                        <ListItemText primary={type.name} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {/* Link to Leave Page */}
              <Box mt={4}>
                <Typography variant="h6" mb={2}>Manage Leave Applications</Typography>
                <Button 
                  variant="outlined" 
                  component={Link} 
                  href="/leave" 
                  sx={{ textDecoration: 'none' }}
                >
                  Go to Leave Management Page
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default MasterPage;