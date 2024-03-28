import React from "react";
import "./footer.css";
import { SocialIcon } from 'react-social-icons/component'
import { FaPhoneSquareAlt } from 'react-icons/fa';
import { socialMediaUrls } from '../homepage/data'
import 'react-social-icons/linkedin'
import 'react-social-icons/facebook'
import 'react-social-icons/twitter'
import 'react-social-icons/instagram'
import 'react-social-icons/youtube'
import Image from 'next/image'


const Footer = () => {
  return (
    <div id="footer">
      <div id="foooter">
      <div id="footer_text">
        <Image id="logo" src={`/assets/logo.png`} alt={"Main logo"} width="100" height="100" />
        <div id="footer_heading">NAAM</div>
        <div id="footer_subhead">Navodaya Alumni Association, Malampuzha</div>
      </div>
      <div id="footer_links">
        <div className="footer_link">Home</div>
        <div className="footer_link">About</div>
        <div className="footer_link">Events</div>
        <div className="footer_link">Gallery</div>
        <div className="footer_link">Contact</div>
      </div>
      <div id="social">
        {socialMediaUrls.map(url => (
          <div className="social_icons" key={url}>
            <SocialIcon url={url} className="soc_icons" />
          </div>
        ))}
        <div className="social_icons">
          <FaPhoneSquareAlt size={32} className="soc_icons" />
        </div>
      </div>
      </div>
      <div id="copyright">
      copyright@2024
      </div>
    </div>



  );
};
export default Footer;
