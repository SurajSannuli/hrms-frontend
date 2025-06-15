import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Collapse,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Event as EventIcon,
  Payment as PaymentIcon,
  PersonAdd as PersonAddIcon,
  Edit as EditIcon,
  ListAlt as ListAltIcon,
  ExpandLess,
  ExpandMore,
  Logout as LogoutIcon,
  Assignment as AssignmentIcon,
  History as HistoryIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [employeeOpen, setEmployeeOpen] = useState(false);

  const role = localStorage.getItem("role");

  useEffect(() => {
    setEmployeeOpen(
      location.pathname.startsWith("/profile") ||
        location.pathname.startsWith("/employee")
    );
    setLeaveOpen(location.pathname.startsWith("/leave"));
  }, [location.pathname]);

  const handleLeaveClick = () => setLeaveOpen(!leaveOpen);
  const handleEmployeeClick = () => setEmployeeOpen(!employeeOpen);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
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
          boxSizing: "border-box",
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <List sx={{ flexGrow: 1 }}>
          <ListItem
            button
            onClick={() =>
              role === "ess"
                ? navigate("/EssDashboard")
                : navigate("/dashboard")
            }
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          {role === "admin" && (
            <>
              <ListItem button onClick={handleEmployeeClick}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Employee Profile" />
                {employeeOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={employeeOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    sx={{ pl: 4 }}
                    onClick={() => navigate("/profile")}
                  >
                    <ListItemIcon>
                      <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Employee" />
                  </ListItem>
                  <ListItem
                    button
                    sx={{ pl: 4 }}
                    onClick={() => navigate("/profile/editprofile")}
                  >
                    <ListItemIcon>
                      <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary="Edit Employee" />
                  </ListItem>
                  <ListItem
                    button
                    sx={{ pl: 4 }}
                    onClick={() => navigate("/profile/employeelist")}
                  >
                    <ListItemIcon>
                      <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Employee List" />
                  </ListItem>
                </List>
              </Collapse>
            </>
          )}

          <ListItem button onClick={handleLeaveClick}>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Leave Management" />
            {leaveOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={leaveOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => navigate("/leave/applyleave")}
              >
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Apply Leave" />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => navigate("/leave/leavehistory")}
              >
                <ListItemIcon>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary="Leave History" />
              </ListItem>
              {role === "admin" && (
                <ListItem
                  button
                  sx={{ pl: 4 }}
                  onClick={() => navigate("/leave/approvals")}
                >
                  <ListItemIcon>
                    <CheckCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Pending for Approvals" />
                </ListItem>
              )}
            </List>
          </Collapse>

          {role === "admin" && (
            <ListItem button onClick={() => navigate("/payroll")}>
              <ListItemIcon>
                <PaymentIcon />
              </ListItemIcon>
              <ListItemText primary="Payroll" />
            </ListItem>
          )}
        </List>

        {/* Logout Button at the Bottom */}
        <List>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
