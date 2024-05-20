// main.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from "./context/AuthContext";


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* AuthProvider omsluter App */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);