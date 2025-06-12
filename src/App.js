import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import EditProfile from './pages/EditProfile';
import ApplyLeave from './pages/ApplyLeave';
import LeaveHistory from './pages/LeaveHistory';
import EmployeeList from './pages/EmployeeList';
import HomePage from './pages/HomePage';
import EssDashboard from './pages/EssDashboard';
import EssLogin from './pages/EssLogin';
import ApprovalPage from './pages/ApprovalPage';
import PayrollPage from './pages/PayrollPage'; // Note: Component names should be PascalCase
import './App.css';

const Layout = ({ children }) => (
  <div style={{ display: 'flex' }}>
    <Sidebar />
    <div style={{ flexGrow: 1, padding: 20 }}>{children}</div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/ess" element={<EssLogin />} />

        <Route
          path="/profile"
          element={
            <Layout>
              <ProfilePage />
            </Layout>
          }
        />
        <Route
          path="/leave/approvals"
          element={
            <Layout>
              <ApprovalPage />
            </Layout>
          }
        />
        <Route
          path="/profile/employeelist"
          element={
            <Layout>
              <EmployeeList />
            </Layout>
          }
        />
        <Route
          path="/profile/editprofile"
          element={
            <Layout>
              <EditProfile />
            </Layout>
          }
        />
        <Route
          path="leave/applyleave"
          element={
            <Layout>
              <ApplyLeave />
            </Layout>
          }
        />
        <Route
          path="leave/leavehistory"
          element={
            <Layout>
              <LeaveHistory />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/EssDashboard"
          element={
            <Layout>
              <EssDashboard />
            </Layout>
          }
        />
        <Route
          path="/Payroll"
          element={
            <Layout>
              <PayrollPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;