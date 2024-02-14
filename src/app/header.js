import React from "react";
import Image from 'next/image'
import "./header.css";
const Header = () => {
  return (
    <header id="header">
      <div id="main_logo">
        <Image src={`/assets/logo.png`} alt={"Main logo"} width="100" height="64" />
      </div>
      <div id="heading">
        <div id="main_head">
          NAAM
        </div>
        <div id="sub_head">
          Navodaya Alumni Association, Malampuzha
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
    </header>
  );
};
export default Header;