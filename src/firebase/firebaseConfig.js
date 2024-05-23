import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC9veB0ctTGEi2YAqQ0cvY0Y1uBStAD9gs",
  authDomain: "thursdayblog-117a1.firebaseapp.com",
  projectId: "thursdayblog-117a1",
  storageBucket: "thursdayblog-117a1.appspot.com",
  messagingSenderId: "1065684222151",
  appId: "1:1065684222151:web:48f85b8f59e483dc1b7ee2"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage };
