import React, { useState } from 'react';
import { useBlogContext } from '../context/BlogContext';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const { addPost, uploadImage, currentUser } = useBlogContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = '';
    if (image) {
      try {
        console.log("Uploading image:", image.name);
        imageUrl = await uploadImage(image);
        console.log("Image uploaded successfully:", imageUrl);
      } catch (error) {
        console.error("Failed to upload image", error);
        return;
      }
    }
    if (title.trim() && content.trim()) {
      const newPost = {
        title,
        content,
        author: currentUser.email, // Använd e-postadressen som författare
        imageUrl
      };
      console.log("Creating new post:", newPost);
      addPost(newPost);
      setTitle('');
      setContent('');
      setImage(null);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFileUploadClick = () => {
    document.getElementById('fileInput').click();
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
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <button type="button" className="file-upload-button" onClick={handleFileUploadClick}>
            Välj fil
          </button>
          <button type="submit" className="buttons">ADD</button>
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;

