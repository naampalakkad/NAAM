'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { Box, Button, SimpleGrid, Skeleton } from "@chakra-ui/react";
import PhotoAlbum from "react-photo-album";
import { getGalleryImageUrls } from '@/lib/data';
import { FaImages } from "react-icons/fa";

const GallerySkeleton = () => (
  <SimpleGrid columns={1} className="gallerypanel">
    <Skeleton height="400px" />
    <Button colorScheme="teal" alignSelf="flex-end" size="sm" className="gallerybutton" disabled>
      Loading...
    </Button>
  </SimpleGrid>
);

const GalleryPanel = () => {
  const [imgUrls, setImgUrls] = useState([]);

  useEffect(() => {
    getGalleryImageUrls()
      .then((urls) => {
        setImgUrls(urls);
      })
      .catch((error) => {
        console.error('Error fetching gallery images:', error);
      });
  }, []);

  const goToLink = () => {
    window.location.href = "gallery";
  };

  return (
    <Box className="cardcontainer" bg="rgba(0, 0, 0, 0.5)" p={4} borderRadius="md" boxShadow="md">
      <Suspense fallback={<GallerySkeleton />}>
        <SimpleGrid columns={1} className="gallerypanel">
          <PhotoAlbum layout="rows" photos={imgUrls} />
          <Button colorScheme="teal" size="sm" alignSelf="flex-end" onClick={goToLink} rightIcon={<FaImages />}>
            Photos
          </Button>
        </SimpleGrid>
      </Suspense>
    </Box>
  );
};

export default GalleryPanel;
