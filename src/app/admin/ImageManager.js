// components/ImageManager.js
'use client'
import { useState, useEffect } from 'react';
import { Box, IconButton, Image, SimpleGrid, Heading, Input, VStack, Skeleton, useToast, Center, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, useDisclosure } from '@chakra-ui/react';
import { getdatafromStorage, uploadadminImageToStorage, deleteImageFromStorage } from '@/lib/firebase';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionIconButton = motion(IconButton);

const ImageManager = ({ title, location }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const fetchImages = async () => {
      const fetchedImages = await getdatafromStorage(location);
      setImages(fetchedImages);
      setLoading(false);
    };

    fetchImages();
  }, [location]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      await uploadadminImageToStorage(location, file);
      // Refresh the images after upload
      const updatedImages = await getdatafromStorage(location);
      setImages(updatedImages);
      setLoading(false);
      toast({
        title: "Image uploaded.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleImageDelete = async (imageUrl) => {
    setLoading(true);
    await deleteImageFromStorage(location, imageUrl);
    // Refresh the images after deletion
    const updatedImages = await getdatafromStorage(location);
    setImages(updatedImages);
    setLoading(false);
    toast({
      title: "Image deleted.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const openImageModal = (url) => {
    setSelectedImage(url);
    onOpen();
  };

  return (
    <VStack align="start" spacing={5}>
      <Heading size="md">{title}</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={5}>
        {loading ? (
          Array(6).fill('').map((_, index) => (
            <Skeleton key={index} boxSize="150px" />
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
                onClick={() => openImageModal(url)}
                cursor="pointer"
              >
                <MotionImage src={url} alt={`${title} ${index}`} boxSize="150px" objectFit="cover" whileHover={{ scale: 1.05 }} />
                <MotionIconButton
                  position="absolute"
                  bottom={1}
                  right={1}
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
              </MotionBox>
            ))}
            <MotionBox
              position="relative"
              as="label"
              cursor="pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Center boxSize="150px" borderWidth={1} borderRadius="md" whileHover={{ scale: 1.05 }} as={motion.div}>
                <AddIcon w={10} h={10} color="gray.400" />
              </Center>
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
              />
            </MotionBox>
          </>
        )}
      </SimpleGrid>

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
    </VStack>
  );
};

export default ImageManager;