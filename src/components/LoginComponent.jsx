
import React, { useState, useContext, useCallback } from 'react';
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

  // Använd useCallback för att memoizera onSubmit-funktionen
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log('Submitting login form...');
      console.log('Email:', email);
      console.log('Password:', password);
      if (!isSigningIn) {
        setIsSigningIn(true);
        try {
          await signInUser(email, password);
        } catch (error) {
          setErrorMessage(error.message);
        } finally {
          setIsSigningIn(false);
        }
      }
    },
    [email, password, isSigningIn]
  );

  return (
    <div>
      {userLoggedIn && <Navigate to={'/HomePage'} replace={true} />}

      <main className="login-main">
        <div className="login-container">
          <div className="login-text">
            <div className="login-title">
              <h3 className="login-heading"></h3>
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