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
import { personaldetailsdata } from "@/lib//data";
import SigninBox from "./signin";
import SignedInBox from "./profilepage";
import { useToast } from "@chakra-ui/react";
import { Flex, Heading, Spinner } from "@chakra-ui/react";

export default function ProfilePage() {

  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setProfileImage(user.photoURL);
        const userdataa = await getuserdetailfromdb(user.uid);
        setdatacolumns(userdataa);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  function setdatacolumns(userdata) {
    
    if (!userdata) {
      console.error('No userdata provided');
      return;
    }
    setProfileImage(userdata.photo);

    for (const { name, type } of personaldetailsdata) {
      const input = document.getElementById(`profile${name}`);
      if (input && userdata[name] && input.type =="checkbox") {
        input.checked = userdata[name];
      } else if (input && userdata[name]) {
        input.value = userdata[name];
      } else {
        console.warn(`No detaillist input found with ID: profile${name}`);
      }
    }
  }

  function updateFirebaseUserData() {
    let userdetails = {};
    userdetails["photo"] = profileImage;
    personaldetailsdata.forEach(detail => {
      const input = document.getElementById("profile" + detail.name);
      if (input && input.value && input.type == "checkbox") {
        userdetails[detail.name] = input.checked;
      } else if(input && input.value) {
        userdetails[detail.name] = input.value;
      }
    });
    
    savedatatodb("users/" + user.uid, userdetails);
    toast({
      title: 'Success',
      description: "Successfully updated your profile.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImageToStorage(user.uid, file);
      const existingUserDetails = await getuserdetailfromdb(user.uid);
      const updatedUserDetails = {
        ...existingUserDetails,
        photo: imageUrl
      };
      savedatatodb("users/" + user.uid, updatedUserDetails);
      setProfileImage(imageUrl);
      toast({
        title: "Success",
        description: "Changed your profile image",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Couldn't upload image, try again",
        status: 'error', 
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      {user === null ? ( 
            <Flex justifyContent="center" alignItems="center" h="60vh" flexDirection="column">
            <Spinner size="xl" color="blue.500" />
            <Heading mt={4} fontSize="xl" color="gray.600" textAlign="center">Loading...</Heading>
          </Flex>
      ): user? (
      <SignedInBox
        user={user}
        profileImage={profileImage}
        updateFirebaseUserData={updateFirebaseUserData}
        handleImageChange={handleImageChange}
        personaldetailsdata={personaldetailsdata} 
      />
    ) : (
      <SigninBox/>
    ) }
    </Flex>
  ) 
}
