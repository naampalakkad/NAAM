// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,  googleAuthProvider, signInWithPopup} from "firebase/auth";
import { getStorage } from "firebase/storage";
import {getDatabase} from "firebase/database"
const firebaseConfig = {
  apiKey: "AIzaSyC97WJwdO5012NyYyRMfjZYUehk6kTZTQI",
  authDomain: "naam-demo.firebaseapp.com",
  projectId: "naam-demo",
  storageBucket: "naam-demo.appspot.com",
  databaseURL:"https://naam-demo-default-rtdb.asia-southeast1.firebasedatabase.app",
  messagingSenderId: "608229011102",
  appId: "1:608229011102:web:a62c520e1e527f4c3b558f",
  measurementId: "G-NPX2H6Q43C"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const storage = getStorage(app);
// db = realtime database
export const db = getDatabase(app);
