import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLSiSFGq3WXEptkRqztfB8A4jn6_FXGYo",
  authDomain: "login-sign-f8378.firebaseapp.com",
  projectId: "login-sign-f8378",
  storageBucket: "login-sign-f8378.firebasestorage.app",
  messagingSenderId: "127098328685",
  appId: "1:127098328685:web:ea6ebe703249321d025164"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export{ app, auth }; 