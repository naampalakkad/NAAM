'use client'
import React, { useState, useEffect } from 'react';
import { Flex, Heading, Button, Spinner } from "@chakra-ui/react";
import { checkIfUserSignedIn } from "@/lib/firebase";
import GalleryPage from './gallerypage';

export default function GalleryListPage() {
  const [userSignedIn, setUserSignedIn] = useState(null); 

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
      {userSignedIn === null ? ( 
        <Flex justifyContent="center" alignItems="center" h="60vh" flexDirection="column">
          <Spinner size="xl" color="blue.500" />
          <Heading mt={4} fontSize="xl" color="gray.600" textAlign="center"> Loading </Heading>
        </Flex>
      ) : !userSignedIn ? (
        <Flex justifyContent="center" alignItems="center" h="60vh" flexDirection="column">
          <Heading fontSize="4xl" color="gray.600" textAlign="center">You need to sign in first</Heading>
          <Button colorScheme="blue" mt={4} onClick={signInRedirect}>Sign In</Button>
        </Flex>
      ) : (
        <GalleryPage />
      )}
    </Flex>
  );
}