import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup,onAuthStateChanged } from "firebase/auth";
import { getStorage, ref as sref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { getDatabase, set, get, ref, update, remove} from "firebase/database"; 
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
      console.error(error, "\n error Code:", error.code, "\n Error Message: ", error.message);
    });
  }
}
export const checkIfUserSignedIn = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (user) {
        try {
          const approvedUsers = await getdatafromdb('approvedUsers');
          if (approvedUsers && approvedUsers[user.uid]) {
            resolve(user); 
          } else {
            resolve(null); 
          }
        } catch (error) {
          reject(error); 
        }
      } else {
        resolve(null);
      }
    }, reject);
  });
};
export async function checkuserrole(role) {
  return new Promise((resolve) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userEmail = user.email.replace('.', '_');
        const roleLocation = `userroles/${role}`;

        try {
          const data = await getdatafromdb(roleLocation);
          resolve(data ? Boolean(data[userEmail]) : false);
        } catch (error) {
          console.error("Error getting document: ", error);
          resolve(false);
        }
      } else {
        console.error("No user signed in");
        resolve(false);
      }
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
export async function getdatafromdb(location) {
  const userRef = ref(db, location);
  return get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.error("No data available");
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
async function compressImage(imageFile) {
  const compressor = new ImageCompressor();
  const compressedImage = await compressor.compress(imageFile, {
    maxWidth: 720,
    maxHeight: 540,
    quality: 0.8,
    mimeType: 'image/webp',
  });
  return new File([compressedImage], imageFile.name, {
    type: 'image/webp'
  });
}

export async function uploadImgToStorage(location, imageFile) {
  try {
    const renamedFile = await compressImage(imageFile);
    const storageRef = sref(storage, `${location}/${renamedFile.name}`);
    await uploadBytes(storageRef, renamedFile);
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export async function updateprofilepic(userId, imageFile) {
  const folderPath = `profile_images/${userId}`;
  const folderRef = sref(storage, folderPath);
  const files = await listAll(folderRef);
  const deletePromises = files.items.map((fileRef) => deleteObject(fileRef));
  await Promise.all(deletePromises);
  const imageBlob = imageFile.slice(0, imageFile.size, imageFile.type);
       const newImageFile = new File([imageBlob], 'profilepic.webp', { type: imageFile.type });
       const imageUrl = await uploadImgToStorage(folderPath, newImageFile);
      return imageUrl;
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
export const addLike = async (postId, userId) => {
  try {
    const postRef = ref(db, `content/approvedposts/${postId}`);
    const likesRef = ref(db, `content/approvedposts/${postId}/likes/${userId}`);
    await set(likesRef, true);
    const postSnapshot = await get(postRef);
    if (postSnapshot.exists()) {
      const postData = postSnapshot.val();
      const currentLikesCount = postData.likesCount || 0;
      await update(postRef, {
        likesCount: currentLikesCount + 1
      });
    }
  } catch (error) {
    console.error('Error adding like:', error);
  }
};

export const removeLike = async (postId, userId) => {
  try {
    const postRef = ref(db, `content/approvedposts/${postId}`);
    const likesRef = ref(db, `content/approvedposts/${postId}/likes/${userId}`);
    await remove(likesRef);
    const postSnapshot = await get(postRef);
    if (postSnapshot.exists()) {
      const postData = postSnapshot.val();
      const currentLikesCount = postData.likesCount || 0;
      await update(postRef, {
        likesCount: Math.max(currentLikesCount - 1, 0) 
      });
    }
  } catch (error) {
    console.error('Error removing like:', error);
  }
};
export const getLikesCount = async (postId) => {
  try {
    const postRef = ref(db, `content/approvedposts/${postId}`);
    const postSnapshot = await get(postRef);
    
    if (postSnapshot.exists()) {
      const postData = postSnapshot.val();
      const likesSnapshot = await get(ref(db, `content/approvedposts/${postId}/likes`));

      if (likesSnapshot.exists()) {
        const likesCount = Object.keys(likesSnapshot.val()).length;
        return likesCount;
      } else {
        return 0;
      }
    } else {
      
      return 0;
    }
  } catch (error) {
    console.error('Error getting likes count:', error);
    return 0;
  }
};
