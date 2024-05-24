// Denna fil är ingångspunkten för React-applikationen.
// Den renderar huvudkomponenten `App` inuti en div med id "root".
// `AuthProvider` och `BlogProvider` används för att omge `App`-komponenten, vilket tillhandahåller autentisering och bloggkontext till hela applikationen.

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { BlogProvider } from "./context/BlogContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BlogProvider>
        <App />
      </BlogProvider>
    </AuthProvider>
  </React.StrictMode>
);
