import React, { useState, useEffect } from 'react';
import { VStack, Button, Input, List, ListItem, useToast, Box, Heading, Text, Avatar, Card, Spinner } from '@chakra-ui/react';
import { savedatatodb, deletedatafromdb, getdatafromdb } from '@/lib/firebase';

const BatchRepManager = () => {
    const [batchReps, setBatchReps] = useState([]);
    const [users, setUsers] = useState([]);
    const [newRepEmail, setNewRepEmail] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const repsData = await getdatafromdb('userroles/batchreps');
                if (repsData) {
                    setBatchReps(Object.values(repsData));
                }
                const usersData = await getdatafromdb('users');
                if (usersData) {
                    const usersArray = Object.keys(usersData).map(uid => ({
                        uid,
                        ...usersData[uid],
                    }));
                    setUsers(usersArray);
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
    }, [toast]);

    const handleEmailChange = (e) => {
        setNewRepEmail(e.target.value);
        const filtered = users.filter(user => user.email.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredUsers(filtered);
    };

    const handleAddRep = async (user) => {
        if (batchReps.some(rep => rep.email === user.email)) {
            toast({
                title: "User is already a batch representative.",
                status: "info",
                duration: 2000,
                isClosable: true,
            });
            return;
        }

        const newRep = {
            id: user.uid,
            email: user.email,
            batch: user.batch,
            number: user.number,
            photoURL: user.photoURL,
            rollno: user.rollno,
        };
        const emailKey = user.email.replace(/\./g, '_');

        try {
            await savedatatodb(`userroles/batchreps/${newRep.id}`, newRep);
            await savedatatodb(`userroles/batchreplist/${emailKey}`, true);
            setBatchReps(prev => [...prev, newRep]);
            setNewRepEmail('');
            setFilteredUsers([]);
            toast({
                title: "Batch representative added.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error adding batch representative.",
                description: error.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };

    const handleRemoveRep = async (id, email) => {
        const emailKey = email.replace(/\./g, '_');
        try {
            await deletedatafromdb(`userroles/batchreps/${id}`);
            await deletedatafromdb(`userroles/batchreplist/${emailKey}`);
            setBatchReps(prev => prev.filter(rep => rep.id !== id));
            toast({
                title: "Batch representative removed.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error removing batch representative.",
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
            <Heading size="lg" textAlign="center">Batch Representatives</Heading>
            <Box>
                <Input
                    placeholder="Enter email to search"
                    value={newRepEmail}
                    onChange={handleEmailChange}
                />
                {filteredUsers.length > 0 && (
                    <Box mt={2} border="1px" borderColor="gray.200" borderRadius="md" maxHeight="200px" overflowY="auto">
                        <List spacing={3}>
                            {filteredUsers.map(user => (
                                <ListItem key={user.uid} onClick={() => handleAddRep(user)} cursor="pointer" _hover={{ bg: 'gray.100' }} px={3} py={2}>
                                    <Box display="flex" alignItems="center">
                                        <Avatar size="sm" src={user.photoURL || 'https://i.imgur.com/y7q0v8p.png'} />
                                        <Box ml={3}>
                                            <Text fontWeight="bold">{user.email}</Text>
                                            <Text fontSize="sm">{user.batch && `Batch: ${user.batch}`}</Text>
                                        </Box>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}
            </Box>
            <List spacing={2} maxHeight="50vh" overflowY="auto">
                {batchReps.map(rep => (
                    <ListItem key={rep.id} borderRadius="md" boxShadow="md">
                        <Card p={2}>
                            <Box display="flex" alignItems="center">
                                <Avatar size="lg" src={rep.photoURL || 'https://i.imgur.com/y7q0v8p.png'} />
                                <Box ml={4} flex="1">
                                    <Text fontWeight="bold" fontSize="lg">{rep.email}</Text>
                                    {rep.batch && <Text>{`Batch: ${rep.batch}`}</Text>}
                                    {rep.number && <Text>{`Number: ${rep.number}`}</Text>}
                                    {rep.rollno && <Text>{`Roll Number: ${rep.rollno}`}</Text>}
                                </Box>
                                <Button colorScheme="red" onClick={() => handleRemoveRep(rep.id, rep.email)}>
                                    Remove
                                </Button>
                            </Box>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </VStack>
    );
};

export default BatchRepManager;
