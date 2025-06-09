import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Applyleave from './pages/Applyleave';
import Leavehistory from './pages/Leavehistory';
import HomePage from './pages/HomePage';
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
        <Route
          path="/profile"
          element={
            <Layout>
              <ProfilePage />
            </Layout>
          }
        />
        <Route
          path="leave/applyleave"
          element={
            <Layout>
              <Applyleave />
            </Layout>
          }
        />
        <Route
          path="leave/leavehistory"
          element={
            <Layout>
              <Leavehistory />
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