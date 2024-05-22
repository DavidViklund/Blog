import React, { useContext } from 'react';
import PostList from '../components/PostList';
import CommentForm from '../components/CommentForm';
import LoginComponent from '../components/LoginComponent';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const { userLoggedIn } = useContext(AuthContext);

  // State för att visa eller dölja LoginComponent
  const [showLogin, setShowLogin] = React.useState(false);

  // Funktion för att visa LoginComponent vid inloggning
  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <div>
      <h1>Welcome to My Blog</h1>
      {userLoggedIn ? (
        <>
          <PostList />
          {/* Visa användarnamnet för den inloggade användaren här om det är relevant */}
          <CommentForm/>
        </>
      ) : (
        <div>
          {showLogin ? (
            <LoginComponent />
          ) : (
            <button onClick={handleLoginClick}>Logga in</button>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
