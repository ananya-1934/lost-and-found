// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmePoy_FnlmHi9HfkwEp08eVEBF4SHP34",
  authDomain: "lost-and-found-bfc0b.firebaseapp.com",
  projectId: "lost-and-found-bfc0b",
  storageBucket: "lost-and-found-bfc0b.firebasestorage.app",
  messagingSenderId: "1089671523647",
  appId: "1:1089671523647:web:68a257775aed4a441d778a",
  measurementId: "G-CL8ZQ8GN8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
