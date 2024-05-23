import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';
import { storage } from '../firebase/firebaseConfig'; // Importera storage från firebaseConfig
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Angående Naturvin',
      author: 'jane.doe@example.com',
      content: 'Upptäck Naturvin: En Smakupplevelse från Naturen.Naturvin är mer än bara en dryck – det är en resa tillbaka till naturens ursprung. Tillverkat med minimal mänsklig inblandning, naturvin låter druvorna och jorden tala för sig själva. Utan tillsatser och med naturlig jäsning, erbjuder varje flaska en unik smakprofil. Föreställ dig att sippa på ett vin som doftar av vildblommor, kryddor och frukt, där varje sipp ger en ny överraskning. Naturvin hyllar den råa skönheten i druvorna och terroiren de växer i, vilket skapar en genuin och autentisk vinupplevelse. Att välja naturvin är att välja en livsstil som värderar hållbarhet, autenticitet och en djupare koppling till naturen. Så nästa gång du ska välja vin, prova ett naturvin och låt dig förföras av dess naturliga charm och komplexitet. Skål för naturens egen konst!',
      comments: [],
      imageUrl: ''
    },
  ]);

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

  const uploadImage = async (file) => {
    try {
      console.log("Uploading image to Firebase Storage:", file.name);
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Image URL:", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
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
        uploadImage, // Lägg till uploadImage i context
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
