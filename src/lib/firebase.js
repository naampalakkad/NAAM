import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup,onAuthStateChanged } from "firebase/auth";
import { getStorage, ref as sref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { getDatabase, set, get, ref, update, remove } from "firebase/database"; 
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

export const addLike = async (postId, userId) => {
  try {
    const postRef = ref(db, `posts/${postId}`);
    const likesRef = ref(db, `posts/${postId}/likes/${userId}`);

    // Add the user to the likes node
    await set(likesRef, true);

    // Increment the like count for the post
    const postSnapshot = await get(postRef);
    if (postSnapshot.exists()) {
      const postData = postSnapshot.val();
      const currentLikesCount = postData.likesCount || 0;
      await update(postRef, {
        likesCount: currentLikesCount + 1
      });
    }

    console.log('Like added successfully');
  } catch (error) {
    console.error('Error adding like:', error);
  }
};

// Function to remove a like
export const removeLike = async (postId, userId) => {
  try {
    const postRef = ref(db, `posts/${postId}`);
    const likesRef = ref(db, `posts/${postId}/likes/${userId}`);

    // Remove the user from the likes node
    await remove(likesRef);

    // Decrement the like count for the post
    const postSnapshot = await get(postRef);
    if (postSnapshot.exists()) {
      const postData = postSnapshot.val();
      const currentLikesCount = postData.likesCount || 0;
      await update(postRef, {
        likesCount: Math.max(currentLikesCount - 1, 0) // Ensure likesCount doesn't go below 0
      });
    }

    console.log('Like removed successfully');
  } catch (error) {
    console.error('Error removing like:', error);
  }
};

// Function to get the likes count for a post
export const getLikesCount = async (postId) => {
  try {
    const postRef = ref(db, `posts/${postId}`);
    const postSnapshot = await get(postRef);
    
    if (postSnapshot.exists()) {
      const postData = postSnapshot.val();
      const likesSnapshot = await get(ref(db, `posts/${postId}/likes`));

      if (likesSnapshot.exists()) {
        // Count the number of likes
        const likesCount = Object.keys(likesSnapshot.val()).length;
        return likesCount;
      } else {
        // No likes found
        return 0;
      }
    } else {
      // Post not found
      return 0;
    }
  } catch (error) {
    console.error('Error getting likes count:', error);
    return 0;
  }
};

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

export async function deletedatafromdb  (path) {
  const db = getDatabase();
  const reference = ref(db, path);
  try {
      await remove(reference);
  } catch (error) {
      console.error(`Error removing data from path: ${path}`, error);
      throw error;
  }
};

export function savetesttodb(data) {
  if (auth.currentUser) {
    let dataRef = ref(db, "testimonials/" + data.time);
    set(dataRef, data)
      .catch((error) => {
        console.error("Error writing testimonial: ", error);
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

// export const checkBatchRep = async (uid) => {
//   const db = getDatabase();
//   const dbRef = ref(db);
  
//   try {
//     const snapshot = await get(child(dbRef, `userroles/batchreps/${uid}`));
//     return snapshot.exists();
//   } catch (error) {
//     console.error("Error checking batch rep status:", error);
//     return false;
//   }
// };

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

export async function deleteImageFromStorage(location, imageUrl) {
  const storageRef = sref(storage, location);
  const res = await listAll(storageRef);
  for (let i = 0; i < res.items.length; i++) {
    const fileRef = res.items[i];
    const fileUrl = await getDownloadURL(fileRef);
    if (fileUrl === imageUrl) {
      await deleteObject(fileRef);
      break;
    }
  }
}

export async function uploadadminImageToStorage(location, imageFile) {
  console.log("saving image at",location)
  try {
    const compressor = new ImageCompressor();
    const compressedImage = await compressor.compress(imageFile, {
      maxWidth: 720,
      maxHeight: 540,
      quality: 0.8,
      mimeType: 'image/webp',
    });
  console.log(compressedImage)
    const originalFilename = imageFile.name.split('.').slice(0, -1).join('.');
    console.log("image named ",originalFilename," compressed")
    const renamedFile = new File([compressedImage], `${originalFilename}.webp`, {
      type: 'image/webp'
    });

    const storageRef = sref(storage, `${location}/${renamedFile.name}`);
    await uploadBytes(storageRef, renamedFile);
    const imageUrl = await getDownloadURL(storageRef);
    console.log("iamge url is",imageUrl)
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}