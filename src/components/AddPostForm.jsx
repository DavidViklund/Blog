import React, { useState } from 'react';
import { useBlogContext } from "../context/BlogContext";
import CommentForm from './CommentForm';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addPost, currentUser } = useBlogContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {  
      const newPost = {
        title,
        content,
        author: currentUser.email, // Använd e-postadressen som författare
      };
      addPost(newPost);
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="post-form-container">
      <form className="post-container" onSubmit={handleSubmit}>
        <div className="post-content">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="input-field"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="input-field"
          />
          <button className="buttons">ADD</button>
        </div>
      </form>
      <CommentForm />
    </div>
  );
};

export default AddPostForm;
