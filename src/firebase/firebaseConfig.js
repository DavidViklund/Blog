// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhWRbJ99Scr78mgC-9RT1z7CZvviPBviI",
  authDomain: "blog-25207.firebaseapp.com",
  projectId: "blog-25207",
  storageBucket: "blog-25207.appspot.com",
  messagingSenderId: "825573708111",
  appId: "1:825573708111:web:7e6724be12fd4da310b53a",
  measurementId: "G-DGYJMCRVXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };