'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useColorMode, useDisclosure, Flex, Box, Text } from '@chakra-ui/react';
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,  IconButton } from "@chakra-ui/react";
import './header.css'
import { HamburgerIcon } from '@chakra-ui/icons';
import { MenuItems } from '@/lib/data';
import { ThemeToggleButton } from './themetoggle';

export default function Header() {
  const { colorMode } = useColorMode();
  const [isMobile, setIsMobile] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 850);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      const header = document.getElementById('header');
      if (header) {
        if (window.pageYOffset > 0) {
          header.style.backgroundColor = colorMode === 'dark' ? 'rgb(0, 19, 59)' : 'rgb(0, 19, 59)';
          header.style.color = colorMode === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(255, 255, 255)';
          header.style.boxShadow = colorMode === 'dark' ? '0px 0px 10px rgba(0, 0, 0, 0.3)' : 'none';
        } else {
          header.style.backgroundColor = 'transparent';
          header.style.color = colorMode === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(23, 110, 81)';
          header.style.boxShadow = 'none';
        }
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [colorMode]);

  const gotohome = () => {
    window.location.href = '/';
  };

  const MenuItem = ({ item }) => (
    <a href={item.link} className="main_icons">
      {item.name}
    </a>
  );

  return (
    <header>
      <Flex id="header" alignItems="center" justifyContent="space-between" p={4} bg={colorMode === 'dark' ? 'rgb(0, 19, 59)' : 'transparent'} color={colorMode === 'dark' ? 'white' : 'rgb(23, 110, 81)'}>
        <Box id="heading" onClick={gotohome} display="flex" alignItems="center">
          <Image src={`/assets/logo.png`} alt="Main logo" width={isMobile ? 70 : 64} height={isMobile ? 70 : 64} style={{ borderRadius: '50%' }} />
          <Box ml={4} textAlign="left">
            <Text fontSize="xl" fontWeight="bold">NAAM</Text>
            <Text fontSize="sm">Navodaya Alumni Association, Malampuzha</Text>
          </Box>
        </Box>

        {isMobile ? (
          <IconButton icon={<HamburgerIcon />} onClick={onOpen} variant="ghost" aria-label="Open Menu" />
        ) : (
          <Box id="main_menu" display="flex" alignItems="center">
            {MenuItems.map((item) => (
              <MenuItem key={item.name} item={item} />
            ))}
            <ThemeToggleButton />
          </Box>
        )}

        <Drawer colorScheme="yellow" isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody className='drawerbody'>
              {MenuItems.map((item) => (
                <MenuItem key={item.name} item={item} />
              ))}
              <ThemeToggleButton />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </header>
  );
}
