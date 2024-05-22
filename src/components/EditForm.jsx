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
      <div className="mb-4">
        <label htmlFor="title" className="block font-semibold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg outline-none"
          placeholder="Enter title"
        />
      </div>
      <div className="mb-8">
        <label htmlFor="content" className="block font-semibold mb-2">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg outline-none"
          rows="6"
          placeholder="Enter content"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Save Changes
      </button>
      <button
        type="button"
        className="bg-gray-500 text-white px-4 py-2 rounded-md"
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </button>
    </form>
  );
};

export default EditForm;
