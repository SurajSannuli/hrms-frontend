import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/EssLoginPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfile from "./pages/EditProfile";
import ApplyLeave from "./pages/Applyleave";
import LeaveHistory from "./pages/Leavehistory";
import EmployeeList from "./pages/EmployeeList";
import HomePage from "./pages/HomePage";
import EssDashboard from "./pages/EssDashboard";
import AdminLoginPage from "./pages/AdminLoginPage";
import ApprovalPage from "./pages/ApprovalPage";
import PayrollPage from "./pages/PayrollPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const Layout = ({ children }) => (
  <div style={{ display: "flex" }}>
    <Sidebar />
    <div style={{ flexGrow: 1, padding: 20 }}>{children}</div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/ess" element={<LoginPage />} />
        <Route path="/" element={<AdminLoginPage />} />

        {/* ESS + Admin Shared Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout>
                <ProfilePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/editprofile"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout>
                <EditProfile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/leave/applyleave"
          element={
            <ProtectedRoute allowedRoles={["ess", "admin"]}>
              <Layout>
                <ApplyLeave />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/leave/leavehistory"
          element={
            <ProtectedRoute allowedRoles={["ess", "admin"]}>
              <Layout>
                <LeaveHistory />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ESS Dashboard */}
        <Route
          path="/EssDashboard"
          element={
            <ProtectedRoute allowedRoles={["ess"]}>
              <Layout>
                <EssDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout>
                <HomePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/employeelist"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout>
                <EmployeeList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/leave/approvals"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout>
                <ApprovalPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payroll"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout>
                <PayrollPage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
