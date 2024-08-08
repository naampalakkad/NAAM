'use client'
import React, { useState, useEffect } from 'react';
import { SimpleGrid, Skeleton, Box, useToast } from "@chakra-ui/react";
import PhotoAlbum from "react-photo-album";
import { getGalleryImageUrls } from '@/lib/data';
import LightboxComponent from './lightbox'; 
import Quotebox from './quotesbox';
import GalleryTiles from './photobox';

const GalleryPage = () => {
  const [imgurls, setImgUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1); 
  const toast = useToast();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const urls = await getGalleryImageUrls();
        setImgUrls(urls);
      } catch (err) {
        setError(err);
        toast({
          title: "Error fetching images",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [toast]);

  const renderLoadingSkeletons = () => (
    <SimpleGrid columns={1} spacing={5}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} height="200px" width="80%" mx="auto" />
      ))}
    </SimpleGrid>
  );

  const renderImages = () => (
    <SimpleGrid columns={1}>
      <PhotoAlbum
        layout="rows"
        photos={imgurls}
        onClick={({ index }) => setSelectedIndex(index)} // Update state on click
      />
    </SimpleGrid>
  );

  return (
    <Box className="gallerypanel" p={5} pt={"12vh"}>
      <Quotebox />
      <GalleryTiles />
      {isLoading ? renderLoadingSkeletons() : renderImages()}
      {error && (
        <Box color="red.500" textAlign="center" mt={5}>
          Error fetching images: {error.message}
        </Box>
      )}
      <LightboxComponent
        images={imgurls}
        isOpen={selectedIndex >= 0} 
        ind={selectedIndex} 
        onClose={() => setSelectedIndex(-1)} 
      />
    </Box>
  );
}

export default GalleryPage;
