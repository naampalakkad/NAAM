import React, { useState, useEffect } from 'react';
import { signInoutWithGoogle,checkIfUserSignedIn,checkuserrole  } from "@/lib/firebase";
import { Box, Heading, Image, Flex, Button, Card,Badge } from "@chakra-ui/react";
import { FaEdit, FaSignOutAlt, FaUpload } from "react-icons/fa";

const ProfileSection = ({ user, profileImage, handleImageChange, onEdit,verified }) => {
    const handleSignOut = () => {
        signInoutWithGoogle();
    };

    const [isUserAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      const checkSignIn = async () => {
        const user = await checkIfUserSignedIn();
        if (user) {
          const isUserAdmin = await checkuserrole('admin');
          const isUserBatchRep = await checkuserrole('batchreplist');
          setIsAdmin(isUserAdmin || isUserBatchRep);
        } else {
          setIsAdmin(false);
        }
      };
  
      checkSignIn();
    }, []);

    return (

            <Card
                p={3}
                m={1}
                textAlign="center"
                borderRadius="md"
                boxShadow="sm"
                flex={{ base: '1', md: '1' }}
                w={{ base: '100%', md: '40%' }}
                mb={{ base: 4, md: 0 }}
            >
                <Image
                    src={profileImage || './assets/usericon.webp'}
                    alt={user.displayName}
                    fallbackSrc="./assets/usericon.webp"
                    borderRadius="full"
                    width={"150px"}
                    height={"150px"}
                    objectFit="cover"
                    mx="auto"
                    mb={4}
                />
                <Heading as="h3" size="lg" mb={2}>
                    {user.displayName}
                </Heading>
                <Box fontSize="sm" color="gray.600" mb={4}>
                    {user.email}
                </Box>
               {verified? 
                <Badge colorScheme={"green"} p={3} mb={4}>
                    verified
                </Badge>:
                 <Badge  colorScheme={"yellow"} p={3} mb={4} >
                 pending Approval
                </Badge>}
                <Button onClick={handleSignOut} colorScheme="blue" size="sm" mb={2} leftIcon={<FaSignOutAlt />}>
                    Sign out
                </Button>
                <Button onClick={onEdit} colorScheme="teal" size="sm" leftIcon={<FaEdit />}>
                    Edit Profile
                </Button>
                <Button onClick={() => document.getElementById('profileImageInput').click()} colorScheme="green" size="sm" mt={2} leftIcon={<FaUpload />}>
                    Update Profile Picture
                </Button>
                <input
                    type="file"
                    id="profileImageInput"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
                {isUserAdmin&&<Button onClick={() => window.location.href="./admin"} colorScheme="blue" size="sm" mt={2} leftIcon={<FaUpload />}>
                    Go to Admin Panel
                </Button> }
            </Card>
    );
};

export default ProfileSection;
