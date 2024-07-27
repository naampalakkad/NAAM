import React, { useState, useEffect } from 'react';
import { VStack, Button, Input, List, ListItem, useToast, Box, Heading, Text } from '@chakra-ui/react';
import { savedatatodb, deletedatafromdb, getdatafromdb } from '@/lib/firebase';

const BatchRepManager = () => {
    const [batchReps, setBatchReps] = useState([]);
    const [users, setUsers] = useState({});
    const [newRepEmail, setNewRepEmail] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch batch representatives
                const repsData = await getdatafromdb('userroles/batchreps');
                if (repsData) {
                    setBatchReps(Object.values(repsData));
                }

                // Fetch all users
                const usersData = await getdatafromdb('users');
                if (usersData) {
                    setUsers(usersData);
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
        const filtered = Object.values(users).filter(user => user.email.includes(e.target.value));
        setFilteredUsers(filtered);
    };

    const handleAddRep = async (user) => {
        const newRep = {
            id: user.uid,
            email: user.email,
            batch: user.batch,
        };

        try {
            await savedatatodb(`userroles/batchreps/${newRep.id}`, newRep);
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

    const handleRemoveRep = async (id) => {
        try {
            await deletedatafromdb(`userroles/batchreps/${id}`);
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
        return <Box textAlign="center">Loading...</Box>;
    }

    return (
        <VStack spacing={4} align="stretch">
            <Heading size="lg">Batch Representatives</Heading>
            <Box>
                <Input
                    placeholder="Enter email"
                    value={newRepEmail}
                    onChange={handleEmailChange}
                />
                {filteredUsers.length > 0 && (
                    <List spacing={3} mt={2}>
                        {filteredUsers.map(user => (
                            <ListItem key={user.uid} onClick={() => handleAddRep(user)} cursor="pointer" _hover={{ bg: 'gray.100' }}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Text>{user.email}</Text>
                                    <Text>{user.batch && `Batch: ${user.batch}`}</Text>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
            <List spacing={3}>
                {batchReps.map(rep => {
                    const user = users[rep.id] || {};
                    return (
                        <ListItem key={rep.id}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Text>{user.email || 'User not signed in'}</Text>
                                    {user.batch && <Text>{`Batch: ${user.batch}`}</Text>}
                                </Box>
                                <Button colorScheme="red" onClick={() => handleRemoveRep(rep.id)}>
                                    Remove
                                </Button>
                            </Box>
                        </ListItem>
                    );
                })}
            </List>
        </VStack>
    );
};

export default BatchRepManager;
