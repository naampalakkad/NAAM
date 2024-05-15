'use client'
import React, { useEffect, useState } from "react";
import {
  auth,
  savedatatodb,
  getuserdetailfromdb,
  uploadImageToStorage,
} from "@/lib/firebase";
import './login.css';
import { onAuthStateChanged } from "firebase/auth";
import { personaldetailsdata } from "../homepage/data";
import SigninBox from "./signin";
import SignedInBox from "./profilepage";
import { useToast } from "@chakra-ui/react";



export default function profilePage() {

  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [phonepermission, setPermission] = useState(false);
  const [about, setAbout] = useState('');
  const toast = useToast();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setProfileImage(user.photoURL);
        const userdata = await getuserdetailfromdb(user.uid);
        setdatacolumns(userdata);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  function setdatacolumns(userdata) {
    if (!userdata) {
      console.error(' no userdata provided');
      return;
    }
    setProfileImage(userdata.photo);
    setPermission(userdata.phoneperm);
    setAbout(userdata.about);

    for (const { name, type } of personaldetailsdata) {
      const input = document.getElementById(`profile${name}`);
      if ((input) && userdata[name]) {
        input.value = userdata[name] ? userdata[name] : null;
        input.type = type;
      } else {
        console.warn(`No detaillist input found with ID: profile${name}`);
      }
    }
  }

  function updateFirebaseUserData() {
    let userdetails = {}
    userdetails["photo"] = profileImage;
    userdetails["phoneperm"] = phonepermission;
    userdetails["about"] = about;
    personaldetailsdata.forEach(detail => {
      const input = document.getElementById("profile" + detail.name);
      if ((input) && (input.value)) {
        userdetails[detail.name] = input.value;
      }
    });
    savedatatodb("users/" + user.uid, userdetails);
    toast({
      title: 'Success',
      description: " Successfully updated your profile.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    console.log("new image: " + file)
    if (!file) return;
  
    try {
      // Upload the image to storage and get the image URL
      const imageUrl = await uploadImageToStorage(user.uid, file);
      
      // Get the existing user details from the Firebase database
      const existingUserDetails = await getuserdetailfromdb(user.uid);
      
      // Merge the existing user details with the new photo URL
      const updatedUserDetails = {
        ...existingUserDetails,
        photo: imageUrl
      };
  
      // Update the user details in the Firebase database
      await savedatatodb("users/" + user.uid, updatedUserDetails);
  
      // Update the profile image state
      setProfileImage(imageUrl);
  
      // Show success toast
      toast({
        title: "Success",
        description: "Changed your profile image",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    
    } catch (error) {
      console.error("Error uploading image:", error);
  
      // Show error toast
      toast({
        title: "Error",
        description: "Couldn't upload image, try again",
        status: 'error', // Changed status to 'error' to indicate failure
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  

  const handlePermissionChange = () => {
    setPermission(!phonepermission);
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  return (
    user ? (
      <SignedInBox
        user={user}
        profileImage={profileImage}
        phonepermission={phonepermission}
        about={about}
        handlePermissionChange={handlePermissionChange}
        updateFirebaseUserData={updateFirebaseUserData}
        handleImageChange={handleImageChange}
        handleAboutChange={handleAboutChange}
        personaldetailsdata={personaldetailsdata}
      />
    ) : (
      <SigninBox/>
    )
  );
}
