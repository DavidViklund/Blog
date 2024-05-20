
import React, { useState } from 'react';
import { useBlogContext } from "../context/BlogContext";


const CommentForm = ({ postId }) => {
  const [commentText, setCommentText] = useState('');
  const { addComment, currentUser } = useBlogContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(postId, { user: currentUser.name, text: commentText });
      setCommentText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment"
      />
      <button type="submit">+</button>
    </form>
  );
};

export default CommentForm;