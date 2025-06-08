import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import LeavePage from './pages/LeavePage';
import MasterPage from './pages/MasterPage';
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
          path="/leave"
          element={
            <Layout>
              <LeavePage />
            </Layout>
          }
        />
        <Route
          path="/home"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/masters"
          element={
            <Layout>
              <MasterPage />
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