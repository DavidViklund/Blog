import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/NavBar';
import PostList from "./components/PostList";
import { BlogProvider } from "./context/BlogContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import LoginComponent from './components/LoginComponent';
import PrivateRoute from './components/PrivateRoute';

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
              {(!loading && !userLoggedIn) && <Navigate to="/login" />}
              <Routes>
                {/* Använd <Route> för offentliga rutter */}
                <Route path="/login" element={<LoginComponent />} />
                {/* Använd <PrivateRoute> för skyddade rutter */}
                <Route
                  path="/"
                  element={<PrivateRoute element={<PostList />} />}
                />
              </Routes>
            </div>
          </div>
        </Router>
      </BlogProvider>
    </AuthProvider>
  );
};

export default App;
