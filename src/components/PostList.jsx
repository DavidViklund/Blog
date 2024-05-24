/**
 * PostList är en React-komponent som hanterar visningen och filtreringen av blogginlägg.
 * Användare kan filtrera inlägg baserat på kategorier.
 */

import React, { useState } from "react";
import { useBlogContext } from "../context/BlogContext";
import Post from "./Post";

const PostList = () => {
  const { posts, currentUser, editPost, deletePost } = useBlogContext();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Filtrera inlägg baserat på vald kategori
  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  return (
    <div className="post-list-container">
      <div className="category-filter">
        <label htmlFor="category" className="category-label">
          Filter by category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-select"
        >
          <option value="">A L L</option>
          {Array.from(new Set(posts.map((post) => post.category))).map(
            (category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            )
          )}
        </select>
      </div>
      {filteredPosts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          category={post.category}
          author={post.author}
          imageUrl={post.imageUrl} // Se till att bild-URL skickas med
          currentUser={currentUser}
          editPost={editPost}
          deletePost={deletePost}
        />
      ))}
    </div>
  );
};

export default PostList;
