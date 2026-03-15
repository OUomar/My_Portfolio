// src/index.jsx ou src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import './index.css';
import './i18n';
ReactDOM.createRoot(document.getElementById('root')).render(
  
    <ThemeProvider>   {/* ← doit entourer App */}
      <App />
    </ThemeProvider>
  
);