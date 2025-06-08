import React, { useState } from 'react';
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
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const [leaveOpen, setLeaveOpen] = useState(false);

  const handleLeaveClick = () => {
    setLeaveOpen(!leaveOpen);
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
          <ListItem button onClick={() => navigate('/home')}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button onClick={() => navigate('/profile')}>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItem>

          <ListItem button onClick={handleLeaveClick}>
            <ListItemIcon><EventIcon /></ListItemIcon>
            <ListItemText primary="Leave Management" />
            {leaveOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={leaveOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigate('leave/applyleave')}>
                <ListItemText primary="Apply Leave" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigate('leave/leavehistory')}>
                <ListItemText primary="Leave History" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigate('/leave/approvals')}>
                <ListItemText primary="Pending for Approvals" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={() => navigate('/payroll')}>
            <ListItemIcon><EventIcon /></ListItemIcon>
            <ListItemText primary="Payroll" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
