import React from 'react';
import { AuthProvider } from '../firebase/AuthContext'; // Antag att AuthContext.js ligger i mappen firebase

import App from './App';

const Root = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default Root;