// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-estate-51c97.firebaseapp.com",
    projectId: "mern-estate-51c97",
    storageBucket: "mern-estate-51c97.appspot.com",
    messagingSenderId: "572808403169",
    appId: "1:572808403169:web:978b56dae1e9bfa0583fa0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
