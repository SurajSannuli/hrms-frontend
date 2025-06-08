import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import { useNavigate } from 'react-router-dom'; // Import the hook

const Sidebar = () => {
  const navigate = useNavigate(); // Call the hook INSIDE the component body

  return (
    <Drawer variant="permanent" anchor="left">
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
    </Drawer>
  );
};

export default Sidebar;
