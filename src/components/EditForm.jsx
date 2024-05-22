const EditForm = ({ postId, handleEdit, setIsEditing, setPosts }) => {
  const [updatedPost, setUpdatedPost] = useState({
    category: "",
    title: "",
    text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost((prevUpdatedPost) => ({
      ...prevUpdatedPost,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit(postId, updatedPost);
    if (typeof setPosts === "function") {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, ...updatedPost } : post
        )
      );
    }
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="category" className="block font-semibold mb-2">
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={updatedPost.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg outline-none"
          placeholder="Enter category"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="block font-semibold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={updatedPost.title}
          onChange={handleChange}
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
          name="text"
          value={updatedPost.content}
          onChange={handleChange}
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
    </form>
  );
};

export default EditForm;