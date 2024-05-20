import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prenumerera på ändringar i autentiseringsstatusen med onAuthStateChanged
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Uppdatera currentUser och sparad inloggningsstatus baserat på den aktuella autentiseringsstatusen
      if (user) {
        setCurrentUser(user);
        localStorage.setItem("userLoggedIn", "true");
      } else {
        setCurrentUser(null);
        localStorage.removeItem("userLoggedIn");
      }
      // Sluta ladda när autentiseringsstatusen har uppdaterats
      setLoading(false);
    });

    // Avsluta prenumerationen när komponenten avmonteras
    return unsubscribe;
  }, []);

  useEffect(() => {
    // Återställ inloggningsstatus vid sidomladdning om användaren tidigare var inloggad
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    if (userLoggedIn === "true") {
      setCurrentUser(auth.currentUser);
    }
  }, []);

  // Skapa ett objekt med currentUser och tillhandahåll det som värde till AuthContext.Provider
  const values = { currentUser };

  return (
    <AuthContext.Provider value={values}>
      {/* Rendera endast barnkomponenterna när autentiseringsstatusen har uppdaterats */}
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
