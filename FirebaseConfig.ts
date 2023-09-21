// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnCwTtPkOGlaM3lFpMyyyIJ0UxeEbIDQE",
  authDomain: "parking-auth-ba546.firebaseapp.com",
  projectId: "parking-auth-ba546",
  storageBucket: "parking-auth-ba546.appspot.com",
  messagingSenderId: "221488399738",
  appId: "1:221488399738:web:a95a0e4085c01856b6c2c3"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);