'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Box, Image, Flex, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { getCarouselImageUrls } from '@/lib/data';
import { TypeAnimation } from 'react-type-animation';

const MotionImage = motion(Image);

export default function Carousal() {
  const [currentImg, setCurrentImg] = useState('./assets/caros.webp');
  const [imageUrls, setImageUrls] = useState([]);
  const currentIndex = useRef(0);

  useEffect(() => {
    getCarouselImageUrls().then((urls) => {
      setImageUrls(urls);
      setCurrentImg(urls[0]);
    });
  }, []);

  useEffect(() => {
    if (imageUrls.length > 0) {
      const interval = setInterval(() => {
        currentIndex.current = (currentIndex.current + 1) % imageUrls.length;
        setCurrentImg(imageUrls[currentIndex.current]);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [imageUrls]);

  return (
    <Box position="relative" width="100%" height="100vh" overflow="hidden" bg="black">
      <MotionImage
        src={currentImg}
        alt="carousel image"
        key={currentImg}
        width="100%"
        height="100%"
        objectFit="cover"
        opacity={0.3}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ duration: 1 }}
      />
      <Flex
        direction="column"
        justify="center"
        align="center"
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        textAlign="center"
        px={{ base: 4, md: 10 }}
      >
        <Heading color="white" fontSize={{ base: '2.5rem', md: '7rem' }} fontFamily="Open Sans">
          NAAM<br /> The Navodayan Family
        </Heading>
        <TypeAnimation
          sequence={[
            'Enter to Learn,',
            4000,
            'Exit to serve.',
            4000,
            'Navodaya Alumni Association Palakkad',
            4000,
          ]}
          wrapper="span"
          speed={10}
          style={{
            color: 'white',
            fontSize: '3rem',
            fontFamily: 'Black Ops One, system-ui',
          }}
          repeat={Infinity}
        />
      </Flex>
    </Box>
  );
}
