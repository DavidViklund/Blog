import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from "./context/AuthContext";
import { BlogProvider } from "./context/BlogContext"; 

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BlogProvider> 
        <App />
      </BlogProvider>
    </AuthProvider>
  </React.StrictMode>
);
