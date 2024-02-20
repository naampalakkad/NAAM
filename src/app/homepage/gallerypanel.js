'use client'
import React from 'react';
import { Gallery } from "react-grid-gallery";
import {photos} from './data';
import './gallerypanel.css';

// pull in the photos from the google photos link and display them in a grid




export default function Gallerypanel(){
    return (
        <div  className='gallerybox'>
        <Gallery className="gallerypanel" enableImageSelection={false} images={photos} rowHeight={300} />
        </div>
      );
    }