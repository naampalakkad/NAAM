import React, { useState, useEffect } from 'react';
import { VStack, Button, Input, List, ListItem, useToast, Box, Heading } from '@chakra-ui/react';
import { savedatatodb, deletedatafromdb, getdatafromdb } from '@/lib/firebase';

const BatchRepManager = () => {
    const [batchReps, setBatchReps] = useState([]);
    const [newRepName, setNewRepName] = useState('');
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const fetchBatchReps = async () => {
            try {
                const data = await getdatafromdb('userroles/batchreps');
                if (data) {
                    setBatchReps(Object.values(data));
                }
            } catch (error) {
                toast({
                    title: "Error fetching batch representatives.",
                    description: error.message,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchBatchReps();
    }, [toast]);

    const handleAddRep = async () => {
        if (newRepName.trim() === '') return;

        const newRep = {
            id: Date.now().toString(),
            name: newRepName.trim(),
        };

        try {
            await savedatatodb(`userroles/batchreps/${newRep.id}`, newRep);
            setBatchReps(prev => [...prev, newRep]);
            setNewRepName('');
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
                    placeholder="Enter name"
                    value={newRepName}
                    onChange={(e) => setNewRepName(e.target.value)}
                />
                <Button mt={2} colorScheme="teal" onClick={handleAddRep}>
                    Add Batch Representative
                </Button>
            </Box>
            <List spacing={3}>
                {batchReps.map(rep => (
                    <ListItem key={rep.id}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            {rep.name}
                            <Button colorScheme="red" onClick={() => handleRemoveRep(rep.id)}>
                                Remove
                            </Button>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </VStack>
    );
};

export default BatchRepManager;
