'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

let carousalimgs = [
     "./assets/carousalimgs/1.webp",
     "./assets/carousalimgs/2.webp",
     "./assets/carousalimgs/3.webp",
     "./assets/carousalimgs/4.webp",
     "./assets/carousalimgs/5.webp",
     "./assets/carousalimgs/6.webp",
];

let styles = {
    carousalbox: {
        position: "relative",
        width: "100%",
        height: "65vh",
        overflow: "hidden",
        backgroundColor: "black",
    },
    carousalimg: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: "0.3",
    },
    herotext: {
        position: "absolute",
        top: "50%",
        left: "20%",
        color: "white",
        fontSize: "5rem",
        fontWeight: "bold",
    },
};

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
      <div style={styles.carousalbox}>
             <motion.img src={currentImg}  key={currentImg}  initial={{ opacity: 0, y: -100  }} animate={{ opacity: 0.5, y:0 }} transition={{ duration: 1 }}  style={styles.carousalimg}   />
             <div style={styles.herotext}>NAAAM: The Navodayan Family</div>
        </div>
  );
}
