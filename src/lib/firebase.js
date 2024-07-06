'use client'
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup,onAuthStateChanged } from "firebase/auth";
import { getStorage, ref as sref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { getDatabase, set, get, ref } from "firebase/database"
import { useEffect, useState } from 'react';
let ImageCompressor = null
if (typeof window !== "undefined") {
  import('image-compressor.js')
    .then((module) => {
      ImageCompressor = module.default;
    })
    .catch((err) => {
      console.error('Error loading ImageCompressor:', err);
    });
}
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

export function signInoutWithGoogle() {
  if (auth.currentUser) {
    auth.signOut();
    return null;
  }
  else {

    let provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      return user;
    }).catch((error) => {
      console.log(error, "\n error Code:", error.code, "\n Error Message: ", error.message);
    });
  }
}

export const checkIfUserSignedIn = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); 
      if (user) {
        resolve(user); 
      } else {
        resolve(null); 
      }
    }, reject); 
  });
};


export async function checkuserrole(role) {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userEmail = user.email.replace('.', '_');
        const adminRef = ref(db, 'userroles/' + role);

        try {
          const snapshot = await get(adminRef);

          if (snapshot.exists()) {
            const admins = snapshot.val();
            resolve(admins[userEmail] ? true : false);
          } else {
            console.log("No data available");
            resolve(false);
          }
        } catch (error) {
          console.error("Error getting document: ", error);
          reject(false);
        }
      } else {
        console.log("No user signed in");
        resolve(false);
      }
      unsubscribe(); // Clean up the listener
    });
  });
}

export function savedatatodb(location, data) {
  if (auth.currentUser) {
    let dataRef = ref(db, location);
    set(dataRef, data)
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }
}
const emails = [
  'sreejithksgupta2255@gmail.com',
  'ssuneebvishnu@gmail.com',
  'unnimayat01@gmail.com',
  'niranjanasunilkumar2003@gmail.com'
];
export const saveEmails = () => {
  if (auth.currentUser) {
    const emailData = emails.reduce((acc, email) => {
      acc[email.replace('.', '_')] = true;
      return acc;
    }, {});
    savedatatodb('userroles/blogger', emailData);
  }
};

export function saveposttodb(data) {
  if (auth.currentUser) {
    let dataRef = ref(db, "posts/" + data.time);
    set(dataRef, data)
      .catch((error) => {
        console.error("Error writing post: ", error);
      });
  }
}
export function eventSave(data) {
  if (auth.currentUser) {
    data.userId = auth.currentUser.uid;
    data.userName = auth.currentUser.displayName;
    let dataRef = ref(db, "events/" + data.timestamp);
    set(dataRef, data)
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
export async function getpostsfromdb() {
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
      throw error;
    });
}
export async function getdatafromdb(location) {
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
      throw error;
    });
}
export async function getdatafromStorage(location) {
  const storageRef = sref(storage, location);
  const res = await listAll(storageRef);
  const resurls = [];
  for (let i = 0; i < res.items.length; i++) {
    const url = await getDownloadURL(res.items[i]);
    resurls.push(url);
  }
  return resurls;
}
export async function getuserdetailfromdb(uid) {
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
      throw error;
    });
}
export async function uploadImageToStorage(userId, imageFile) {
  const folderPath = `profile_images/${userId}`;
  const folderRef = sref(storage, folderPath);
  const files = await listAll(folderRef);

  // Delete existing files in the folder
  const deletePromises = files.items.map((fileRef) => deleteObject(fileRef));
  await Promise.all(deletePromises);

  if (typeof window !== "undefined") {
    try {
      const compressor = new ImageCompressor();
      const compressedImage = await compressor.compress(imageFile, {
        maxWidth: 720,
        maxHeight: 540,
        quality: 0.8,
        mimeType: 'image/webp',
      });

      // Create a new file with the name 'profilepic.webp'
      const renamedFile = new File([compressedImage], 'profilepic.webp', {
        type: 'image/webp'
      });

      const storageRef = sref(storage, `profile_images/${userId}/profilepic.webp`);
      await uploadBytes(storageRef, renamedFile);
      const imageUrl = await getDownloadURL(storageRef);
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }
}
export async function getImageUrlFromStorage(userId) {
  const storageRef = sref(storage, `profile_images/${userId}`);

  try {
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  } catch (error) {
    if (error.code === 'storage/object-not-found') {
      return null;
    } else {
      console.error("Error getting image URL:", error);
      throw error;
    }
  }
}