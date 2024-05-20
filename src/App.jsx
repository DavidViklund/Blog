import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import PostList from "./components/PostList";
import { BlogProvider } from "./context/BlogContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import LoginComponent from './components/LoginComponent';

const App = () => { 
  const { userLoggedIn, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>
      <BlogProvider>
        <Router>
          <Navbar />
          <div className="AppWrapper">
            <div className="AppContent">
              <Routes>
                {!userLoggedIn && <Route path="/login" element={<LoginComponent />} />}
                {userLoggedIn && <Route path="/" element={<PostList />} />}
              </Routes>
            </div>
          </div>
        </Router>
      </BlogProvider>
    </AuthProvider>
  );
};

export default App;
