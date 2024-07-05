'use client'
import React, { useEffect, useState, useCallback } from "react";
import {
  auth,
  savedatatodb,
  getuserdetailfromdb,
  uploadImageToStorage,
} from "@/lib/firebase";
import './login.css';
import { onAuthStateChanged } from "firebase/auth";
import { personaldetailsdata } from "@/lib/data";
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
        const userdata = await getuserdetailfromdb(user.uid);
        setdatacolumns(userdata);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const setdatacolumns = useCallback((userdata) => {
    if (!userdata) {
      console.error('No userdata provided');
      return;
    }
    setProfileImage(userdata.photo);

    for (const { name, type } of personaldetailsdata) {
      const input = document.getElementById(`profile${name}`);
      
      if (input) {
        if (type === "checkbox") {
          input.checked = userdata[name] || false;
        } else {
          input.value = userdata[name] || '';
        }
      } else {
        console.warn(`No detaillist input found with ID: profile${name}`);
      }
    }
  }, []);

  const updateFirebaseUserData = useCallback(() => {
    let userdetails = {};
    userdetails["photo"] = profileImage;
    personaldetailsdata.forEach(detail => {
      const input = document.getElementById("profile" + detail.name);
      if (input) {
        if (input.type === "checkbox") {
          userdetails[detail.name] = input.checked;
        } else {
          userdetails[detail.name] = input.value;
        }
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
  }, [profileImage, toast, user]);

  const handleImageChange = useCallback(async (event) => {
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
  }, [toast, user]);

  return (
    <Flex flexDirection="column" alignItems="center">
      {user === null ? (
        <Flex justifyContent="center" alignItems="center" h="60vh" flexDirection="column">
          <Spinner size="xl" color="blue.500" />
          <Heading mt={4} fontSize="xl" color="gray.600" textAlign="center">Loading...</Heading>
        </Flex>
      ) : user ? (
        <SignedInBox
          user={user}
          profileImage={profileImage}
          updateFirebaseUserData={updateFirebaseUserData}
          handleImageChange={handleImageChange}
          personaldetailsdata={personaldetailsdata}
        />
      ) : (
        <SigninBox />
      )}
    </Flex>
  );
}
