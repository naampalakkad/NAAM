'use client'
import React, { useState, useEffect } from 'react';
import { Flex, Heading, Button, Spinner } from "@chakra-ui/react";
import { checkIfUserSignedIn } from "@/lib/firebase";
import Calendar from "./calenderpage";

export default function CalenderPage() {
  const [userSignedIn, setUserSignedIn] = useState(null);

  useEffect(() => {
    const checkSignIn = async () => {
      const user = await checkIfUserSignedIn();
      setUserSignedIn(!!user);
    };
    checkSignIn();
  }, []);

  const signInRedirect = () => {
    window.location.href = '/login';
  };

  return (
    <> {userSignedIn==null? 
      <Flex justifyContent="center" alignItems="center" h="60vh">
      <Spinner size="xl" />
    </Flex>
    :!userSignedIn ? (
        <Flex justifyContent="center" alignItems="center" h="60vh" flexDirection="column">
          <Heading fontSize="4xl" color="gray.600" textAlign="center">You need to sign in first</Heading>
          <Button colorScheme="blue" mt={4} onClick={signInRedirect}>Sign In</Button>
        </Flex>
      ) : (
        <Calendar />
      )}
    </>
  );
};
