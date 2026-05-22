// js/firebase-init.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";

// Your web app's Firebase configuration
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

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);