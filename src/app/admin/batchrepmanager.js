import React, { useState, useEffect, useMemo } from 'react';
import { VStack, Button, Input, List, ListItem, useToast, SimpleGrid, Box, Heading, Text, Avatar, Card, Spinner } from '@chakra-ui/react';
import { savedatatodb, deletedatafromdb, getdatafromdb } from '@/lib/firebase';
import debounce from 'lodash/debounce';

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
                const batchReplistData = await getdatafromdb('userroles/batchreplist');
                if (batchReplistData) {
                    const repEmails = Object.keys(batchReplistData).map(emailKey =>
                        emailKey.replace(/_/g, '.')
                    );

                    const usersData = await getdatafromdb('approvedUsers');
                    if (usersData) {
                        const usersArray = Object.keys(usersData).map(uid => ({
                            uid,
                            ...usersData[uid],
                        }));

                        const matchedBatchReps = usersArray.filter(user => repEmails.includes(user.email));
                        matchedBatchReps.sort((a, b) => a.batch - b.batch);

                        setBatchReps(matchedBatchReps);
                        setUsers(usersArray);
                    }
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

    const debouncedHandleEmailChange = useMemo(() => 
        debounce((e) => {
            const filtered = users.filter(user => 
                user.email.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setFilteredUsers(filtered);
        }, 300), [users]);

    const handleEmailChange = (e) => {
        setNewRepEmail(e.target.value);
        debouncedHandleEmailChange(e);
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

        const emailKey = user.email.replace(/\./g, '_');

        try {
            await savedatatodb(`userroles/batchreplist/${emailKey}`, true);
            setBatchReps(prev => [...prev, user]);
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

    const handleRemoveRep = async (email) => {
        const emailKey = email.replace(/\./g, '_');
        try {
            await deletedatafromdb(`userroles/batchreplist/${emailKey}`);
            setBatchReps(prev => prev.filter(rep => rep.email !== email));
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
        <VStack spacing={2} align="stretch">
            <Heading size="lg" textAlign="center">Batch Representatives</Heading>
            <Box maxW="sm" w="full" mx="auto">
                <Input
                    placeholder="Search users by email"
                    value={newRepEmail}
                    onChange={handleEmailChange}
                    mb={4}
                    size="md"
                    borderColor="gray.300"
                    fontSize={{ base: 'sm', md: 'md' }}
                />
                {filteredUsers.length > 0 && (
                    <Box
                        border="1px"
                        borderColor="gray.200"
                        borderRadius="md"
                        maxHeight="150px"
                        overflowY="scroll"
                        fontSize="sm"
                    >
                        <Heading variant="sm" textAlign={"center"} p={1}>Suggestions</Heading>
                        <List spacing={3}>
                            {filteredUsers.map(user => (
                                <ListItem key={user.uid} onClick={() => handleAddRep(user)} cursor="pointer" _hover={{ bg: 'gray.100' }} p={1}>
                                   <Card>
                                    <Box display="flex" alignItems="center">
                                        <Avatar size="sm" src={user.photoURL || `/assets/usericon.webp`} />
                                        <Box ml={3}>
                                            <Text fontWeight="bold" fontSize="sm">{user.name}</Text>
                                            <Text fontWeight="bold" fontSize="sm">{user.email}</Text>
                                            <Text fontSize="xs">{user.batch && `Batch: ${user.batch}`}</Text>
                                        </Box>
                                    </Box>
                                    </Card>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}
            </Box>
            <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3 }}
                spacing={2}
                maxHeight={{ base: 'auto', md: '50vh' }}
                overflowY="auto"
                p={2}
                w="full"
            >
                {batchReps.map(rep => (
                    <Box key={rep.uid} borderRadius="md" boxShadow="md">
                        <Card p={2}>
                            <Box display="flex" alignItems="center">
                                <Avatar size="lg" src={rep.photoURL || `/assets/usericon.webp`} />
                                <Box ml={1} flex="1" minW="0">
                                    <Text fontWeight="bold" fontSize="md" isTruncated>{rep.name || 'No Name'}</Text>
                                    <Text fontSize="sm">{`Batch: ${rep.batch || 'Not available'}`}</Text>
                                    <Text fontSize="sm" isTruncated>{`Roll Number: ${rep.rollno || 'Not Available'}`}</Text>
                                </Box>
                                <Button colorScheme="red" ml={4} onClick={() => handleRemoveRep(rep.email)}>
                                    Remove
                                </Button>
                            </Box>
                        </Card>
                    </Box>
                ))}
            </SimpleGrid>
        </VStack>
    );
};

export default BatchRepManager;
