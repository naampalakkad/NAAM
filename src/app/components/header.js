'use client';

import { useState, useEffect, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Flex,
  Box,
  Heading,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  HStack,
  position,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { MenuItems } from '@/lib/data';
import { ThemeToggleButton } from './themetoggle';

const MenuItem = memo(({ item }) => (
  <Link href={item.link} passHref>
    <Text  className="main_icons" ml={4}>
      {item.name}
    </Text>
  </Link>
));

export default function Header() {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const headerBg = useColorModeValue('transparent', 'transparent');
  const headerScrolledBg = useColorModeValue('rgb(0, 19, 59)', 'rgb(0, 19, 59)');
  const headerColor = useColorModeValue('rgb(23, 110, 81)', 'white');
  const drawerBg = useColorModeValue('white', 'rgb(0, 19, 59)');
  const drawerTextColor = useColorModeValue('black', 'white');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 850);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const gotohome = () => {
    window.location.href = '/';
  };

  return (
    <header style={{display:"block", position:"fixed", width:"100%", zIndex:"999", top:0, left:0}}>
      <Flex
        id="header"
        alignItems="center"
        justifyContent="space-between"
        p={4}
        bg={isScrolled ? headerScrolledBg : headerBg}
        color={headerColor}
        transition="background-color 0.3s ease"
      >
        <Box id="heading" onClick={gotohome} display="flex" alignItems="center">
          <Image
            src={`/assets/logo.webp`}
            alt="Main logo"
            width={isMobile ? 70 : 64}
            height={isMobile ? 70 : 64}
            style={{ borderRadius: '50%' }}
          />
          <Box ml={4} textAlign="left">
            <Text fontSize="xl" fontWeight="bold">NAAM</Text>
            <Text fontSize="sm">Navodaya Alumni Association, Malampuzha</Text>
          </Box>
        </Box>

        {isMobile ? (
          <IconButton
            icon={<HamburgerIcon />}
            onClick={onOpen}
            variant="ghost"
            aria-label="Open Menu"
            color={headerColor}
          />
        ) : (
          <Box id="main_menu" display="flex" alignItems="center">
            {MenuItems.map((item) => (
              <MenuItem key={item.name} item={item} />
            ))}
            <ThemeToggleButton />
          </Box>
        )}

        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          size="sm" // Controls the initial width of the drawer
          autoFocus={false}
        >
          <DrawerOverlay />
          <DrawerContent bg={drawerBg} color={drawerTextColor} maxWidth="250px">
            <DrawerHeader>
              <HStack justifyContent="space-between" w="full" alignSelf={"center"}>
                <Heading size="md">Menu</Heading>
                <DrawerCloseButton />
              </HStack>
            </DrawerHeader>
            <DrawerBody>
              {MenuItems.map((item) => (
                <HStack key={item.name} p={3} spacing={4}>
                  <MenuItem item={item} />
                </HStack>
              ))}
              <HStack p={3} spacing={4}>
                <ThemeToggleButton />
              </HStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </header>
  );
}
