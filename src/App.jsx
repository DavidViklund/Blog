import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import HomePage from './pages/HomePage';
import AddPost from './pages/AddPost';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import { AuthProvider } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';

const App = () => {
  return (
    <AuthProvider>
      <BlogProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
          </Routes>
        </Router>
      </BlogProvider>
    </AuthProvider>
  );
};

export default App;
