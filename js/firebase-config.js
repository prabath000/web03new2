// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtY_74ZZWTCd5wKmt39nIUC00kvv13Ta8",
  authDomain: "prabath-66487.firebaseapp.com",
  projectId: "prabath-66487",
  storageBucket: "prabath-66487.firebasestorage.app",
  messagingSenderId: "323049415882",
  appId: "1:323049415882:web:8fa7418eda7d77d81d4033",
  measurementId: "G-MR2627CF95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, firebaseConfig };
