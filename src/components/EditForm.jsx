import React, { useState } from 'react';

const EditForm = ({ postId, initialTitle, initialContent, handleEdit, setIsEditing }) => {
  const [updatedTitle, setUpdatedTitle] = useState(initialTitle);
  const [updatedContent, setUpdatedContent] = useState(initialContent);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit({ title: updatedTitle, content: updatedContent });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          className="form-input"
          placeholder="Enter title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="content" className="form-label">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
          className="form-textarea"
          rows="6"
          placeholder="Enter content"
        ></textarea>
      </div>
      <div className="button-group">
        <button type="submit" className="button button-primary">
          Save Changes
        </button>
        <button type="button" className="button button-secondary" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditForm;
