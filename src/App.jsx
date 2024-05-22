// App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import PostList from "./components/PostList";
import { BlogProvider } from "./context/BlogContext";
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import HomePage from './pages/HomePage';
import AddPost from './pages/AddPost'; // Glöm inte att importera AddPost


const App = () => { 
  return (
    <BlogProvider>
        <BrowserRouter>
          <Navbar />  
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/add-posts" element={<AddPost />} /> {/* Lägg till Route för AddPost */}
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
          </Routes>
          <div className="AppWrapper">
            <div className="AppContent">
              {/* Rutter som inte är privata */}
            </div>
          </div>
        </BrowserRouter>
    </BlogProvider>
  );
};

export default App;
