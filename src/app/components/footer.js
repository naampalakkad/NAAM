import React from "react";
import "./footer.css";
import { SocialIcon } from 'react-social-icons/component'
import { socialMediaUrls } from '../homepage/data'
import 'react-social-icons/linkedin'
import 'react-social-icons/facebook'
import 'react-social-icons/twitter'
import 'react-social-icons/instagram'
import 'react-social-icons/youtube'
import Image from 'next/image'
import { FooterMenuItems } from "@/lib/data";
const MenuItem = ({ item }) => (
  <a href={item.link}>
    <div className="footer-menu-item">{item.name}</div>
  </a>
);
const gotohome = () => {
  window.location.href = '/';
}



const Footer = () => {

  return (
    <div id="footer">
      <div id="foooter">
        <div id="footer_text">
          <Image id="logo" src={`/assets/logo.png`} alt={"Main logo"} width="250" height="250" />
          <div>
          <div id="footer_heading">NAAM</div>
          <div id="footer_subhead">Navodaya Alumni Association</div>
          <div id="footer_subhead">Malampuzha, Palakkad, kerala, India</div>
          </div>
        </div>
        <div id="footer_links">
          {FooterMenuItems.map(item => <MenuItem key={item.name} item={item} />)}
        </div>
        <div id="social">
          {socialMediaUrls.map(url => (
            <div className="social_icons" key={url}>
              <SocialIcon url={url} className="soc_icons" />
            </div>
          ))}
          {/* <div className="social_icons">
            <FaPhoneSquareAlt size={32} className="soc_icons" />
          </div> */}
        </div>
      </div>
      <div id="copyright">
        copyright@2024
      </div>
    </div>



  );
};
export default Footer;
