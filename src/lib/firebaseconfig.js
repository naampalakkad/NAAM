import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAwBCJsji0R5UeZuKkroe4JsS3RSrVHrsA",
  authDomain: "naamsiteprod.firebaseapp.com",
  databaseURL: "https://naamsiteprod-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "naamsiteprod",
  storageBucket: "naamsiteprod.appspot.com",
  messagingSenderId: "441558746731",
  appId: "1:441558746731:web:da6e9e5f18396ac0bd132e",
  measurementId: "G-PPQBL6FYQT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getDatabase(app);
