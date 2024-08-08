import React, { useState, useEffect } from 'react';
import { VStack, Button, List, ListItem, useToast, Box, Heading, Text, Avatar, Spinner, Card, useColorModeValue } from '@chakra-ui/react';
import { savedatatodb, deletedatafromdb, getdatafromdb } from '@/lib/firebase';

const BatchRepPanel = ({ batchRepUID }) => {
    const [batchUsers, setBatchUsers] = useState([]);
    const [approvedUsers, setApprovedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();
    const cardBg = useColorModeValue('gray.50', 'gray.700');
    const tealTint = useColorModeValue('teal.100', 'teal.900');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await getdatafromdb('users') || {};
                const batchRepData = await getdatafromdb(`userroles/batchreps/${batchRepUID}`) || {};
                if (usersData && batchRepData) {
                    const usersArray = Object.keys(usersData).map(uid => ({
                        uid,
                        ...usersData[uid],
                    }));
                    const batch = batchRepData.batch;
                    const filteredUsers = usersArray.filter(user => user.batch === batch);
    
                    const approvedUsersData = await getdatafromdb('approvedUsers');
                    const approvedUsersArray = Object.keys(approvedUsersData || {}).map(uid => ({
                        uid,
                        ...approvedUsersData[uid],
                    }));
                    const filteredApprovedUsers = approvedUsersArray.filter(user => user.batch === batch);
    
                    setBatchUsers(filteredUsers.filter(user => !filteredApprovedUsers.some(approvedUser => approvedUser.uid === user.uid)));
                    setApprovedUsers(filteredApprovedUsers);
                }
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
    }, [toast, batchRepUID]);
    

    const handleApproveUser = async (user) => {
        try {
            await savedatatodb(`approvedUsers/${user.uid}`, user);
            await deletedatafromdb(`users/${user.uid}`);
            setBatchUsers(prev => prev.filter(u => u.uid !== user.uid));
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
            setBatchUsers(prev => [...prev, user]);
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
            setBatchUsers(prev => prev.filter(user => user.uid !== id));
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
            <Heading size="3xl" textAlign="center"  p={1} mt={3} borderRadius="md">Batch Management</Heading>
            <Box>
                <Heading size="2xl" textAlign="center"  p={2} m={5} borderRadius="md">Approved Users</Heading>
                <List spacing={2} maxHeight="50vh" overflowY="auto">
                    {approvedUsers.map(user => (
                        <ListItem key={user.uid} borderRadius="md" boxShadow="md" bg={cardBg}>
                            <Card p={4}>
                                <Box display="flex" alignItems="center">
                                    <Avatar size="lg" src={user.photoURL || `/assets/usericon.webp`} />
                                    <Box ml={4} flex="1">
                                        <Text fontWeight="bold" fontSize="lg">{user.email}</Text>
                                        {user.batch && <Text>{`Batch: ${user.batch}`}</Text>}
                                        {user.number && <Text>{`Number: ${user.number}`}</Text>}
                                        {user.rollno && <Text>{`Roll Number: ${user.rollno}`}</Text>}
                                    </Box>
                                    <Button colorScheme="yellow" onClick={() => handleUnapproveUser(user)}>
                                        Unapprove
                                    </Button>
                                </Box>
                            </Card>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box>
                <Heading size="2xl" textAlign="center" p={2} m={5} borderRadius="md">Non-Approved Users</Heading>
                <List spacing={2} maxHeight="50vh" overflowY="auto">
                    {batchUsers.map(user => (
                        <ListItem key={user.uid} borderRadius="md" boxShadow="md" bg={cardBg}>
                            <Card p={4}>
                                <Box display="flex" alignItems="center">
                                    <Avatar size="lg" src={user.photoURL || `/assets/usericon.webp`} />
                                    <Box ml={4} flex="1">
                                        <Text fontWeight="bold" fontSize="lg">{user.email}</Text>
                                        {user.batch && <Text>{`Batch: ${user.batch}`}</Text>}
                                        {user.number && <Text>{`Number: ${user.number}`}</Text>}
                                        {user.rollno && <Text>{`Roll Number: ${user.rollno}`}</Text>}
                                    </Box>
                                    <Button colorScheme="green" onClick={() => handleApproveUser(user)}>
                                        Approve
                                    </Button>
                                    <Button colorScheme="red" ml={2} onClick={() => handleRemoveUser(user.uid)}>
                                        Remove
                                    </Button>
                                </Box>
                            </Card>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </VStack>
    );
};

export default BatchRepPanel;
