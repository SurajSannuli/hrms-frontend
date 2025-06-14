import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { endpoint } from "../constants";

function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${endpoint}/login`, {
        identifier,
        password,
      });
      if (res.data.success) {
        localStorage.setItem("role", "ess");
        navigate("/EssDashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch {
      alert("Login failed. Check credentials.");
    }
  };

  // Determine alternate link based on current path
  const isAdmin = location.pathname === "/admin";
  const togglePath = isAdmin ? "/" : "/admin";
  const toggleLabel = isAdmin ? "Access Self Service (ESS)" : "Access HR Login";

  return (
    <div className="card login-card">
      <h2>{isAdmin ? "HRMS Login" : "ESS Login"}</h2>
      <input
        type="text"
        placeholder="Email or Employee ID"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      <div style={{ marginTop: "10px" }}>
        <button
          style={{
            background: "none",
            color: "#007bff",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => navigate(togglePath)}
        >
          {toggleLabel}
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
