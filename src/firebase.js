// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpotKkbp2iWjaYS0mBTpgx8Ry1gfu0a5I",
  authDomain: "react-crypto-hunter-auth.firebaseapp.com",
  projectId: "react-crypto-hunter-auth",
  storageBucket: "react-crypto-hunter-auth.appspot.com",
  messagingSenderId: "371056769471",
  appId: "1:371056769471:web:5a7d31f450d1708bc9490a",
  measurementId: "G-SXZ660BFVT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth( app );
export default app;