'use client'

import { initializeApp } from "firebase/app";
import {getAuth,  GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { getStorage ,ref as sref, uploadBytes,  getDownloadURL ,listAll, deleteObject } from "firebase/storage";
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

export function saveposttodb(data){
if (auth.currentUser) {
      let dataRef = ref(db, "posts/" + data.time);
      set(dataRef, data)
          .then(() => {
              console.log("post successfully written!");
          })
          .catch((error) => {
              console.error("Error writing post: ", error);
          });
  }
}
 

export function eventSave(data){
  if (auth.currentUser) {
        data.userId = auth.currentUser.uid;
        data.userName = auth.currentUser.displayName;
        let dataRef = ref(db, "events/" + data.timestamp);
        set(dataRef, data)
            .then(() => {
                console.log("event successfully written!");
            })
            .catch((error) => {
                console.error("Error writing event: ", error);
            });
    }
  }

  export async function fetchEventsFromDB() {
    const eventsRef = ref(db, 'events');
    try {
        const snapshot = await get(eventsRef);
        if (snapshot.exists()) {
            const eventData = snapshot.val();
            return Object.keys(eventData).map(key => ({
                ...eventData[key],
                id: key
            }));
        } else {
            console.log("No events available");
            return [];
        }
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
}

export async function getpostsfromdb(){
  const userRef = ref(db, "posts");
  return get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
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

  export async function getdatafromdb(location){
    const userRef = ref(db, location);
    return get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
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

  export async function getuserdetailfromdb(uid){
    const userRef = ref(db, "users/" + uid);
    return get(userRef)
     .then((snapshot) => {
        if (snapshot.exists()) {
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

  export async function uploadImageToStorage(userId, imageFile) {
    const folderPath = `profile_images/${userId}`;
    const folderRef = sref(storage, folderPath);
    const files = await listAll(folderRef);
    const deletePromises = files.items.map((fileRef) => deleteObject(fileRef));
    await Promise.all(deletePromises);
  
    const storageRef = sref(storage, `profile_images/${userId}/${imageFile.name}`); 
    try {
      await uploadBytes(storageRef, imageFile); 
      const imageUrl = await getDownloadURL(storageRef);
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error; 
    }
  }

  export async function getImageUrlFromStorage(userId) {
    const storageRef = sref(storage, `profile_images/${userId}`); // Create reference with user ID
  
    try {
      const imageUrl = await getDownloadURL(storageRef); // Get download URL for the image file (if it exists)
      return imageUrl;
    } catch (error) {
      if (error.code === 'storage/object-not-found') {
        // Handle case where image doesn't exist
        return null;  // Return null to indicate no image
      } else {
        console.error("Error getting image URL:", error);
        throw error; // Re-throw the error for handling in the calling code (e.g., display notification)
      }
    }
  }