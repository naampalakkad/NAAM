'use client'
import React from 'react';
import { Gallery } from "react-grid-gallery";


// pull in the photos from the google photos link and display them in a grid

let photossrc ="https://photos.app.goo.gl/DAAhH2DiYoqy9ohP8";
let photos = [
    {
        src: "https://picsum.photos/200/300",
    },
    {
        src: "https://picsum.photos/200/300",
    },
    {
        src: "https://picsum.photos/200/300",
    },
    {
        src: "https://picsum.photos/200/300",
    },
    {
        src: "https://picsum.photos/200/300",
    },
    {
        src: "https://picsum.photos/200/300",
    },
    {
        src: "https://picsum.photos/200/300",
    },
    {
        src: "https://picsum.photos/200/300",
    },
    {
        src: "https://picsum.photos/200/300",
    },
    {
        src: "https://picsum.photos/200/300",
    },
];


export default function Gallerypanel(){
    return (
        <div  style={{width:"80%"}}>
        <Gallery  enableImageSelection={false} images={photos} />
        </div>
      );
    }