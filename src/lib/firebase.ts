// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-2359486319-5fb62",
  "appId": "1:598948406516:web:8b1f88c387946ccf122aa1",
  "storageBucket": "studio-2359486319-5fb62.firebasestorage.app",
  "apiKey": "AIzaSyBrdAHogj7Ap1GFNLoqDNA1NeweJsqHcYI",
  "authDomain": "studio-2359486319-5fb62.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "598948406516"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
