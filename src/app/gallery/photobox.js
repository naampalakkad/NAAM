'use client';
import { useState, useEffect } from 'react';
import { Box, SimpleGrid, Image, Text, Link, Center, Skeleton, useToast } from '@chakra-ui/react';
import { getdatafromdb } from '@/lib/firebase';
import './gallery.css';

const GalleryTiles = () => {
  const [photoTiles, setPhotoTiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchPhotoTiles = async () => {
      try {
        const data = await getdatafromdb('phototilesData');
        if (data) {
          setPhotoTiles(data);
        }
      } catch (error) {
        console.error('Error fetching photo tiles:', error);
        setError(error);
        toast({
          title: "Error",
          description: "There was an error fetching the photo tiles.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPhotoTiles();
  }, [toast]);

  if (loading) {
    return (
      <Box className="gallery-container">
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} height="250px" />
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="gallery-container">
        <Text color="red.500">Failed to load gallery tiles.</Text>
      </Box>
    );
  }

  return (
    <Box className="gallery-container">
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {photoTiles.map((tile, index) => (
          <Link href={tile.link} isExternal key={index}>
            <Box className="gallery-item">
              <Image 
                src={tile.imageUrl} 
                alt={tile.text} 
                className="gallery-img" 
                fallbackSrc="https://via.placeholder.com/150"
              />
              <Center className="overlay">
                {tile.text}
              </Center>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default GalleryTiles;
