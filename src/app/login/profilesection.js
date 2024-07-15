import React from 'react';
import { signInoutWithGoogle } from "@/lib/firebase";
import { Box, Heading, Image, Flex, Button, Card } from "@chakra-ui/react";
import { FaEdit, FaSignOutAlt, FaUpload } from "react-icons/fa";

const ProfileSection = ({ user, userdata, profileImage, handleImageChange, onEdit, personaldetailsdata, editing }) => {
    const handleSignOut = () => {
        signInoutWithGoogle();
    };

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
            </Card>
    );
};

export default ProfileSection;
