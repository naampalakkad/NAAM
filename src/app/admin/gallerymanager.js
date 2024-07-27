import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
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
    SimpleGrid,
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
const MotionBox = motion(Box);
const PhotoTile = ({
    tile,
    index,
    isEditing,
    newEntry,
    setNewEntry,
    setIsEditing,
    newImage,
    setNewImage,
    setIsLoading,
    photoTiles,
    setPhotoTiles,
    toast,
}) => {
    const handleSaveEditEntry = async (index) => {
        setIsLoading(true);
        try {
            if (newImage) {
                const imageUrl = await uploadadminImageToStorage('galleryimgs', newImage);
                newEntry.imageUrl = imageUrl;
            }
            const updatedPhotoTiles = [...photoTiles];
            updatedPhotoTiles[index] = newEntry;
            savedatatodb('phototilesData', updatedPhotoTiles);
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

    const handleDeleteEntry = async (index) => {
        setIsLoading(true);
        try {
            const tileToDelete = photoTiles[index];
            const updatedPhotoTiles = photoTiles.filter((_, i) => i !== index);
            savedatatodb('phototilesData', updatedPhotoTiles);
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

    const handleEditEntry = () => {
        setIsEditing(index);
        setNewEntry(tile);
    };

    return (
        <Card
            p={5}
            borderRadius="md"
            _dark={{ bg: 'gray.700' }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            minHeight="250px"
        >
            {isEditing === index ? (
                <VStack spacing={3} width="full">
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
                    <HStack spacing={2}>
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
                </VStack>
            ) : (
                <MotionBox
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                cursor="pointer"
                borderRadius="md"
            >
                <Image
                    src={tile.imageUrl}
                    alt={tile.text}
                    boxSize="250px"
                    objectFit="cover"
                />
                <Box mt={3} textAlign="center">
                    <Heading size="md">{tile.text}</Heading>
                </Box>
                <HStack spacing={2} mt={3} justifyContent="space-evenly">
                    <IconButton
                        as="a"
                        href={tile.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        icon={<LinkIcon />}
                        colorScheme="blue"
                        aria-label="Link"
                    />
                    <IconButton
                        icon={<EditIcon />}
                        onClick={() => handleEditEntry(index)}
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
            </MotionBox>
            )}
        </Card>
    );
};

const AddNewTileButton = ({
    isEditing,
    photoTiles,
    setIsEditing,
    newEntry,
    setNewEntry,
    newImage,
    setNewImage,
    setIsLoading,
    setPhotoTiles,
    toast,
}) => {
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
            savedatatodb('phototilesData', updatedPhotoTiles);
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

    return (
        <Box
            borderRadius="md"
            boxShadow="md"
            _dark={{ bg: 'gray.700' }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            minHeight="250px"
        >
            {!isEditing && <Button
                leftIcon={<AddIcon />}
                colorScheme="teal"
                onClick={handleAddNewEntry}
            >
                Add New
            </Button>
            }
            {isEditing === photoTiles.length && (
                <VStack spacing={3} m={3} >
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
                    <HStack spacing={2}>
                        <Button
                            leftIcon={<CheckIcon />}
                            colorScheme="teal"
                            onClick={handleSaveNewEntry}
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
                </VStack>
            )}
        </Box>
    );
};

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

    return (
        <VStack align="start" spacing={5}>
            {isLoading && <Spinner />}
            <SimpleGrid minChildWidth="250px"
                spacing={5}
                alignContent="center"
                justifyContent="center"
                width="100%"
                p={5} >
                <AnimatePresence>
                    {photoTiles.map((tile, index) => (
                        <PhotoTile
                            key={index}
                            tile={tile}
                            index={index}
                            isEditing={isEditing}
                            newEntry={newEntry}
                            setNewEntry={setNewEntry}
                            setIsEditing={setIsEditing}
                            newImage={newImage}
                            setNewImage={setNewImage}
                            setIsLoading={setIsLoading}
                            photoTiles={photoTiles}
                            setPhotoTiles={setPhotoTiles}
                            toast={toast}
                        />
                    ))}
                </AnimatePresence>
                <AddNewTileButton
                    isEditing={isEditing}
                    photoTiles={photoTiles}
                    setIsEditing={setIsEditing}
                    newEntry={newEntry}
                    setNewEntry={setNewEntry}
                    newImage={newImage}
                    setNewImage={setNewImage}
                    setIsLoading={setIsLoading}
                    setPhotoTiles={setPhotoTiles}
                    toast={toast}
                />
            </SimpleGrid>
        </VStack>
    );
};

export default GalleryManager;