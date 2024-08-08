'use client';
import { useState, useEffect } from 'react';
import { Box, SimpleGrid, Image, Text, Link, Center, Skeleton, useToast, keyframes, usePrefersReducedMotion, Heading } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { getdatafromdb } from '@/lib/firebase';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(50%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const GalleryTiles = () => {
  const [photoTiles, setPhotoTiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  const prefersReducedMotion = usePrefersReducedMotion();

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

  const animation = prefersReducedMotion ? undefined : `${fadeIn} 0.5s ease-out`;

  if (loading) {
    return (
      <Box p={5}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} height="250px" width="100%" borderRadius="md" />
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={5}>
        <Text color="red.500">Failed to load gallery tiles.</Text>
      </Box>
    );
  }

  return (
    <Box p={5}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {photoTiles.map((tile, index) => (
          <Link href={tile.link} isExternal key={index}>
            <Box 
              position="relative" 
              height="250px" 
              borderRadius="md" 
              overflow="hidden" 
              boxShadow="md"
              animation={animation}
            >
              <Image 
                src={tile.imageUrl} 
                alt={tile.text} 
                objectFit="cover" 
                width="100%" 
                height="100%"
                fallbackSrc="https://via.placeholder.com/150"
                transition="transform 0.3s ease"
                _hover={{
                  transform: 'scale(1.05)'
                }}
              />
              <Center 
                position="absolute" 
                bottom={0} 
                width="100%" 
                bg="rgba(0, 0, 0, 0.9)" 
                p={2}
                className="overlay"
                animation={animation}
                flexDirection="row"
                justifyContent="space-between"
              >
                <Heading size="md">{tile.text}</Heading>
                <ArrowForwardIcon w={6} h={6} />
              </Center>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default GalleryTiles;
