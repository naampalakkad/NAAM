'use client'
import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import './login.css';
import { onAuthStateChanged } from "firebase/auth";
import { Flex, Heading, Spinner} from "@chakra-ui/react";
import SigninBox from "./signin";
import SignedInBox from "./profilepage";

export default function ProfilePage() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Flex flexDirection="column" alignItems="center">
      {user === null ? (
        <Flex justifyContent="center" alignItems="center" h="60vh" flexDirection="column">
          <Spinner size="xl" color="blue.500" />
          <Heading mt={4} fontSize="xl" color="gray.600" textAlign="center">Loading...</Heading>
        </Flex>
      ) : user ? (
        <SignedInBox user={user}/>
      ) : (
        <SigninBox />
      )}
    </Flex>
  );
}