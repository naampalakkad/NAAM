import React, { useState, useEffect } from 'react';
import RenderItems from './components/rendercontent';
import ItemModal from './components/contentmodel';
import { VStack, Spinner, useToast, Heading, useDisclosure, Box, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { getdatafromdb, savedatatodb, deletedatafromdb } from '@/lib/firebase';

const itemConfig = {
    posts: {
        pending: 'posts',
        approved: 'content/approvedposts',
        archived: 'content/archivedposts',
    },
    testimonials: {
        pending: 'testimonials',
        approved: 'content/approvedtestimonials',
        archived: 'content/archivedtestimonials',
    },
    events: {
        pending: 'content/pendingevents',
        approved: 'content/approvedevents',
        archived: 'content/archivedevents',
    },
};

const showToast = (toast, title, description, status) => {
    toast({
        title,
        description,
        status,
        duration: 2000,
        isClosable: true,
    });
};

const moveItem = async (item, action, setData, toast) => {
    const paths = {
        approve: ['pending', 'approved'],
        archive: ['approved', 'archived'],
        unarchive: ['archived', 'approved'],
        unapprove: ['approved', 'pending'],
        delete: ['pending', 'approved', 'archived'],
    };

    if (action === 'delete') {
        for (const state of paths[action]) {
            await deletedatafromdb(`${itemConfig[item.type][state]}/${item.id}`);
        }
    } else {
        const [sourceState, targetState] = paths[action];
        await savedatatodb(`${itemConfig[item.type][targetState]}/${item.id}`, item);
        await deletedatafromdb(`${itemConfig[item.type][sourceState]}/${item.id}`);
    }

    showToast(toast, `${action.charAt(0).toUpperCase() + action.slice(1)}d ${item.type}`, `The ${item.type.slice(0, -1)} has been ${action}d.`, "success");
    setData(prevData => {
        const updatedData = { ...prevData };
        if (action === 'delete') {
            for (const state of paths[action]) {
                updatedData[item.type][state] = updatedData[item.type][state].filter(i => i.id !== item.id);
            }
        } else {
            const [sourceState, targetState] = paths[action];
            if (!updatedData[item.type][targetState].some(i => i.id === item.id)) {
                updatedData[item.type][sourceState] = updatedData[item.type][sourceState].filter(i => i.id !== item.id);
                updatedData[item.type][targetState] = [...updatedData[item.type][targetState], item];
            }
        }
        return updatedData;
    });
};


const contentmanager = () => {
    const [data, setData] = useState({
        posts: { pending: [], approved: [], archived: [] },
        testimonials: { pending: [], approved: [], archived: [] },
        events: { pending: [], approved: [], archived: [] },
    });
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = {};
                for (const itemType in itemConfig) {
                    fetchedData[itemType] = {};
                    for (const state in itemConfig[itemType]) {
                        const data = await getdatafromdb(itemConfig[itemType][state]);
                        fetchedData[itemType][state] = data ? Object.keys(data).map(key => ({
                            ...data[key],
                            id: key,
                            type: itemType,
                            state,
                        })) : [];
                    }
                }
                setData(fetchedData);
            } catch (error) {
                showToast(toast, "Error fetching data", error.message, "error");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [toast]);

    const handleMove = (item, action) => {
        if (action === 'readMore') {
            setSelectedItem(item);
            onOpen();
        } else {
            moveItem(item, action, setData, toast);
        }
    };

    const renderSections = () => {
        return (
            <Accordion allowMultiple width={"100vw"}>
                {Object.keys(itemConfig).map((itemType) => (
                    <AccordionItem key={itemType}>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    <Heading size="md" color="teal.500">
                                        {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
                                    </Heading>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
                                {['pending', 'approved', 'archived'].map((state) => (
                                    <VStack key={state} align="start" spacing={4}>
                                        <Heading size="md">
                                            {`${state.charAt(0).toUpperCase() + state.slice(1)} ${itemType.charAt(0).toUpperCase() + itemType.slice(1)}`}
                                        </Heading>
                                        <RenderItems
                                            items={data[itemType][state]}
                                            handleMove={handleMove}
                                            itemState={state}
                                            itemType={itemType}
                                        />
                                    </VStack>
                                ))}
                            </SimpleGrid>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        );
    };

    if (loading) {
        return (
            <VStack align="center" justify="center" height="100vh">
                <Spinner size="xl" />
            </VStack>
        );
    }

    return (
        <VStack>
            {renderSections()}
            {selectedItem && (
                <ItemModal isOpen={isOpen} onClose={onClose} selectedItem={selectedItem} />
            )}
        </VStack>
    );
};

export default contentmanager;