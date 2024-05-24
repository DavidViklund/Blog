// Denna fil definierar `HomePage`-komponenten, som är startsidan för applikationen.
// Den visar ett välkomstmeddelande och antingen en lista med inlägg (om användaren är inloggad) eller en uppmaning att logga in.

import React, { useContext } from "react";
import PostList from "../components/PostList";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const { userLoggedIn } = useContext(AuthContext);

  return (
    <div>
      <h1>WELCOME</h1>
      {userLoggedIn ? (
        <PostList />
      ) : (
        <p className="welcomemessage">Please log in to see the posts.</p>
      )}
    </div>
  );
};

export default HomePage;
