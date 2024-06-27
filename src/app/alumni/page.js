'use client'
import React, { useState, useEffect } from 'react';
import { Flex, Heading, Button } from "@chakra-ui/react";
import { checkIfUserSignedIn } from "@/lib/firebase";
import AlumniList from "./alumnipage";

export default function AlumniListPage (){
  const [userSignedIn, setUserSignedIn] = useState(false);

  useEffect(() => {
    const checkSignIn = async () => {
      const user = await checkIfUserSignedIn();
      if (user) {
        console.log('User is signed in:', user);
        setUserSignedIn(true);
      } else {
        console.log('No user signed in');
        setUserSignedIn(false);
      }
    };
    checkSignIn();
  }, []);

  const signInRedirect = () => {
    window.location.href = '/login';
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      {!userSignedIn ? (
        <Flex justifyContent="center" alignItems="center" h="60vh" flexDirection="column">
          <Heading fontSize="4xl" color="gray.600" textAlign="center">You need to sign in first</Heading>
          <Button colorScheme="blue" mt={4} onClick={signInRedirect}>Sign In</Button>
        </Flex>
      ) : (
        <AlumniList/>
      )}
    </Flex>
  );
};