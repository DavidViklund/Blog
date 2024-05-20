const Post = ({ title, content, author, currentUser, editPost, deletePost }) => {
    return (
      <div className="post-container">
        <div className="post-content">
          <h3>{title}</h3>
          <p>{content}</p>
          <p><strong>Author:</strong> {author}</p>
          {currentUser && author === currentUser.name && (
            <div className='buttoncontainer'>
              <button className='buttons' onClick={() => editPost(post.id, { title: 'New Title', content: 'New Content' })}>Edit</button>
              <button className='buttons' onClick={() => deletePost(post.id)}>Delete</button>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default Post;