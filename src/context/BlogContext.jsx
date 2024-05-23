import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const initialPosts = [
    {
      id: 1,
      title: 'Angående Naturvin',
      author: 'jane.doe@example.com',
      content: 'Upptäck Naturvin: En Smakupplevelse från Naturen.Naturvin är mer än bara en dryck – det är en resa tillbaka till naturens ursprung. Tillverkat med minimal mänsklig inblandning, naturvin låter druvorna och jorden tala för sig själva. Utan tillsatser och med naturlig jäsning, erbjuder varje flaska en unik smakprofil. Föreställ dig att sippa på ett vin som doftar av vildblommor, kryddor och frukt, där varje sipp ger en ny överraskning. Naturvin hyllar den råa skönheten i druvorna och terroiren de växer i, vilket skapar en genuin och autentisk vinupplevelse. Att välja naturvin är att välja en livsstil som värderar hållbarhet, autenticitet och en djupare koppling till naturen. Så nästa gång du ska välja vin, prova ett naturvin och låt dig förföras av dess naturliga charm och komplexitet. Skål för naturens egen konst!',
      comments: [],
      category: 'Vin'
    }
  ];

  const [posts, setPosts] = useState(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    // Ensure the initial post is included if not already present
    const existingPostIds = storedPosts.map(post => post.id);
    const combinedPosts = initialPosts.filter(post => !existingPostIds.includes(post.id)).concat(storedPosts);
    return combinedPosts;
  });

  useEffect(() => {
    // Save posts to localStorage whenever they change
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (newPost) => {
    const updatedPosts = [...posts, { ...newPost, id: Date.now(), comments: [] }];
    setPosts(updatedPosts);
  };

  const editPost = (postId, updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, ...updatedPost } : post
    );
    setPosts(updatedPosts);
  };

  const deletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  const addComment = (postId, newComment) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, comments: [...post.comments, { ...newComment, user: currentUser.email }] }
        : post
    );
    setPosts(updatedPosts);
  };

  const uploadImage = async (file) => {
    const storage = getStorage();
    const uniqueName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `images/${uniqueName}`);
    await uploadBytes(storageRef, file);
    console.log("Uploading to storage:", storageRef);
    const downloadURL = await getDownloadURL(storageRef);
    console.log("Download URL:", downloadURL);
    return downloadURL;
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
        uploadImage,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

