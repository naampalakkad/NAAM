'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import "./header.css";
import { MenuItems } from "@/lib/data";
import { ThemeToggleButton } from "./themetoggle";
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 850);
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', function () {
        const header = document.getElementById('header');
        if (window.pageYOffset > 0) {
          header.style.backgroundColor = 'rgb(0, 19, 59)';
          header.style.color = 'rgb(255, 255, 255)';
          header.style.boxShadow = '0px 0px 10px rgb(0, 0, 0, 0.3)';
        } else {
          header.style.backgroundColor = 'transparent';
          header.style.color = 'rgb(23, 110, 81)';
        }
      });
    }
  }, []);

  const MenuItem = ({ item }) => (
    <a href={item.link}>
      <div className="main_icons">{item.name}</div>
    </a>
  );

  const gotohome = () => {
    window.location.href = '/';
  };

  return (
    <header>
      <div id='header'>
        <div id="heading" onClick={gotohome}>
          <Image id="logo" src={`/assets/logo.png`} alt={"Main logo"} width="100" height={isMobile ? "100" : "64"} />
          <div id="heading_text">
            <div id="main_head">NAAM</div>
            <div id="sub_head">Navodaya Alumni Association, Malampuzha</div>
          </div>
        </div>

        {isMobile ? (
          <>
            <IconButton
              icon={<HamburgerIcon />}
              onClick={onOpen}
              variant="outline"
              aria-label="Open Menu"
            />
            <Drawer colorScheme={"yellow"} isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>
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
          <div id="main_menu">
            {MenuItems.map(item => <MenuItem key={item.name} item={item} />)}
            <ThemeToggleButton />
          </div>
        )}
      </div>
    </header>
  );
};
