// Denna fil innehåller funktioner för hantering av användarautentisering med Firebase.
// Funktionerna inkluderar skapande av användare, inloggning och utloggning.
// Exporterar dessa funktioner för att användas i andra delar av applikationen.

import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const createUser = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInUser = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  return auth.signOut();
};
