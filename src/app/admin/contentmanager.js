import React, { useState, useEffect } from 'react';
import RenderItems from './components/rendercontent';
import ItemModal from './components/contentmodel';
import { VStack, HStack, Spinner, useToast, Heading, useDisclosure, Box, Text, Button, Image } from '@chakra-ui/react';
import { getdatafromdb, savedatatodb, deletedatafromdb } from '@/lib/firebase';
import { CheckIcon, DeleteIcon, RepeatIcon, TimeIcon, WarningIcon } from '@chakra-ui/icons';

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
        pending: 'events',
        approved: 'content/approvedevents',
        archived: 'content/archivedevents',
    },
};



const showToast = (toast, title, description, status) => {
    toast({
        title,
        description,
        status,
        duration: 9000,
        isClosable: true,
    });
};

const moveItem = async (item, action, setData, toast, onOpen) => {
    const paths = {
        approve: [itemConfig[item.type].pending, itemConfig[item.type].approved],
        archive: [itemConfig[item.type].approved, itemConfig[item.type].archived],
        unarchive: [itemConfig[item.type].archived, itemConfig[item.type].approved],
        unapprove: [itemConfig[item.type].approved, itemConfig[item.type].pending],
        delete: [
            `${itemConfig[item.type].pending}/${item.id}`,
            `${itemConfig[item.type].approved}/${item.id}`,
            `${itemConfig[item.type].archived}/${item.id}`,
        ],
    };

    try {
        if (action === 'delete') {
            for (const path of paths[action]) {
                await deletedatafromdb(path);
            }
        } else {
            const [sourcePath, targetPath] = paths[action];
            await savedatatodb(`${targetPath}/${item.id}`, item);
            await deletedatafromdb(`${sourcePath}/${item.id}`);
        }

        setData(prevData => {
            const newData = { ...prevData };
            if (action === 'delete') {
                ['pending', 'approved', 'archived'].forEach(state => {
                    newData[item.type][state] = newData[item.type][state].filter(i => i.id !== item.id);
                });
            } else {
                const sourceState = paths[action][0].split('/').pop();
                const targetState = paths[action][1].split('/').pop();
                newData[item.type][sourceState] = newData[item.type][sourceState].filter(i => i.id !== item.id);
                newData[item.type][targetState] = [...newData[item.type][targetState], { ...item, state: targetState }];
            }
            return newData;
        });

        showToast(toast, `${action.charAt(0).toUpperCase() + action.slice(1)}d ${item.type}`, `The ${item.type.slice(0, -1)} has been ${action}d.`, "success");
    } catch (error) {
        showToast(toast, `Error ${action}ing ${item.type}`, error.message, "error");
    }

    if (action === 'readMore') {
        onOpen();
    }
};

const AdminPanel = () => {
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
        }
        moveItem(item, action, setData, toast, onOpen);
    };

    const renderSections = () => {
        return Object.keys(itemConfig).map((itemType) => (
            <HStack key={itemType} align="start" spacing={8}>
                {['pending', 'approved', 'archived'].map((state) => (
                    <VStack key={state}>
                        <Heading size="md">{`${state.charAt(0).toUpperCase() + state.slice(1)} ${itemType.charAt(0).toUpperCase() + itemType.slice(1)}`}</Heading>
                        <RenderItems items={data[itemType][state]} handleMove={handleMove} itemState={state} />
                    </VStack>
                ))}
            </HStack>
        ));
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

export default AdminPanel;
