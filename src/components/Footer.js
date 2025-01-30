import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white">
      {/* Horizontal line */}
      <div
        className="border-t-2 mx-8 lg:mx-16 my-8"
        style={{ borderColor: '#3992CE' }}
      ></div>

      {/* Footer content */}
      <div className="container mx-auto px-8 lg:px-16 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* First column - Logo */}
          <div className="flex justify-center md:justify-center">
            <img
              src={require("../images/logomani-removebg-preview.png")}// Replace with your logo
              alt="Project Logo"
              className="h-12"
            />
          </div>

          {/* Second column - Useful Links */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#3992CE' }}>
              Useful Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-700 hover:text-gray-900">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-700 hover:text-gray-900">
                  About
                </a>
              </li>
              <li>
                <a href="/history" className="text-gray-700 hover:text-gray-900">
                  History
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-700 hover:text-gray-900">
                  Blog/News
                </a>
              </li>
              <li>
                <a href="/farewell-book" className="text-gray-700 hover:text-gray-900">
                  Farewell Book
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-700 hover:text-gray-900">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Third column - IMCS in different continents */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#3992CE' }}>
              IMCS in Different Continents
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  IMCS-MIEC Pax Romana Africa
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  IMCS Pax Romana Asian Pacific
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  IMCS Pax Romana North America
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  MIEC-JECI Latin America
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  JECI-MIEC Europe
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  IMCS Pax Romana Middle East
                </a>
              </li>
            </ul>
          </div>

          {/* Fourth column - Get in Touch */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#3992CE' }}>
              Get in Touch
            </h3>
            {/* Social media icons */}
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-700 hover:text-blue-600">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-400">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-700">
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-700 hover:text-pink-600">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-700 hover:text-red-600">
                <FaYoutube className="h-6 w-6" />
              </a>
            </div>
            {/* Leave us a message button */}
            <a
              href="/contact"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-4"
            >
              Leave us A Message
            </a>
            {/* Address */}
            <p className="text-gray-700">
              123 Main Street, City, Country
            </p>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#3992CE] text-white flex justify-between items-center p-6">
            <p>©2024. IMCS Ethiopia. All Rights Reserved.</p>
            <p className="flex space-x-4">
                <a href="/terms-conditions" className="text-white no-underline hover:underline">Terms & Conditions</a>
                <a href="/terms-conditions" className="text-white no-underline hover:underline">Privacy Policy</a>
            </p>
     </div>
    </footer>
  );
};

export default Footer;