'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { Box, Button, SimpleGrid, Skeleton, SkeletonText, VStack } from "@chakra-ui/react";
import PhotoAlbum from "react-photo-album";
import { getGalleryImageUrls } from '@/lib/data';
import { FaImages } from "react-icons/fa";

const GallerySkeleton = () => (
  <SimpleGrid columns={{ base: 1, md:3 }}  width={"100%"}  spacing={5} className="gallerypanel">
    {Array.from({ length: 9 }).map((_, index) => (
      <Box key={index} borderWidth="1px" borderRadius="lg"  overflow="hidden">
        <Skeleton height="300px" />
        <Box p="6">
          <SkeletonText mt="4" noOfLines={2} spacing="4" />
        </Box>
      </Box>
    ))}
    <Button colorScheme="teal" size="sm" alignSelf="flex-end" m={2} isDisabled>
      Loading...
    </Button>
  </SimpleGrid>
);

const GalleryPanel = () => {
  const [imgUrls, setImgUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGalleryImageUrls()
      .then((urls) => {
        setImgUrls(urls);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching gallery images:', error);
        setLoading(false);
      });
  }, []);

  const goToLink = () => {
    window.location.href = "gallery";
  };

  return (
    <Box className="cardcontainer" p={4} borderRadius="md" boxShadow="md">
      {loading ? (
        <GallerySkeleton />
      ) : (
        <SimpleGrid columns={{ base: 1}} width={"100%"} spacing={2} className="gallerypanel">
          <PhotoAlbum layout="rows" photos={imgUrls} />
          <Button
            colorScheme="teal"
            size="sm"
            alignSelf="flex-end"
            m={2}
            onClick={goToLink}
            rightIcon={<FaImages />}
          >
            Photos
          </Button>
        </SimpleGrid>
      )}
    </Box>
  );
};

export default GalleryPanel;
