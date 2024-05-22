import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

// Create a context for authentication
export const AuthContext = createContext();

// A custom hook to use the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to authentication state changes with onAuthStateChanged
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Update currentUser and save logged-in status based on the current authentication state
      if (user) {
        setCurrentUser(user);
        localStorage.setItem("userLoggedIn", "true");
      } else {
        setCurrentUser(null);
        localStorage.removeItem("userLoggedIn");
      }
      // Stop loading when authentication state has been updated
      setLoading(false);
    });

    // Unsubscribe when the component unmounts
    return unsubscribe;
  }, []);

  useEffect(() => {
    // Restore logged-in status on page reload if the user was previously logged in
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    if (userLoggedIn === "true" && !currentUser) {
      setCurrentUser(auth.currentUser);
    }
  }, [currentUser]);

  const logout = () => {
    signOut(auth).then(() => {
      setCurrentUser(null);
      localStorage.removeItem("userLoggedIn");
    });
  };

  // Create an object with currentUser and provide it as a value to AuthContext.Provider
  const values = { currentUser, userLoggedIn: !!currentUser, logout };

  return (
    <AuthContext.Provider value={values}>
      {/* Render child components only when authentication status has been updated */}
      {!loading && props.children}
    </AuthContext.Provider>
  );
};