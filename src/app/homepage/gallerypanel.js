'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { Button, SimpleGrid, Skeleton } from "@chakra-ui/react";
import PhotoAlbum from "react-photo-album";
import { getGalleryImageUrls } from './data';
import './gallerypanel.css';

const GallerySkeleton = () => (
  <SimpleGrid column={1} className="gallerypanel">
    <Skeleton height="400px" />
    <Button colorScheme="teal" alignSelf="right" size="sm" className="gallerybutton" disabled>
      Loading...
    </Button>
  </SimpleGrid>
);

const Gallerypanel = () => {
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
    <Suspense fallback={<GallerySkeleton />}>
      <SimpleGrid column={1} className="gallerypanel">
        <PhotoAlbum layout="rows" photos={imgUrls} />
        <Button colorScheme="teal" alignSelf="right" size="sm" className="gallerybutton" onClick={goToLink}>
          Photos -&gt;
        </Button>
      </SimpleGrid>
    </Suspense>
  );
};

export default Gallerypanel;
