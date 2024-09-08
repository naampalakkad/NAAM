'use client'
import React, { useState, useEffect } from 'react';
import { Flex, Heading, Button, Spinner, Box, Text, Icon } from "@chakra-ui/react";
import { FaUserLock, FaUserClock } from 'react-icons/fa';
import { checkIfUserSignedIn } from "@/lib/firebase";

export default function AuthChecker({ children }) {
  const [authStatus, setAuthStatus] = useState('loading');

  useEffect(() => {
    const checkSignIn = async () => {
      const user = await checkIfUserSignedIn();
      if (user) {
        if (user.status === 'pending') {
          setAuthStatus('pending');
        } else {
          setAuthStatus('authenticated');
        }
      } else {
        setAuthStatus('unauthenticated');
      }
    };
    checkSignIn();
  }, []);

  const signInRedirect = () => {
    window.location.href = '/profile';
  };

  const cardStyle = {
    borderWidth: '1px',
    borderRadius: 'lg',
    overflow: 'hidden',
    boxShadow: 'lg',
    padding: 6,
    maxW: '400px',
    textAlign: 'center',
  };

  if (authStatus === 'loading') {
    return (
      <Flex justifyContent="center" alignItems="center" h="60vh" flexDirection="column">
        <Box {...cardStyle}>
          <Spinner size="xl" color="blue.500" />
          <Heading mt={4} fontSize="xl" color="gray.700">Checking your credentials...</Heading>
          <Text mt={2} fontSize="md" color="gray.500">Please wait a moment while we verify your account.</Text>
        </Box>
      </Flex>
    );
  }

  if (authStatus === 'unauthenticated') {
    return (
      <Flex justifyContent="center" alignItems="center" h="60vh" flexDirection="column">
        <Box {...cardStyle}>
          <Icon as={FaUserLock} w={16} h={16} color="red.500" />
          <Heading fontSize="2xl" color="gray.700" mt={4}>Sign In to Continue</Heading>
          <Text fontSize="lg" color="gray.600" mt={2}>
            You need to sign in to view this page and get the full functionality of the site.
          </Text>
          <Button colorScheme="blue" mt={6} onClick={signInRedirect}>Sign In</Button>
        </Box>
      </Flex>
    );
  }

  if (authStatus === 'pending') {
    return (
      <Flex justifyContent="center" alignItems="center" h="60vh" flexDirection="column">
        <Box {...cardStyle}>
          <Icon as={FaUserClock} w={16} h={16} color="orange.400" />
          <Heading fontSize="2xl" color="gray.700" mt={4}>Pending Approval</Heading>
          <Text fontSize="lg" color="gray.600" mt={2}>
            Your account is currently under review.
          </Text>
          <Text mt={4} fontSize="md" color="gray.500">
            Contact your batch representative for approval. in the mean time, Complete your Profile.
          </Text>
          <Button colorScheme="blue" mt={6} onClick={signInRedirect}> Complete Profile</Button>
        </Box>
      </Flex>
    );
  }

  return (children);
}
