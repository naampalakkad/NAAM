import React from "react";
import "./footer.css";
import { SocialIcon } from 'react-social-icons/component'
import { FaPhoneSquareAlt } from 'react-icons/fa';
import 'react-social-icons/linkedin'
import 'react-social-icons/facebook'
import 'react-social-icons/twitter'
import 'react-social-icons/instagram'
import 'react-social-icons/youtube'
const Footer = () => {
  return (
    <footer id="footer">
      <div id="foooter">
        <div id="social">
          <div className="social_icons">
            <SocialIcon url="www.linkedin.com" className="soc_icons"/>
          </div>
          <div className="social_icons">
            <SocialIcon url="www.facebook.com" className="soc_icons"/>
          </div>
          <div className="social_icons">
            <SocialIcon url="www.twitter.com" className="soc_icons"/>
          </div>
          <div className="social_icons">
            <SocialIcon url="www.instagram.com" className="soc_icons"/>
          </div>
          <div className="social_icons">
            <SocialIcon url="www.youtube.com" className="soc_icons"/>
          </div>
          <div className="social_icons phone_icon">
            <a href="https://www.yourwebsite.com/contact" className="soc_icons">
              <FaPhoneSquareAlt size={32} className="soc_icons"/>
            </a>
          </div>

        </div>
        <div id="copyright">
        @copyright 2024
        </div>
      </div>
    </footer>


  );
};
export default Footer;
