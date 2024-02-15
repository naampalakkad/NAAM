'use client';
import React, { useState, useEffect } from 'react';

let carousalimgs = {
    img1: "./assets/carousalimgs/1.jpg",
    img2: "./assets/carousalimgs/2.jpg",
    img3: "./assets/carousalimgs/3.jpg",
    img4: "./assets/carousalimgs/4.jpg",
    img5: "./assets/carousalimgs/5.jpg",
    img6: "./assets/carousalimgs/6.jpg",
};


let styles = {
   carousalbox: {
       width: "100%",
       height: "100%",
       overflow: "hidden",
       position: "relative",
       backgroundColor: "black"
   },
    carousalimg: {
        width: "100vw",
        height: "60vh",
        display: "flex",
        transition: "transform 300ms ease-in-out",
        opacity: "0.5",
    },
    herotext: {
        position: "absolute",
        top: "50%",
        left: "10%",
        color: "yellow",
        fontSize: "100px",
        fontWeight: "bold",
        position: "absolute",
        textAlign: "left",
    },
};




export default function Carousal(){
  const [currentImg, setCurrentImg] = useState(carousalimgs[0]);
  let currentIndex = 0;
  useEffect(() => {
    setInterval(() => {
       currentIndex = (currentIndex + 1) % carousalimgs.length;
        return carousalimgs[currentIndex];
    }, 5000);

  }, [carousalimgs]);
  return (
     <div style={styles.carousalbox}>
          <img src={currentImg}  style={styles.carousalimg} />
          <div style={styles.herotext}>NAAAM: The Navodayan Family</div>
      </div>
  );
}
