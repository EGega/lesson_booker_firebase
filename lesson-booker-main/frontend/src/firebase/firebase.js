// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXVHuFXazlkc1Hm6-Ivw_Qs8804_3YeBk",
  authDomain: "lesson-booker.firebaseapp.com",
  projectId: "lesson-booker",
  storageBucket: "lesson-booker.firebasestorage.app",
  messagingSenderId: "919093612309",
  appId: "1:919093612309:web:fd8a20a8c991ef713a231c",
  measurementId: "G-VBSH6R8N61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
