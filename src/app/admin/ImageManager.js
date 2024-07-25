'use client'
import { useState, useEffect } from 'react';
import {
  Box, IconButton, Image, SimpleGrid, Heading, Input, VStack,
  Skeleton, useToast, Center, Modal, ModalOverlay, ModalContent,
  ModalCloseButton, ModalBody, useDisclosure, Progress, Checkbox, Button, Text, Flex
} from '@chakra-ui/react';
import { getdatafromStorage, uploadadminImageToStorage, deleteImageFromStorage } from '@/lib/firebase';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionIconButton = motion(IconButton);

const ImageManagerHeading = ({ title }) => {
  return <Heading size="md">{title}</Heading>;
};

const ImageGrid = ({ images, loading, handleImageDelete, openImageModal, handleImageUpload, handleImageSelect, selectedImages }) => {
  return (
    <SimpleGrid
  minChildWidth="250px"
  spacing={5}
  alignContent="center"
  justifyContent="center"
  width="100%"
  p={5} 
>
  {loading ? (
    Array(6).fill('').map((_, index) => (
      <Skeleton key={index} boxSize="250px" />
    ))
  ) : (
    <>
      {images.map((url, index) => (
        <MotionBox
          key={index}
          position="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          cursor="pointer"
          borderWidth={1}
          borderRadius="md"
          overflow="hidden" 
        >
          <MotionImage
            src={url}
            alt={`Image ${index}`}
            boxSize="100%" 
            objectFit="cover"
            whileHover={{ scale: 1.05 }}
            onClick={() => !selectedImages.includes(url) && openImageModal(url)}
          />
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            bg="rgba(0, 0, 0, 0.6)"
            p={2}
            borderRadius="md"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            transition="opacity 0.3s"
            opacity={0.8}
            _groupHover={{ opacity: 1 }} 
          >
            <MotionIconButton
              colorScheme="red"
              size="sm"
              icon={<DeleteIcon />}
              onClick={(e) => {
                e.stopPropagation();
                handleImageDelete(url);
              }}
              aria-label="Delete image"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            />
            <Checkbox
              colorScheme="teal"
              isChecked={selectedImages.includes(url)}
              onChange={(e) => {
                e.stopPropagation();
                handleImageSelect(url);
              }}
              aria-label="Select image"
              size="lg"
              borderColor="white"
              iconColor="white"
            />
          </Box>
        </MotionBox>
      ))}
      <MotionBox
        position="relative"
        as="label"
        cursor="pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={4}
        borderWidth={1}
        borderRadius="md"
        borderColor="gray.300"
        _hover={{ borderColor: "gray.500" }}
        overflow="hidden"
      >
        <Center>
          <AddIcon w={10} h={10} color="gray.400" />
        </Center>
        <Text mt={2} fontSize="sm" color="gray.600" textAlign="center">
          Click to upload
        </Text>
        <Input
          type="file"
          onChange={handleImageUpload}
          position="absolute"
          top={0}
          left={0}
          opacity={0}
          width="100%"
          height="100%"
          cursor="pointer"
          aria-label="Upload image"
        />
      </MotionBox>
    </>
  )}
</SimpleGrid>

  );
};

const ImageModal = ({ isOpen, onClose, selectedImage }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          {selectedImage && (
            <Image src={selectedImage} alt="Selected Image" objectFit="cover" width="100%" height="auto" />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const ImageManager = ({ title, location }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchImages = async () => {
    try {
      const fetchedImages = await getdatafromStorage(location);
      setImages(fetchedImages);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error fetching images.",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchImages();
  }, [location]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      try {
        await uploadadminImageToStorage(location, file, (progress) => setUploadProgress(progress));
        await fetchImages();
        toast({
          title: "Image uploaded.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error uploading image.",
          description: error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
        setUploadProgress(0);
      }
    }
  };

  const handleImageDelete = async (imageUrl) => {
    setLoading(true);
    try {
      await deleteImageFromStorage(location, imageUrl);
      await fetchImages();
      toast({
        title: "Image deleted.",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error deleting image.",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    setLoading(true);
    try {
      await Promise.all(selectedImages.map((imageUrl) => deleteImageFromStorage(location, imageUrl)));
      await fetchImages();
      setSelectedImages([]);
      toast({
        title: "Selected images deleted.",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error deleting images.",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const openImageModal = (url) => {
    setSelectedImage(url);
    onOpen();
  };

  const handleImageSelect = (url) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(url) ? prevSelected.filter((img) => img !== url) : [...prevSelected, url]
    );
  };

  return (
    <VStack align="start" spacing={5}>
      <ImageManagerHeading title={title} />
      {uploadProgress > 0 && <Progress value={uploadProgress} size="xs" colorScheme="teal" width="100%" />}
      <ImageGrid
        images={images}
        loading={loading}
        handleImageDelete={handleImageDelete}
        openImageModal={openImageModal}
        handleImageUpload={handleImageUpload}
        handleImageSelect={handleImageSelect}
        selectedImages={selectedImages}
      />
      {selectedImages.length > 0 && (
        <Flex
          position="fixed"
          bottom={4}
          left="50%"
          transform="translateX(-50%)"
          align="center"
          justify="center"
          width="auto"
          zIndex="tooltip"
        >
          <Button colorScheme="red" onClick={handleBulkDelete} leftIcon={<DeleteIcon />}>
            Delete {selectedImages.length} selected images
          </Button>
        </Flex>
      )}
      <ImageModal isOpen={isOpen} onClose={onClose} selectedImage={selectedImage} />
    </VStack>
  );
};

export default ImageManager;
