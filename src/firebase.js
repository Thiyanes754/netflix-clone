// src/firebase.js
console.clear();

import { firebaseConfig } from "./config";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore
} from "firebase/firestore";
import { toast } from "react-toastify";

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 📝 Signup function
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    toast.success("Signup successful!");
  } catch (error) {
    console.error(error);
    toast.error(
      error?.code?.split("/")[1]?.split("-")?.join(" ") || "Signup failed"
    );
  }
};

// 🔐 Login function
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful!");
  } catch (error) {
    console.error(error);
    toast.error(
      error?.code?.split("/")[1]?.split("-")?.join(" ") || "Login failed"
    );
  }
};

// 🚪 Logout function
const logout = () => {
  signOut(auth);
  toast.info("Logged out");
};

export { auth, db, login, signup, logout };
