import React from "react";
import Image from 'next/image'
import "./header.css";
const Header = () => {
  return (
    <header className="header">
      <div className="main_logo">
      <Image src={`/assets/logo.png`} alt={"Main logo"} width="100" height="64" />
      </div>
      <div className="heading">
        <div className="main_head">
        NAAM
        </div>
        <div className="sub_head">
        Navodaya Alumni Association, Malampuzha
        </div>
      
      </div>
      <div className="main_menu">
        <div className="gallery">Gallery</div>
        <div className="Alum">Alum</div>
        <div className="News">News</div>
        <div className="Calender">Calender</div>
        <div className="About">About Us</div>
        <div className="Register">Register</div>

      </div>
    </header>
    );
};
export default Header;