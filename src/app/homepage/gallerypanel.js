'use client';
import React, { useState, useEffect } from 'react';
import { Box, Button, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { FaImages } from "react-icons/fa";
import { PhotoAlbum } from "react-photo-album";
import { getdatafromStorage } from "@/lib/firebase";

const GalleryPanel = () => {
  const [imgUrls, setImgUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleryImageUrls = async () => {
      try {
        const urls = await getdatafromStorage('galleryimgs');
        const galleryImageUrls = [];
        const imagePromises = urls.map((url) => 
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              const { width, height } = img;
              galleryImageUrls.push({ src: url, width, height });
              resolve();
            };
            img.onerror = () => resolve(); 
            img.src = url;
          })
        );

        await Promise.all(imagePromises);

        setImgUrls(galleryImageUrls);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        setError('Failed to load images');
        setLoading(false);
      }
    };

    fetchGalleryImageUrls();
  }, []);

  const goToLink = () => {
    window.location.href = "gallery";
  };

  function renderNextImage(
    { alt = "", title, sizes },
    { photo, width, height }
  ) {
    return (
      <div
        style={{
          width: "100%",
          position: "relative",
          aspectRatio: `${width} / ${height}`,
        }}
      >
        <img
          src={photo}
          alt={alt}
          title={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    );
  }

  return (
    <Box className="cardcontainer" p={4} borderRadius="md" boxShadow="md">
      {loading ? (
        <SimpleGrid columns={{ base: 1, md: 3 }} width="100%" spacing={5}>
          {Array.from({ length: 9 }).map((_, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Skeleton height="300px" />
            </Box>
          ))}
        </SimpleGrid>
      ) : error ? (
        <Box p={4} color="red.500" textAlign="center">
          {error}
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1 }} width="100%" spacing={2}>
          <PhotoAlbum
            render={{ image: renderNextImage }}
            layout="rows"
            photos={imgUrls}
            lazyLoad
          />
          <Button
            colorScheme="teal"
            size="sm"
            alignSelf="center"
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
