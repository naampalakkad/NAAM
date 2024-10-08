import React, { useState, useEffect } from 'react';
import {
    VStack, Button, List, ListItem, useToast, Box, Heading, Text, Avatar, Spinner, Card, Flex,
    SimpleGrid,
} from '@chakra-ui/react';
import { savedatatodb, deletedatafromdb, getdatafromdb, auth } from '@/lib/firebase';

const BatchRepPanel = () => {
    const [batchUsers, setBatchUsers] = useState([]);
    const [approvedUsers, setApprovedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isBatchRep, setIsBatchRep] = useState(false);
    const [batchRepDetails, setBatchRepDetails] = useState(null);
    const toast = useToast();
    const currentUserEmail = auth.currentUser?.email.replace(/\./g, '_'); // Format email for Firebase

    useEffect(() => {
        const fetchBatchData = async () => {
            setLoading(true);
            try {
                // Check if the user is a batch representative
                const batchRepData = await getdatafromdb(`userroles/batchreplist/${currentUserEmail}`);
                console.log('Batch Rep Data:', batchRepData); // Debugging
                if (!batchRepData) {
                    setIsBatchRep(false);
                    return;
                }

                setIsBatchRep(true);
                setBatchRepDetails(batchRepData); // Store batch rep details for display

                const [approvedUsersData, usersData] = await Promise.all([
                    getdatafromdb('approvedUsers') || {},
                    getdatafromdb('users') || {},
                ]);
                console.log('Approved Users Data:', approvedUsersData); // Debugging
                console.log('Users Data:', usersData); // Debugging

                const batchRep = Object.values(approvedUsersData).find(user => user.email === auth.currentUser?.email);

                if (!batchRep?.batch) {
                    toast({
                        title: 'Batch information not found.',
                        description: 'No batch data associated with this user.',
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                    });
                    return;
                }

                const userBatch = batchRep.batch;
                const usersArray = Object.keys(usersData).map(uid => ({ uid, ...usersData[uid] }));
                const filteredApprovedUsers = Object.values(approvedUsersData).filter(user => user.batch === userBatch);
                const filteredBatchUsers = usersArray.filter(user =>
                    user.batch === userBatch && !filteredApprovedUsers.some(approved => approved.uid === user.uid),
                );

                setApprovedUsers(filteredApprovedUsers);
                setBatchUsers(filteredBatchUsers);
            } catch (error) {
                toast({
                    title: 'Error fetching data.',
                    description: error.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };

        if (currentUserEmail) {
            fetchBatchData();
        }
    }, [toast, currentUserEmail]);

    const handleUserUpdate = async (user, approve) => {
        try {
            if (approve) {
                await savedatatodb(`approvedUsers/${user.uid}`, user);
                await deletedatafromdb(`users/${user.uid}`);
                setBatchUsers(prev => prev.filter(u => u.uid !== user.uid));
                setApprovedUsers(prev => [...prev, user]);
                toast({ title: 'User approved.', status: 'success', duration: 2000, isClosable: true });
            } else {
                await savedatatodb(`users/${user.uid}`, user);
                await deletedatafromdb(`approvedUsers/${user.uid}`);
                setApprovedUsers(prev => prev.filter(u => u.uid !== user.uid));
                setBatchUsers(prev => [...prev, user]);
                toast({ title: 'User unapproved.', status: 'success', duration: 2000, isClosable: true });
            }
        } catch (error) {
            toast({
                title: 'Error updating user.',
                description: error.message,
                status: 'error',
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

    if (!isBatchRep) {
        return (
            <Box textAlign="center" py={10}>
                <Heading size="lg">You are not a batch representative.</Heading>
            </Box>
        );
    }

    const UserCard = ({ user, onAction, actionLabel, actionColor }) => (
        <Card p={4} display="flex" flexDirection= {'row' } alignItems="center" key={user.uid} borderRadius="sm">
            <Box display="flex" flexDirection="row" alignItems="center">
                <Avatar size="md" src={user.photoURL || `/assets/usericon.webp`} />
                <Box p={2} maxWidth="200px" overflow="hidden">
                    <Text  isTruncated>{user.name}</Text>
                    <Text isTruncated>{user.email}</Text>
                    <Text isTruncated>{`Batch: ${user.batch}`}</Text>
                    <Text isTruncated>{`Roll No: ${user.rollno || 'N/A'}`}</Text>
                </Box>
            </Box>
            <Button p={2} colorScheme={actionColor} onClick={() => onAction(user)}>
                {actionLabel}
            </Button>
        </Card>
    );

    return (
        <VStack spacing={2} align="stretch" p={2}>

            <Heading size="lg" textAlign="center">Batch Management</Heading>

            {/* Approved Users */}
            <Box>
                <Heading size="md" m={5}  textAlign="center">Approved Users</Heading>
                <SimpleGrid
                    spacing={2}
                    maxHeight="50vh"
                    overflowY="auto"
                    columns={{ sm: 1, md: 2, lg: 3 }}
                >
                    {approvedUsers.map(user => (
                        <UserCard
                            key={user.uid}
                            user={user}
                            onAction={() => handleUserUpdate(user, false)}
                            actionLabel="Unapprove"
                            actionColor="yellow"
                        />
                    ))}
                </SimpleGrid>
            </Box>

            {/* Non-approved Users */}
            <Box>
                <Heading size="md" m={5} textAlign="center">Non-approved Users</Heading>
                <SimpleGrid
                    spacing={2}
                    maxHeight="50vh"
                    overflowY="auto"
                    columns={{ sm: 1, md: 2, lg: 3 }}
                >
                    {batchUsers.map(user => (
                        <UserCard
                            key={user.uid}
                            user={user}
                            onAction={() => handleUserUpdate(user, true)}
                            actionLabel="Approve"
                            actionColor="green"
                        />
                    ))}
                </SimpleGrid>
            </Box>
        </VStack>
    );
};

export default BatchRepPanel;
