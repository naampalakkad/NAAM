import React, { useState, useEffect } from 'react';
import { VStack, Button, List, ListItem, useToast, Box, Heading, Text,SimpleGrid, Avatar, Spinner, Card, useColorModeValue } from '@chakra-ui/react';
import { savedatatodb, deletedatafromdb, getdatafromdb } from '@/lib/firebase';

const AdminUserManagerPanel = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [approvedUsers, setApprovedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();
    const cardBg = useColorModeValue('gray.50', 'gray.700');
    const tealTint = useColorModeValue('teal.100', 'teal.900');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await getdatafromdb('users') || {};
                const approvedUsers = await getdatafromdb('approvedUsers') || {};
    
                const usersArray = Object.keys(usersData).map(uid => ({
                    uid,
                    ...usersData[uid],
                }));
    
                setAllUsers(usersArray.filter(user => !approvedUsers[user.uid]));
                setApprovedUsers(Object.values(approvedUsers));
            } catch (error) {
                toast({
                    title: "Error fetching data.",
                    description: error.message,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [toast]);
    

    const handleApproveUser = async (user) => {
        try {
            await savedatatodb(`approvedUsers/${user.uid}`, user);
            await deletedatafromdb(`users/${user.uid}`);
            setAllUsers(prev => prev.filter(u => u.uid !== user.uid));
            setApprovedUsers(prev => [...prev, user]);
            toast({
                title: "User approved.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error approving user.",
                description: error.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };

    const handleUnapproveUser = async (user) => {
        try {
            await savedatatodb(`users/${user.uid}`, user);
            await deletedatafromdb(`approvedUsers/${user.uid}`);
            setApprovedUsers(prev => prev.filter(u => u.uid !== user.uid));
            setAllUsers(prev => [...prev, user]);
            toast({
                title: "User unapproved.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error unapproving user.",
                description: error.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };

    const handleRemoveUser = async (id) => {
        try {
            await deletedatafromdb(`users/${id}`);
            setAllUsers(prev => prev.filter(user => user.uid !== id));
            toast({
                title: "User removed.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error removing user.",
                description: error.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };

    if (loading) {
        return (
            <Box textAlign="center" py={10}>
                <Spinner size="xl" />
                <Text mt={4}>Loading...</Text>
            </Box>
        );
    }

    return (
<VStack spacing={6} align="stretch">
    <Box>
        <Heading size="xl" textAlign="center" p={2} m={2} borderRadius="md">Pending Users</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} maxHeight="50vh" overflowY="auto">
            {allUsers.map(user => (
                <Box key={user.uid} borderRadius="md" boxShadow="md" bg={cardBg}>
                    <Card p={4}>
                        <Box display="flex" alignItems="center" mb={4}>
                            <Avatar size="lg" src={user.photoURL || `/assets/usericon.webp`} />
                            <Box ml={4} flex="1">
                                <Text fontWeight="bold" fontSize="lg">{user.email}</Text>
                                {user.batch && <Text>{`Batch: ${user.batch}`}</Text>}
                                {user.number && <Text>{`Number: ${user.number}`}</Text>}
                                {user.rollno && <Text>{`Roll Number: ${user.rollno}`}</Text>}
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="flex-end" mt={4}>
                            <Button colorScheme="green" onClick={() => handleApproveUser(user)}>
                                Approve
                            </Button>
                            <Button colorScheme="red" ml={2} onClick={() => handleRemoveUser(user.uid)}>
                                Remove
                            </Button>
                        </Box>
                    </Card>
                </Box>
            ))}
        </SimpleGrid>
    </Box>

    <Box>
        <Heading size="xl" textAlign="center" p={2} m={2} borderRadius="md">Approved Users</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} maxHeight="50vh" overflowY="auto">
            {approvedUsers.map(user => (
                <Box key={user.uid} borderRadius="md" boxShadow="md" bg={cardBg}>
                    <Card p={4}>
                        <Box display="flex" alignItems="center" mb={4}>
                            <Avatar size="lg" src={user.photoURL || `/assets/usericon.webp`} />
                            <Box ml={4} flex="1">
                                <Text fontWeight="bold" fontSize="lg">{user.email}</Text>
                                {user.batch && <Text>{`Batch: ${user.batch}`}</Text>}
                                {user.number && <Text>{`Number: ${user.number}`}</Text>}
                                {user.rollno && <Text>{`Roll Number: ${user.rollno}`}</Text>}
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="flex-end" mt={4}>
                            <Button colorScheme="yellow" onClick={() => handleUnapproveUser(user)}>
                                Unapprove
                            </Button>
                        </Box>
                    </Card>
                </Box>
            ))}
        </SimpleGrid>
    </Box>
</VStack>

    );
};

export default AdminUserManagerPanel;