import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'First Post',
      author: 'jane.doe@example.com',
      content: 'This is the first post content.',
      comments: [],
    },
  ]);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, { ...newPost, id: Date.now(), comments: [] }]);
  };

  const editPost = (postId, updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, ...updatedPost } : post
      )
    );
  };

  const deletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const addComment = (postId, newComment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, { ...newComment, user: currentUser.email }] } : post
      )
    );
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        currentUser,
        addPost,
        editPost,
        deletePost,
        addComment,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
