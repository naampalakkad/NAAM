'use client';
import React, { useState, useEffect } from 'react';
import {SimpleGrid } from "@chakra-ui/react";
import PhotoAlbum from "react-photo-album";
import {getGalleryImageUrls} from '../homepage/data';
import './gallery.css';

export default function gallerypage() {
    const [imgurls, setImgUrls] = useState([]);


    useEffect(() => {
        getGalleryImageUrls().then((urls) => {
            
            setImgUrls(urls);
        });
    }, []);

    return (
        <SimpleGrid column={1} className="gallerypanel" >
            <PhotoAlbum layout="rows" photos={imgurls} />
        </SimpleGrid>
    );
}