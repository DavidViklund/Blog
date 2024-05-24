// Denna fil definierar `AddPost`-komponenten, som tillhandahåller en sida för att lägga till nya blogginlägg.
import React from "react";
import AddPostForm from "../components/AddPostForm";

const AddPost = () => {
  return (
    <div>
      <h1>ADD POST</h1>
      <AddPostForm />
    </div>
  );
};

export default AddPost;
