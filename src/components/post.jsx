/**
 * Post är en React-komponent som representerar ett enskilt blogginlägg.
 * Den hanterar visning, redigering, radering och kommentarer för varje inlägg.
 */
import React, { useState } from "react";
import EditForm from "./EditForm";
import CommentForm from "./CommentForm";
import { useBlogContext } from "../context/BlogContext";

const Post = ({
  id,
  title,
  content,
  category,
  author,
  imageUrl,
  currentUser,
  editPost,
  deletePost,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { posts } = useBlogContext();
  const post = posts.find((post) => post.id === id);

  const handleEdit = (updatedPost) => {
    editPost(id, updatedPost);
    setIsEditing(false);
  };

  return (
    <div className="post-container">
      {isEditing ? (
        <EditForm
          postId={id}
          initialTitle={title}
          initialContent={content}
          initialCategory={category}
          initialImageUrl={imageUrl}
          handleEdit={handleEdit}
          setIsEditing={setIsEditing}
        />
      ) : (
        <div className="post-content">
          <h3>{title}</h3>
          <p>{content}</p>
          {imageUrl && (
            <img src={imageUrl} alt={title} className="post-image" />
          )}
          <p>
            <strong>Category:</strong> {category}
          </p>
          <p>
            <strong>Author:</strong> {author}
          </p>
          {currentUser && author === currentUser.email && (
            <div className="button-container">
              <button className="buttons" onClick={() => setIsEditing(true)}>
                Edit
              </button>
              <button className="buttons" onClick={() => deletePost(id)}>
                Delete
              </button>
            </div>
          )}
        </div>
      )}
      {currentUser && <CommentForm postId={id} />}
      <div className="comments-section">
        <h4>Comments:</h4>
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment, index) => (
            <div key={index} className="comment">
              <p>
                <strong>{comment.user}:</strong> {comment.text}
              </p>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default Post;
