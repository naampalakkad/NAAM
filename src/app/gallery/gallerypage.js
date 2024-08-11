'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { SimpleGrid, Skeleton, Box, useToast } from "@chakra-ui/react";
import { RenderImageContext, RenderImageProps, RowsPhotoAlbum, PhotoAlbum} from "react-photo-album";
import LightboxComponent from './lightbox'; 
import Quotebox from './quotesbox';
import GalleryTiles from './photobox';
import { getdatafromStorage } from "@/lib/firebase";
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
      <Image
        fill
        src={photo}
        alt={alt}
        title={title}
        sizes={sizes}
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
      />
    </div>
  );
}
const GalleryPage = () => {
  const [imgUrls, setImgUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1); 
  const toast = useToast();

  const fetchGalleryImages = useCallback(async () => {
    try {
      const urls = await getdatafromStorage('galleryimgs'); 
      const imagePromises = urls.map((url) => new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ src: url, width: img.width, height: img.height });
        img.onerror = () => resolve(null); 
        img.src = url;
      }));

      const loadedImages = await Promise.all(imagePromises);
      const validImages = loadedImages.filter(Boolean);

      setImgUrls(validImages);
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
  }, [toast]);

  useEffect(() => {
    fetchGalleryImages();
  }, [fetchGalleryImages]);

  const renderLoadingSkeletons = () => (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} height="200px" borderRadius="md" />
      ))}
    </SimpleGrid>
  );

  const renderImages = () => (
    <SimpleGrid columns={{ base: 1 }} spacing={4}>
      <PhotoAlbum
        layout="rows"
        photos={imgUrls}
        render={{ image: renderNextImage }}
        onClick={({ index }) => setSelectedIndex(index)}
        lazyLoad
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
        images={imgUrls}
        isOpen={selectedIndex >= 0}
        ind={selectedIndex}
        onClose={() => setSelectedIndex(-1)}
      />
    </Box>
  );
};

export default GalleryPage;
