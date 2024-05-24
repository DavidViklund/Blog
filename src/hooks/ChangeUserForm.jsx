// Denna komponent tillhandahåller ett formulär för att ändra användarnamnet.
// Den använder AuthContext för att hämta och uppdatera det aktuella användarnamnet.
// Hooken useInput används för att hantera inmatningsfältets tillstånd och logik.

import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useInput from "../hooks/useInput";

const ChangeUsernameForm = () => {
  const { currentUser, setUserName } = useContext(AuthContext);
  const {
    value: newUsername,
    onChange: handleUsernameChange,
    reset: resetUsername,
  } = useInput();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Uppdaterar användarnamnet lokalt
      setUserName(newUsername);

      // Återställ formuläret
      resetUsername(); // Återställ textinmatningsfältet för användarnamnet
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  return (
    <div>
      <h2>Change Username</h2>
      <form onSubmit={handleSubmit}>
        <label>New Username:</label>
        <input
          type="text"
          value={newUsername}
          onChange={handleUsernameChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ChangeUsernameForm;
