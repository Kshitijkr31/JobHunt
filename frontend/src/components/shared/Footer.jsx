import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-white border-t border-gray-200 mt-16'>
      {/* Main Footer */}
      <div className='max-w-7xl mx-auto px-6 py-10'>
        <div className='flex flex-col md:flex-row justify-between gap-10'>
          {/* Brand */}
          <div className='max-w-md'>
            <h2 className='text-2xl font-bold tracking-tight'>
              Job
              <span className='text-[#1b02f8]'>Hunt</span>
            </h2>

            <p className='mt-3 text-sm text-gray-500 leading-6'>
              Navigate your career path with confidence. Discover opportunities,
              connect with companies, and find your next dream job.
            </p>

            {/* Social Icons */}
            <div className='flex items-center gap-3 mt-5'>
              <a
                href='https://github.com/Kshitijkr31'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='GitHub'
                className='w-10 h-10 flex items-center justify-center rounded-full
                bg-gray-100 hover:bg-black hover:text-white
                transition-all duration-300 hover:-translate-y-1'
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>

              <a
                href='https://x.com/kshitijkumar31'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='X'
                className='w-10 h-10 flex items-center justify-center rounded-full
                bg-gray-100 hover:bg-black hover:text-white
                transition-all duration-300 hover:-translate-y-1'
              >
                <FontAwesomeIcon icon={faXTwitter} />
              </a>

              <a
                href='https://www.linkedin.com/in/kshitij-kumar-81b699204/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='LinkedIn'
                className='w-10 h-10 flex items-center justify-center rounded-full
                bg-gray-100 hover:bg-blue-600 hover:text-white
                transition-all duration-300 hover:-translate-y-1'
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className='font-semibold text-gray-900 mb-4'>JobHunt</h3>

            <p className='text-sm text-gray-500 leading-6 max-w-xs'>
              Find the right opportunity and take the next step in your career.
            </p>

            <Link
              to='/jobs'
              className='inline-flex items-center gap-2 bg-[#4f46e5] text-white px-5 py-3 rounded-lg font-semibold hover:bg-[#4338ca] transition'
            >
              Explore Jobs
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className='border-t border-gray-200 mt-10 pt-6
          flex flex-col md:flex-row justify-between items-center gap-3'
        >
          <p className='text-sm text-gray-500'>
            © {currentYear}{" "}
            <span className='font-semibold text-gray-700'>JobHunt</span>. All
            rights reserved.
          </p>

          <p className='text-xs text-gray-400'>Navigate Your Career Path 🚀</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
