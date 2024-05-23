import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from localStorage when component mounts
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
  }, []);

  const savePostsToLocalStorage = (posts) => {
    localStorage.setItem('posts', JSON.stringify(posts));
  };

  const addPost = (newPost) => {
    const updatedPosts = [...posts, { ...newPost, id: Date.now(), comments: [] }];
    setPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts);
  };

  const editPost = (postId, updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, ...updatedPost } : post
    );
    setPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts);
  };

  const deletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts);
  };

  const addComment = (postId, newComment) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, comments: [...post.comments, { ...newComment, user: currentUser.email }] }
        : post
    );
    setPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts);
  };

  const uploadImage = async (file) => {
    const storage = getStorage();
    const uniqueName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `images/${uniqueName}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
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
        uploadImage,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};


