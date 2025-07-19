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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup function
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Add user to Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(
      error?.code?.split("/")[1]?.split("-")?.join(" ") || "Something went wrong"
    );
  }
};

// Login function
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(
      error?.code?.split("/")[1]?.split("-")?.join(" ") || "Something went wrong"
    );
  }
};

// Logout function
const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };
