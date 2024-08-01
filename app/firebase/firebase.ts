// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqAyXvnROdj6uC7eIqMoH0sCz0RB-RbCM",
  authDomain: "pantrytracker-64288.firebaseapp.com",
  projectId: "pantrytracker-64288",
  storageBucket: "pantrytracker-64288.appspot.com",
  messagingSenderId: "863223874417",
  appId: "1:863223874417:web:ff6caa242b2dd1b49b6cd0",
  measurementId: "G-GZ38B6DB17",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };
