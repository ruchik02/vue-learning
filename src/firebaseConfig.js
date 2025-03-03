// Import the required Firebase SDK modules
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"; // Import Firebase Storage
import {getFunctions, httpsCallable } from 'firebase/functions'

// Firebase configuration (DO NOT expose API keys in public repositories)
const firebaseConfig = {
  apiKey: "AIzaSyDYF2C1H0OWqVfzuHdxSl0n6wFNYieFAdI",
  authDomain: "intelligent-photo-galler-44031.firebaseapp.com",
  projectId: "intelligent-photo-galler-44031",
  storageBucket: "intelligent-photo-galler-44031.appspot.com",
  messagingSenderId: "475677346218",
  appId: "1:475677346218:web:6e9a64b8a8d2fd38ed03d3"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);
const functions = getFunctions(app);

export { app, storage, ref, uploadBytes, getDownloadURL, deleteObject, getFunctions, httpsCallable };
