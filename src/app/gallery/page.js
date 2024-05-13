'use client'
import React, { useState, useEffect } from 'react';
import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import PhotoAlbum from "react-photo-album";
import { getGalleryImageUrls } from '../homepage/data';
import './gallery.css';
import "yet-another-react-lightbox/styles.css";
import LightboxComponent from './lightbox'; 
import Quotebox from './quotesbox';

export default function GalleryPage() {
  const [imgurls, setImgUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1); 

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const urls = await getGalleryImageUrls();
        setImgUrls(urls);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const renderImages = () => (
    <SimpleGrid columns={1} className="gallerypanel">
      <PhotoAlbum
        layout="rows"
        photos={imgurls}
        onClick={({ index }) => setSelectedIndex(index)} // Update state on click
      />
    </SimpleGrid>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <SimpleGrid columns={1}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} height="200px" width="100%" padding="10px" />
          ))}
        </SimpleGrid>
      );
    }

    if (error) {
      return <div>Error fetching images: {error.message}</div>;
    }

    return renderImages();
  };

  return (
    <div className="gallerypanel">
      <Quotebox />
      {renderContent()}
      <LightboxComponent
        images={imgurls} // Pass images to Lightbox component
        isOpen={selectedIndex >= 0} // Control Lightbox visibility
        currentIndex={selectedIndex} // Set initial index (if needed)
        onClose={() => setSelectedIndex(-1)} // Handler for Lightbox closing
      />
    </div>
  );
}