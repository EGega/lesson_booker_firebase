// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
console.log(process.env.FIREBASE_API_KEY)
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "lesson-booker.firebaseapp.com",
  projectId: "lesson-booker",
  storageBucket: "lesson-booker.firebasestorage.app",
  messagingSenderId: "919093612309",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-VBSH6R8N61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider()
