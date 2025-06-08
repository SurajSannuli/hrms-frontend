import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();

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
      <Toolbar /> {/* This creates top spacing if AppBar is present */}
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem button onClick={() => navigate('/home')}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => navigate('/Masters')}>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Masters" />
          </ListItem>
          <ListItem button onClick={() => navigate('/profile')}>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItem>
          <ListItem button onClick={() => navigate('/leave')}>
            <ListItemIcon><EventIcon /></ListItemIcon>
            <ListItemText primary="Leave Management" />
          </ListItem>
          <ListItem button onClick={() => navigate('/Payroll')}>
            <ListItemIcon><EventIcon /></ListItemIcon>
            <ListItemText primary="Payroll" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
