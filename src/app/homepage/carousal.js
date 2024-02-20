'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './carousal.css';
import {carousalimgs} from './data';



export default function Carousal(){
  const [currentImg, setCurrentImg] = useState(carousalimgs[0]);
  let currentIndex = 0;
  useEffect(() => {
     const interval = setInterval(() => {
         currentIndex = (currentIndex + 1) % carousalimgs.length;
         setCurrentImg(carousalimgs[currentIndex]);
     }, 5000);
     return () => clearInterval(interval);
  }, []);
  return (
      <div className='carousalbox' >
             <motion.img className='carousalimg' src={currentImg}  key={currentImg}  initial={{ opacity: 0, y: -100  }} animate={{ opacity: 0.5, y:0 }} transition={{ duration: 1 }}   />
             <div  className='heroText'>NAAAM: The Navodayan Family</div>
        </div>
  );
}
