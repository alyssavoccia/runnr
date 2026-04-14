// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-YUQHF_KwGp0pFXZDovlkos1Ms2_DQTg",
  authDomain: "runnrco-app.firebaseapp.com",
  projectId: "runnrco-app",
  storageBucket: "runnrco-app.firebasestorage.app",
  messagingSenderId: "404076485420",
  appId: "1:404076485420:web:54572d9a7e5243c17b2a89",
  measurementId: "G-BT08K07D5V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
