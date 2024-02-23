'use client'
import React from 'react';
import { Button, SimpleGrid } from "@chakra-ui/react";
import PhotoAlbum from "react-photo-album";
import {galleryphotos, photogalleryurl} from './data';
import './gallerypanel.css';

export default function Gallerypanel() {
    const goToLink = () => {
        window.location.href = photogalleryurl;
    };

    return (
        <SimpleGrid column={1} className="gallerypanel" >
            <PhotoAlbum layout="rows" photos={galleryphotos} />
            <Button colorScheme="teal" size="lg" className="gallerybutton" onClick={goToLink}>
                   Relive your memories through photos (Google Photos) -&gt;
            </Button>
        </SimpleGrid>
    );
}

