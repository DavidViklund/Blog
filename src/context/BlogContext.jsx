import React, { createContext, useState, useContext } from 'react';


const BlogContext = createContext();

export const useBlogContext = () => {
  return useContext(BlogContext);
};
          
export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    // Initiala blogginlägg
    
    { id: 1, title: 'First Post', author: 'David Viklund', 
    content: 'Naturvin är som att träffa en gammal vän - bekant men ändå överraskande. Det är ett sätt att göra vin på som hyllar naturens gåvor och respekterar dess mysterium. Här handlar det om att släppa taget om förutfattade meningar och låta vinet tala för sig självt.', comments: [] },
    
  ]);
  
  const [currentUser, setCurrentUser] = useState({
    id: 2,  // Exempelanvändare
    name: 'John Doe'
  });

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
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
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
      <div className="blog-context">{children}</div> {/* Använda en wrapper för att applicera CSS */}
    </BlogContext.Provider>
  );
};

export default BlogContext;