'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './carousal.css';
import { getCarouselImageUrls } from './data';
import { TypeAnimation } from 'react-type-animation';


export default function Carousal() {
  const [currentImg, setCurrentImg] = useState('./assets/caros.webp');
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

  return (
    <div className='carousalbox' >
      <motion.img className='carousalimg' src={currentImg} key={currentImg} initial={{ opacity: 0, y: -100 }} animate={{ opacity: 0.5, y: 0 }} transition={{ duration: 1 }} />
      <div className='ctextbox'>
        <div className='heroText'>NAAM<br /> The Navodayan Family</div>
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            'Enter to Learn,',
            4000, // wait 1s before replacing "Mice" with "Hamsters"
            'Exit to serve.',
            4000,
            'Navodaya Alumni Association Palakkad',
            4000
          ]}
          wrapper="span"
          speed={10}
          className='herosubText'
          repeat={Infinity}
        />
      </div>
    </div>
  );
}