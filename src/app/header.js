import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import "./header.css";

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 850);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 850);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header >
      {isMobile ? (
        <div id='header'>
          <div id="heading">
            <div id="logo">
              <Image src={`/assets/logo.png`} alt={"Main logo"} width="100" height="64" />
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
                  <a href="#">
                    <li>Gallery</li>
                  </a>
                  <a href="#">
                    <li>Alum</li>
                  </a>
                  <a href="#">
                    <li>Calender</li>
                  </a>
                  <a href="#">
                    <li>About Us</li>
                  </a>
                  <a href="#">
                    <li>Register</li>
                  </a>
                </ul>
              </div>
            </nav>
          </div>

        </div>
      ) : (
        <div id='header'>
          <div id="heading">
            <div id="logo">
              <Image src={`/assets/logo.png`} alt={"Main logo"} width="100" height="64" />
            </div>
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