// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
'use client'

import { initializeApp } from "firebase/app";
import {getAuth,  GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { getStorage ,ref as sref, listAll, getDownloadURL} from "firebase/storage";
import {getDatabase,set,get,ref} from "firebase/database"

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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getDatabase(app);

export function signInoutWithGoogle(){
     if(auth.currentUser){
         auth.signOut();
         console.log("signed out");
         return null;
     }
     else{
      
      let provider =new GoogleAuthProvider();
      signInWithPopup(auth,provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        console.log("signed in");
        return user;
      }).catch((error) => {
        console.log(error,"\n error Code:", error.code,"\n Error Message: ",error.message);
      });
     }
  }

  export function issignedin(){
    return auth.currentUser;
  }

  export function savedatatodb(location, data){
    console.log("Saving to Firebase. Location", location, "Data", data);
    if (auth.currentUser) {
        let dataRef = ref(db, location);
        set(dataRef, data)
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }
}

  export async function getdatafromdb(location){
    console.log("Fetching from Firebase. Location",location);
    const userRef = ref(db, location);
    return get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log("Document data:", snapshot.val());
          return snapshot.val();
        } else {
          console.log("No data available");
          return null;
        }
      })
      .catch((error) => {
        console.error("Error getting document: ", error);
        throw error; // If you want to handle this error in the calling function
      });
  }

  export async function getdatafromStorage(location){
    console.log("Fetching from Firebase Storage. Location",location);
    const storageRef = sref(storage, location);
    const res = await listAll(storageRef);
    const resurls = [];
    for (let i = 0; i < res.items.length; i++) {
        const url = await getDownloadURL(res.items[i]);
        resurls.push(url);
    }
    return resurls;
  }