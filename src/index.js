import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// ✅ Define a custom theme
const theme = createTheme({
  palette: {
    mode: 'light', // you can also set to 'dark' if needed
    primary: {
      main: '#1976d2', // Material Blue
    },
    background: {
      default: '#f4f6f8', // Light gray background
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* ✅ Applies baseline CSS reset and background */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
