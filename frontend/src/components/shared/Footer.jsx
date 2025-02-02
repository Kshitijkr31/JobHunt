import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className=" footer-mainn border-t border-t-gray-200 py-8 ml-20">
      <div className="container mx-auto px-4">
        <div className="footer-main flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 ml-8" >
            <h2 className=" footer-head text-xl font-bold">Job<span className='text-[#1b02f8]'>Hunt -</span>  <span className='text-[#F83002]'>Navigate Your Career Path.</span></h2>
            <p className=" footer-p text-sm">© 2025  All rights reserved.</p>
          </div>
          
          <div className=" footer-icons flex space-x-4 mt-4 md:mt-0 ml-[50rem]">
            <a href="https://github.com/Kshitijkr31" className="hover:text-gray-400 transition-transform transform hover:scale-110 active:scale-125" aria-label="GitHub">
              <FontAwesomeIcon icon={faGithub} className="w-6 h-6 text-gray-600" />
            </a>
            <a href="https://x.com/kshitijkumar31" className="hover:text-gray-400 transition-transform transform hover:scale-110 active:scale-125" aria-label="Twitter (X)">
              <FontAwesomeIcon icon={faXTwitter} className="w-6 h-6 text-blue-500" />
            </a>
            <a href="https://www.linkedin.com/in/kshitij-kumar-81b699204/" className="hover:text-gray-400 transition-transform transform hover:scale-110 active:scale-125" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6 text-blue-700" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;