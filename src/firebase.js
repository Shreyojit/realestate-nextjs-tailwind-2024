// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD76o35r0fXQdYAawXQ6Xobk2kK5oKMtlg",
  authDomain: "real-estate-nextjs.firebaseapp.com",
  projectId: "real-estate-nextjs",
  storageBucket: "real-estate-nextjs.appspot.com",
  messagingSenderId: "194448974246",
  appId: "1:194448974246:web:4d4e9727caeae4142b6f67"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);