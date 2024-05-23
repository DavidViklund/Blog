import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { storage } from '../firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const { currentUser } = useAuth();
  
  const defaultPosts = [
    {
      id: 1,
      title: 'Angående Naturvin',
      author: 'jane.doe@example.com',
      content: 'Upptäck Naturvin: En Smakupplevelse från Naturen. Naturvin är mer än bara en dryck – det är en resa tillbaka till naturens ursprung. Tillverkat med minimal mänsklig inblandning, naturvin låter druvorna och jorden tala för sig själva. Utan tillsatser och med naturlig jäsning, erbjuder varje flaska en unik smakprofil. Föreställ dig att sippa på ett vin som doftar av vildblommor, kryddor och frukt, där varje sipp ger en ny överraskning. Naturvin hyllar den råa skönheten i druvorna och terroiren de växer i, vilket skapar en genuin och autentisk vinupplevelse. Att välja naturvin är att välja en livsstil som värderar hållbarhet, autenticitet och en djupare koppling till naturen. Så nästa gång du ska välja vin, prova ett naturvin och låt dig förföras av dess naturliga charm och komplexitet. Skål för naturens egen konst!',
      category: 'Vin',
      comments: [],
    },
  ];
  
  const [posts, setPosts] = useState(() => {
    const storedPosts = localStorage.getItem('posts');
    return storedPosts ? JSON.parse(storedPosts) : defaultPosts;
  });

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const uploadImage = async (image) => {
    const imageRef = ref(storage, `images/${Date.now()}_${image.name}`);
    await uploadBytes(imageRef, image);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  };

  const addPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, { ...newPost, id: Date.now(), comments: [] }]);
  };

  const editPost = (postId, updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, ...updatedPost } : post
      )
    );
  };

  const deletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const addComment = (postId, newComment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, { ...newComment, user: currentUser.email }] } : post
      )
    );
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        currentUser,
        addPost,
        editPost,
        deletePost,
        addComment,
        uploadImage
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
