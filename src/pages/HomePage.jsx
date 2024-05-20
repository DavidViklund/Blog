import React, { useContext } from 'react';
import PostList from '../components/PostList';
import Form from "../components/Form";
import LoginComponent from '../components/LoginComponent';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const { userLoggedIn } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to My Blog</h1>
      {userLoggedIn ? (
        <>
          <Form />
          <PostList />
          {/* Visa användarnamnet för den inloggade användaren här om det är relevant */}
        </>
      ) : (
        <LoginComponent />
      )}
    </div>
  );
};

export default HomePage;
