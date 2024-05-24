/**
 * CommentForm är en React-komponent som hanterar inlämning av kommentarer till ett specifikt blogginlägg.
 * Den tar emot postId som prop och använder BlogContext för att lägga till kommentarer.
 */
import React, { useState } from "react";
import { useBlogContext } from "../context/BlogContext";

const CommentForm = ({ postId }) => {
  const [commentText, setCommentText] = useState("");
  const { addComment, currentUser } = useBlogContext();

  // Hanterar formulärinlämning och lägger till en ny kommentar
  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(postId, { user: currentUser.email, text: commentText });
      setCommentText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment"
        className="comment-input"
      />
      <button type="submit" className="comment-button">
        +
      </button>
    </form>
  );
};

export default CommentForm;
