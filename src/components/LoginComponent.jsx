import React, { useState, useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { signInUser } from '../firebase/authFunctions';
import '../index.css';

const LoginComponent = () => {
  const { userLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting login form...'); // <-- Lägg till detta loggningsuttryck
    console.log('Email:', email); // <-- Lägg till detta loggningsuttryck
    console.log('Password:', password); // <-- Lägg till detta loggningsuttryck
    if (!isSigningIn) {
      setIsSigningIn(true);
      await signInUser(email, password);
    }
  };

  return (
    <div>
      {userLoggedIn && <Navigate to={'/'} replace={true} />}

      <main className="login-main">
        <div className="login-container">
          <div className="login-text">
            <div className="login-title">
              <h3 className="login-heading">Welcome back</h3>
            </div>
          </div>
          <form onSubmit={onSubmit} className="login-form">
            <div className="login-input-group">
              <label>Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="login-input-group">
              <label>Password</label>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            {errorMessage && (
              <span className="login-error">{errorMessage}</span>
            )}

            <button
              type="submit"
              disabled={isSigningIn}
              className={`login-button ${
                isSigningIn ? 'disabled' : ''
              }`}
            >
              {isSigningIn ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <p className="login-signup">
            Don't have an account?{' '}
            <Link to={'/register'} className="login-signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginComponent;
