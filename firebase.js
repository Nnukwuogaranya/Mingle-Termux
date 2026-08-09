import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNOdtu-QEFF9ft9S95arVVG1gNjZJm-EE",
  authDomain: "mingle-9c827.firebaseapp.com",
  projectId: "mingle-9c827",
  storageBucket: "mingle-9c827.firebasestorage.app",
  messagingSenderId: "617137584934",
  appId: "1:617137584934:web:5f2a4dd470862394135fe7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signOut
};
