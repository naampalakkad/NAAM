'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MenuItems } from "@/lib/data";
import { ThemeToggleButton } from "./themetoggle";
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, IconButton, Flex, Box, Link, Heading, Spacer } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 850);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    function handleScroll() {
      const header = document.getElementById('header');
      if (window.pageYOffset > 0) {
        header.style.backgroundColor = 'rgb(0, 19, 59)';
        header.style.color = 'rgb(255, 255, 255)';
        header.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.3)';
      } else {
        header.style.backgroundColor = 'transparent';
        header.style.color = 'rgb(23, 110, 81)';
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const MenuItem = ({ item }) => (
    <Link
      href={item.link}
      padding="2rem"
      _hover={{ textDecoration: 'none', backgroundColor: 'rgba(0, 19, 59, 0.1)', borderRadius: 'md' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Box className="main_icons">{item.name}</Box>
    </Link>
  );

  const gotohome = () => {
    window.location.href = '/';
  };

  return (
    <header>
      <Flex id="header" align="center" padding="1rem" transition="all 0.3s">
        <Flex id="heading" align="center" cursor="pointer" onClick={gotohome}>
          <Image id="logo" src={`/assets/logo.png`} alt="Main logo" width="100" height={isMobile ? 100 : 64} />
          <Box ml="2">
            <Heading id="main_head" as="h1" size="lg">NAAM</Heading>
            <Heading id="sub_head" as="h2" size="sm">Navodaya Alumni Association, Malampuzha</Heading>
          </Box>
        </Flex>
        <Spacer />
        {isMobile ? (
          <>
            <IconButton
              icon={<HamburgerIcon />}
              onClick={onOpen}
              variant="outline"
              aria-label="Open Menu"
            />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton mt="2rem" />
                <DrawerHeader fontSize="2xl" borderBottomWidth="1px">Menu</DrawerHeader>
                <DrawerBody>
                  {MenuItems.map(item => (
                    <MenuItem key={item.name} item={item} />
                  ))}
                  <ThemeToggleButton />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          <Flex id="main_menu" align="center">
            {MenuItems.map(item => (
              <MenuItem key={item.name} item={item} />
            ))}
            <ThemeToggleButton />
          </Flex>
        )}
      </Flex>
    </header>
  );
}
