import { Box, SimpleGrid, Image, Text, Link, Center } from '@chakra-ui/react';
import { phototilesData} from '@/lib/data';
import './gallery.css';

const GalleryTiles = () => {
  return (
    <Box className="gallery-container">
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {phototilesData.map((tile, index) => (
          <Link href={tile.link} isExternal key={index}>
            <Box className="gallery-item">
              <Image 
                src={tile.imageUrl} 
                alt={tile.text} 
                className="gallery-img" 
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