import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Footer = () => {
  return (
    <div className="bg-[#1A1A19] text-white py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-0">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <Link className="flex justify-center md:justify-start items-center space-x-3">
              <img src={logo} width="30px" alt="TripNest Logo" />
              <span className="text-2xl font-bold">TripNest</span>
            </Link>
            <p className="mt-8 md:mt-4 text-sm">
              &copy; {new Date().getFullYear()} TripNest. All rights reserved.
            </p>
            <p className="mt-1 text-sm">
              Contact:{" "}
              <a
                href="mailto:info@yourwebsite.com"
                className="text-blue-400 hover:underline">
                info@yourwebsite.com
              </a>
            </p>
          </div>
          <div className="flex space-x-5 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-300 transition duration-200">
              <FaFacebook size={30} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition duration-200">
              <FaTwitter size={30} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-300 transition duration-200">
              <FaInstagram size={30} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
