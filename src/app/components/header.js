'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import "./header.css";
import { MenuItems } from "../homepage/data";


export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', function () {
      const header = document.getElementById('header');
      if (window.pageYOffset > 0) {
        header.style.backgroundColor = 'rgb(0, 19, 59)';
        header.style.color = 'rgb(255, 255, 255)';
      } else {
        header.style.backgroundColor = 'transparent';
        header.style.color = 'rgb(23, 110, 81)';
        header.style.color = 'rgb(23, 110, 81)';
}
});
  }


  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 850);
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
    }
  }, []);

  const MenuItem = ({ item }) => (
    <a href={item.link}>
      <div className="main_icons">{item.name}</div>
    </a>
  );

  const gotohome = () => {
    window.location.href = '/';
  }

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
          <div id="menuToggle">
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
            <ul id="menu">
              {MenuItems.map(item => <li key={item.name}><MenuItem item={item} /></li>)}
            </ul>
          </div>
        ) : (
          <div id="main_menu">
            {MenuItems.map(item => <MenuItem key={item.name} item={item} />)}
          </div>
        )}
      </div>
      {/* <div id="header_space"></div> */}
    </header>
  );
};