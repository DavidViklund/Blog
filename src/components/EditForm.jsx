/**
 * EditForm är en React-komponent som hanterar redigering av blogginlägg.
 * Den tar emot initiala värden för titel, innehåll, kategori och bild-URL
 * och låter användaren uppdatera dessa. Använder BlogContext för att hantera
 * bilduppladdning.
 */
import React, { useState } from "react";
import { useBlogContext } from "../context/BlogContext";

const EditForm = ({
  postId,
  initialTitle,
  initialContent,
  initialCategory,
  initialImageUrl,
  handleEdit,
  setIsEditing,
}) => {
  const [updatedTitle, setUpdatedTitle] = useState(initialTitle);
  const [updatedContent, setUpdatedContent] = useState(initialContent);
  const [updatedCategory, setUpdatedCategory] = useState(initialCategory);
  const [updatedImage, setUpdatedImage] = useState(null);
  const { uploadImage } = useBlogContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = initialImageUrl;
    if (updatedImage) {
      imageUrl = await uploadImage(updatedImage);
    }
    handleEdit({
      title: updatedTitle,
      content: updatedContent,
      category: updatedCategory,
      imageUrl,
    });
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
      <div className="form-group">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={updatedCategory}
          onChange={(e) => setUpdatedCategory(e.target.value)}
          className="form-input"
          placeholder="Enter category"
        />
      </div>
      <div className="form-group">
        <label htmlFor="image" className="form-label">
          Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={(e) => setUpdatedImage(e.target.files[0])}
          className="form-input"
        />
      </div>
      <div className="button-group">
        <button type="submit" className="button button-primary">
          Save Changes
        </button>
        <button
          type="button"
          className="button button-secondary"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditForm;
