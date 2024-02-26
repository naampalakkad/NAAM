'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './carousal.css';
import {carousalimgs, getCarouselImageUrls} from './data';


export default function Carousal(){
  const [currentImg, setCurrentImg] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  let currentIndex = 0;

  useEffect(() => {
    getCarouselImageUrls().then((urls) => {
      setImageUrls(urls);
      setCurrentImg(urls[0]);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % imageUrls.length;
      setCurrentImg(imageUrls[currentIndex]);
    }, 5000);
    return () => clearInterval(interval);
  }, [imageUrls]);

  if (!currentImg) {
    return null; // or a loading spinner
  }

  return (
    <div className='carousalbox' >
      <motion.img className='carousalimg' src={currentImg}  key={currentImg}  initial={{ opacity: 0, y: -100  }} animate={{ opacity: 0.5, y:0 }} transition={{ duration: 1 }}   />
      <div  className='heroText'>NAAAM: The Navodayan Family</div>
    </div>
  );
}