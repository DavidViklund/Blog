
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDVj7kqaz3mdfYcKWOmelaTzJCIZSS7vnU",
  authDomain: "newblog-58cc8.firebaseapp.com",
  projectId: "newblog-58cc8",
  storageBucket: "newblog-58cc8.appspot.com",
  messagingSenderId: "975832160528",
  appId: "1:975832160528:web:5344fe1c1693fa073a6d95"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };

