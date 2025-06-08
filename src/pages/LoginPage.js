
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import endpoint from '../API_URL';

function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${endpoint}/login`, { identifier, password });
      if (res.data.success) {
        navigate('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch {
      alert('Login failed. Check credentials.');
    }
  };

  return (
    <div className="card login-card">
      <h2>HRMS Login</h2>
      <input
        type="text"
        placeholder="Email or Employee ID"
        value={identifier}
        onChange={e => setIdentifier(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;