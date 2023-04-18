import React from 'react'
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer flex space-between">
      <div className="credits">
        <p>Created by Krishna Bellamkonda</p>
      </div>
      <div className="social-icons flex small-gap">
        <a href="https://twitter.com"><FaTwitter className="social-icon" color='#F4F2E0'/></a>
        <a href="https://facebook.com"><FaFacebook className="social-icon" color='#F4F2E0'/></a>
        <a href="https://instagram.com"><FaInstagram className="social-icon" color='#F4F2E0'/></a>
      </div>
    </footer>
  );
}

export default Footer