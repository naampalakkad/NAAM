'use client'
import React, { useState, useEffect } from 'react';
import { Flex, Heading, Button, Spinner } from "@chakra-ui/react";
import { checkIfUserSignedIn, checkuserrole } from "@/lib/firebase";
import AdminPanel from "./adminpanel";

export default function AlumniListPage() {
  const [userSignedIn, setUserSignedIn] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkSignIn = async () => {
      const user = await checkIfUserSignedIn();
      if (user) {
        setUserSignedIn(true);
        const isUserAdmin = await checkuserrole('admin');
        setIsAdmin(isUserAdmin);
      } else {
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
          <Heading mt={4} fontSize="xl" color="gray.600" textAlign="center">Loading...</Heading>
        </Flex>
      ) : !userSignedIn ? (
        <Flex justifyContent="center" alignItems="center" h="60vh" flexDirection="column">
          <Heading fontSize="4xl" color="gray.600" textAlign="center">You need to sign in first</Heading>
          <Button colorScheme="blue" mt={4} onClick={signInRedirect}>Sign In</Button>
        </Flex>
      ) : !isAdmin ? (
        <Flex justifyContent="center" alignItems="center" h="60vh" flexDirection="column">
          <Heading fontSize="4xl" color="gray.600" textAlign="center">Only admin users can access this page</Heading>
        </Flex>
      ) : (
        <AdminPanel />
      )}
    </Flex>
  );
}