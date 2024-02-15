import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import "./header.css";

const Header = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 850);
    setHasMounted(true);
    console.log("Mounted and set isMobile to ", isMobile);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <header >
      {isMobile ? (
        <div id='header'>
          <div id="heading">
            <div >
              <Image id="logo" src={`/assets/logo.png`} alt={"Main logo"} width="100" height="64" />
            </div>
            <div id="heading_text">
              <div id="main_head">NAAM</div>
              <div id="sub_head">Navodaya Alumni Association, Malampuzha</div>
            </div>
          </div>
          <div id='hamburger_menu'>
            <nav role='navigation'>
              <div id="menuToggle">
                <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
                <ul id="menu">
                  <li>
                    <a href="#">Gallery</a>
                  </li>
                  <li>
                    <a href="#">Alum</a>
                  </li>
                  <li>
                    <a href="#">Calender</a>
                  </li>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Register</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

        </div>
      ) : (
        <div id='header'>
          <div id="heading">
              <Image src={`/assets/logo.png`} alt={"Main logo"} width="100" height="64" id='logo' />
            <div id="heading_text">
              <div id="main_head">NAAM</div>
              <div id="sub_head">Navodaya Alumni Association, Malampuzha</div>
            </div>
          </div>

          <div id="main_menu">
            <div className="main_icons">Gallery</div>
            <div className="main_icons">Alum</div>
            <div className="main_icons">News</div>
            <div className="main_icons">Calender</div>
            <div className="main_icons">About Us</div>
            <div className="main_icons">Register</div>

          </div>
        </div>
      )}
    </header>
  );
};

export default Header;