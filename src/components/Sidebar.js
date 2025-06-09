import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Collapse,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [employeeOpen, setEmployeeOpen] = useState(false);

  // Automatically expand sections based on current route
  useEffect(() => {
    setEmployeeOpen(location.pathname.startsWith('/profile') || location.pathname.startsWith('/employee'));
    setLeaveOpen(location.pathname.startsWith('/leave'));
  }, [location.pathname]);

  const handleLeaveClick = () => {
    setLeaveOpen(!leaveOpen);
  };

  const handleEmployeeClick = () => {
    setEmployeeOpen(!employeeOpen);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f9f9f9',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem button onClick={() => navigate('/dashboard')}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        
          <ListItem button onClick={handleEmployeeClick}>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Employee Profile" />
            {employeeOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={employeeOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigate('/profile')}>
                <ListItemIcon><PersonAddIcon /></ListItemIcon>
                <ListItemText primary="Add Employee" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigate('/profile/editprofile')}>
                <ListItemIcon><EditIcon /></ListItemIcon>
                <ListItemText primary="Edit Employee" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigate('/profile/employeelist')}>
                <ListItemIcon><ListAltIcon /></ListItemIcon>
                <ListItemText primary="Employee List" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={handleLeaveClick}>
            <ListItemIcon><EventIcon /></ListItemIcon>
            <ListItemText primary="Leave Management" />
            {leaveOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={leaveOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigate('/leave/applyleave')}>
                <ListItemText primary="Apply Leave" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigate('/leave/leavehistory')}>
                <ListItemText primary="Leave History" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigate('/leave/approvals')}>
                <ListItemText primary="Pending for Approvals" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={() => navigate('/payroll')}>
            <ListItemIcon><PaymentIcon /></ListItemIcon>
            <ListItemText primary="Payroll" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;