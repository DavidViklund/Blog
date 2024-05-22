import React from 'react';
import { useBlogContext } from '../context/BlogContext';
import Post from './post'; // Korrekt sökväg till post.jsx
const PostList = () => {
  const { posts, currentUser, editPost, deletePost } = useBlogContext();

  return (
    <div className="post-list-container">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          author={post.author}
          currentUser={currentUser}
          editPost={editPost}
          deletePost={deletePost}
        />
      ))}
    </div>
  );
};

export default PostList;