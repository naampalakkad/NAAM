import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyD3teEBN7Ai6JXlvtbGaE6r_NTLK0Kpm4A",
    authDomain: "naam-751a5.firebaseapp.com",
    projectId: "naam-751a5",
    storageBucket: "naam-751a5.appspot.com",
    messagingSenderId: "635247227682",
    appId: "1:635247227682:web:01891d1adee715c4f7ab7b",
    measurementId: "G-1DCGC388NY",
    databaseURL: "https://naam-751a5-default-rtdb.asia-southeast1.firebasedatabase.app"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getDatabase(app);
