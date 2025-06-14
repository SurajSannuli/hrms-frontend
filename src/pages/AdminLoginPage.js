import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { endpoint } from "../constants";

function AdminLoginPage() {
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
        localStorage.setItem("role", "admin");
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch {
      alert("Login failed. Check credentials.");
    }
  };

  const isESS = location.pathname === "/ess";
  const togglePath = isESS ? "/" : "/ess";
  const toggleLabel = isESS ? "Access HR Login" : "Access Self Service (ESS)";

  return (
    <div className="card login-card">
      <h2>{isESS ? "ESS Login" : "HRMS Login"}</h2>
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

export default AdminLoginPage;
