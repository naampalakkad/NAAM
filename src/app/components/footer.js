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

const Footer = () => {
  return (
    <footer id="foooter">
  <div id="social">
    {socialMediaUrls.map(url => (
      <div className="social_icons" key={url}>
        <SocialIcon url={url} className="soc_icons"/>
      </div>
    ))}
    <div className="social_icons">
      <FaPhoneSquareAlt size={32} className="soc_icons"/>
    </div>
  </div>
        <div id="copyright">
        @copyright 2024
        </div>
    </footer>


  );
};
export default Footer;
