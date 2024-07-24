'use client'
// pages/admin.js
import { useState, useEffect } from 'react';
import { Box, Button, Image, SimpleGrid, Heading, Stack, Input, VStack } from '@chakra-ui/react';
import { getdatafromStorage, uploadadminImageToStorage, deleteImageFromStorage } from '@/lib/firebase'; // Import your Firebase functions

const AdminPanel = () => {
  const [carousalImages, setCarousalImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const carousal = await getdatafromStorage('carousalimages');
      const gallery = await getdatafromStorage('galleryimgs');
      setCarousalImages(carousal);
      setGalleryImages(gallery);
    };

    fetchImages();
  }, []);

  const handleImageUpload = async (location) => {
    if (newImage) {
      await uploadadminImageToStorage(location, newImage);
      setNewImage(null);
      // Refresh the images after upload
      const updatedImages = await getdatafromStorage(location);
      if (location === 'carousalimages') setCarousalImages(updatedImages);
      if (location === 'galleryimgs') setGalleryImages(updatedImages);
    }
  };

  const handleImageDelete = async (location, imageUrl) => {
    await deleteImageFromStorage(location, imageUrl);
    // Refresh the images after deletion
    const updatedImages = await getdatafromStorage(location);
    if (location === 'carousalimages') setCarousalImages(updatedImages);
    if (location === 'galleryimgs') setGalleryImages(updatedImages);
  };

  return (
    <Box p={5} pt={"10vh"}>
      <Heading mb={5}>Admin Panel</Heading>
      <Stack spacing={10}>
        <VStack align="start">
          <Heading size="md">Carousal Images</Heading>
          <SimpleGrid columns={3} spacing={5}>
            {carousalImages.map((url, index) => (
              <Box key={index} position="relative">
                <Image src={url} alt={`Carousal Image ${index}`} boxSize="150px" objectFit="cover" />
                <Button 
                  position="absolute" 
                  top={0} 
                  right={0} 
                  colorScheme="red" 
                  onClick={() => handleImageDelete('carousalimages', url)}>
                  Delete
                </Button>
              </Box>
            ))}
          </SimpleGrid>
          <Input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
          <Button colorScheme="teal" onClick={() => handleImageUpload('carousalimages')}>Upload New Image</Button>
        </VStack>

        <VStack align="start">
          <Heading size="md">Gallery Images</Heading>
          <SimpleGrid columns={3} spacing={5}>
            {galleryImages.map((url, index) => (
              <Box key={index} position="relative">
                <Image src={url} alt={`Gallery Image ${index}`} boxSize="150px" objectFit="cover" />
                <Button 
                  position="absolute" 
                  top={0} 
                  right={0} 
                  colorScheme="red" 
                  onClick={() => handleImageDelete('galleryimgs', url)}>
                  Delete
                </Button>
              </Box>
            ))}
          </SimpleGrid>
          <Input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
          <Button colorScheme="teal" onClick={() => handleImageUpload('galleryimgs')}>Upload New Image</Button>
        </VStack>
      </Stack>
    </Box>
  );
};

export default AdminPanel;
