import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Image,
    VStack,
    Input,
    Heading,
    IconButton,
    useToast,
    Spinner,
    Flex,
    HStack,
    Text,
} from '@chakra-ui/react';
import {
    AddIcon,
    DeleteIcon,
    EditIcon,
    CheckIcon,
    LinkIcon,
    CloseIcon,
} from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import {
    getdatafromdb,
    savedatatodb,
    uploadadminImageToStorage,
    deleteImageFromStorage,
} from '@/lib/firebase';

const GalleryManager = () => {
    const [photoTiles, setPhotoTiles] = useState([]);
    const [newEntry, setNewEntry] = useState({ imageUrl: '', text: '', link: '' });
    const [isEditing, setIsEditing] = useState(null);
    const [newImage, setNewImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        const fetchPhotoTiles = async () => {
            setIsLoading(true);
            const data = await getdatafromdb('phototilesData');
            if (data) {
                setPhotoTiles(data);
            }
            setIsLoading(false);
        };

        fetchPhotoTiles();
    }, []);

    const handleAddNewEntry = () => {
        setNewEntry({ imageUrl: '', text: '', link: '' });
        setIsEditing(photoTiles.length);
    };

    const handleSaveNewEntry = async () => {
        setIsLoading(true);
        try {
            if (newImage) {
                const imageUrl = await uploadadminImageToStorage('gallerythumbnails', newImage);
                newEntry.imageUrl = imageUrl;
            }
            const updatedPhotoTiles = [...photoTiles, newEntry];
            await savedatatodb('phototilesData', updatedPhotoTiles);
            setPhotoTiles(updatedPhotoTiles);
            setNewEntry({ imageUrl: '', text: '', link: '' });
            setNewImage(null);
            toast({
                title: 'Entry added successfully.',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error adding entry.',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
            console.error(error);
        }
        setIsLoading(false);
        setIsEditing(null);
    };

    const handleDeleteEntry = async (index) => {
        setIsLoading(true);
        try {
            const tileToDelete = photoTiles[index];
            const updatedPhotoTiles = photoTiles.filter((_, i) => i !== index);
            await savedatatodb('phototilesData', updatedPhotoTiles);
            setPhotoTiles(updatedPhotoTiles);
            await deleteImageFromStorage(tileToDelete.imageUrl);
            toast({
                title: 'Entry deleted successfully.',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error deleting entry.',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
            console.error(error);
        }
        setIsLoading(false);
    };

    const handleEditEntry = (index) => {
        setIsEditing(index);
        setNewEntry(photoTiles[index]);
    };

    const handleSaveEditEntry = async (index) => {
        setIsLoading(true);
        try {
            if (newImage) {
                const imageUrl = await uploadadminImageToStorage('galleryimgs', newImage);
                newEntry.imageUrl = imageUrl;
            }
            const updatedPhotoTiles = [...photoTiles];
            updatedPhotoTiles[index] = newEntry;
            await savedatatodb('phototilesData', updatedPhotoTiles);
            setPhotoTiles(updatedPhotoTiles);
            setNewEntry({ imageUrl: '', text: '', link: '' });
            setNewImage(null);
            setIsEditing(null);
            toast({
                title: 'Entry updated successfully.',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error updating entry.',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
            console.error(error);
        }
        setIsLoading(false);
    };

    return (
        <Box p={5}>
            <Heading mb={5}>Photos Gallery</Heading>
            {isLoading && <Spinner />}
            <VStack align="start" spacing={5}>
                <Flex wrap="wrap" justify="space-between" w="100%">
                    <AnimatePresence>
                        {photoTiles.map((tile, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <Box
                                    p={5}
                                    borderWidth="1px"
                                    borderRadius="md"
                                    boxShadow="md"
                                    bg="white"
                                    _dark={{ bg: 'gray.700' }}
                                    mb={5}
                                >
                                    {isEditing === index ? (
                                        <HStack spacing={3}>
                                            <Input
                                                placeholder="Title"
                                                value={newEntry.text}
                                                onChange={(e) => setNewEntry({ ...newEntry, text: e.target.value })}
                                            />
                                            <Input
                                                placeholder="Link"
                                                value={newEntry.link}
                                                onChange={(e) => setNewEntry({ ...newEntry, link: e.target.value })}
                                            />
                                            <Input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
                                            <HStack>
                                                <Button
                                                    leftIcon={<CheckIcon />}
                                                    colorScheme="teal"
                                                    onClick={() => handleSaveEditEntry(index)}
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    leftIcon={<CloseIcon />}
                                                    onClick={() => setIsEditing(null)}
                                                >
                                                    Cancel
                                                </Button>
                                            </HStack>
                                        </HStack>
                                    ) : (
                                        <Flex justify="space-between" align="center" direction={'column'}>
                                            <Image src={tile.imageUrl} alt={tile.text} boxSize="150px" objectFit="cover" />
                                            <Box flex="1" mx={3} mt={3}>
                                                <Heading size="md">{tile.text}</Heading>
                                            </Box>
                                            <HStack spacing={2} mt={3}>
                                                <IconButton
                                                    as="a"
                                                    href={tile.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    icon={<LinkIcon />}
                                                    variant="outline"
                                                    colorScheme="teal"
                                                    aria-label="Link"
                                                />
                                                <IconButton
                                                    icon={<EditIcon />}
                                                    onClick={() => handleEditEntry(index)}
                                                    variant="outline"
                                                    colorScheme="teal"
                                                    aria-label="Edit"
                                                />
                                                <IconButton
                                                    icon={<DeleteIcon />}
                                                    colorScheme="red"
                                                    onClick={() => handleDeleteEntry(index)}
                                                    aria-label="Delete"
                                                />
                                            </HStack>
                                        </Flex>
                                    )}
                                </Box>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <Box
                        p={5}
                        borderWidth="1px"
                        borderRadius="md"
                        w="48%"
                        boxShadow="md"
                        bg="white"
                        _dark={{ bg: 'gray.700' }}
                        mb={5}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Button
                            leftIcon={<AddIcon />}
                            colorScheme="teal"
                            onClick={handleAddNewEntry}
                        >
                            Add New Entry
                        </Button>
                        {isEditing === photoTiles.length && (
                            <VStack spacing={3} mt={3}>
                                <Input
                                    placeholder="Title"
                                    value={newEntry.text}
                                    onChange={(e) => setNewEntry({ ...newEntry, text: e.target.value })}
                                />
                                <Input
                                    placeholder="Link"
                                    value={newEntry.link}
                                    onChange={(e) => setNewEntry({ ...newEntry, link: e.target.value })}
                                />
                                <Input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
                                <HStack>
                                    <Button
                                        leftIcon={<CheckIcon />}
                                        colorScheme="teal"
                                        onClick={handleSaveNewEntry}
                                    >
                                        Save
                                    </Button>
                                    <Button leftIcon={<CloseIcon />} onClick={() => setIsEditing(null)}>
                                        Cancel
                                    </Button>
                                </HStack>
                            </VStack>
                        )}
                    </Box>
                </Flex>
            </VStack>
        </Box>

    );
};

export default GalleryManager;
