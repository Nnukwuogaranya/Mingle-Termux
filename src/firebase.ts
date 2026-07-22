// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNOdtu-QEFF9ft9S95arVVG1gNjZJm-EE",
  authDomain: "mingle-9c827.firebaseapp.com",
  projectId: "mingle-9c827",
  storageBucket: "mingle-9c827.firebasestorage.app",
  messagingSenderId: "617137584934",
  appId: "1:617137584934:web:5f2a4dd470862394135fe7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Authentication
export const auth = getAuth(app);

