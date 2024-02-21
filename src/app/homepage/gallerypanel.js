'use client'
import React from 'react';
import PhotoAlbum from "react-photo-album";
// import {photos} from './data';
import './gallerypanel.css';

let photos = [
  {
      src: "https://picsum.photos/210/300",
  },
  {
      src: "https://picsum.photos/300/300",
  },
  {
      src: "https://picsum.photos/400/300",
  },
  {
      src: "https://picsum.photos/600/300",
  },
  {
      src: "https://picsum.photos/200/700",
  },
  {
      src: "https://picsum.photos/200/200",
  },
  {
      src: "https://picsum.photos/200/800",
  },
  {
      src: "https://picsum.photos/200/900",
  },
  {
      src: "https://picsum.photos/300/400",
  },
  {
      src: "https://picsum.photos/600/200",
  },
];



export default function Gallerypanel(){
    return (
      <div className="gallerypanel" >
      <PhotoAlbum photos={photos} layout="rows" />
      </div>
      );
}

