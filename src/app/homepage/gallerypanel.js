'use client';
import React, { useState, useEffect } from 'react';
import { Button, SimpleGrid } from "@chakra-ui/react";
import PhotoAlbum from "react-photo-album";
import {getGalleryImageUrls, photogalleryurl} from './data';
import './gallerypanel.css';

export default function Gallerypanel() {
    const [imgurls, setImgUrls] = useState([]);

    const goToLink = () => {
        window.location.href = photogalleryurl;
    };

    useEffect(() => {
        getGalleryImageUrls().then((urls) => {
            
            setImgUrls(urls);
        });
    }, []);

    return (
        <SimpleGrid column={1} className="gallerypanel" >
            <PhotoAlbum layout="rows" photos={imgurls} />
            <Button colorScheme="teal" alignSelf={"right"} size="sm" className="gallerybutton" onClick={goToLink}>
                  Photos -&gt;
            </Button>
        </SimpleGrid>
    );
}