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
        author: currentUser.name,
      };
      addPost(newPost);
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="post-form-container">
      <form className="post-list-container" onSubmit={handleSubmit}>
        <div className="post-container">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="input-field" // Lägg till en CSS-klass för inputfältet
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
          />
          <button className="buttons">ADD</button>
        </div>
      </form>
      <CommentForm/>
    </div>
  );
};

export default AddPostForm;
