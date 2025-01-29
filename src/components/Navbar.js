import React, { useState } from "react";
import './navbar.css'

const Navbar = () => {
  // State to track if the mobile menu is open
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4 list-container">
          {/* Logo */}
          <div className="navbar-logo">
            <a href="/">
              <img src={require("../images/logomani-removebg-preview.png")} alt="logo-of-Imcs-Ethipia" />
            </a>
          </div>

          {/* Desktop Menu Items */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <a
                href="/"
                className="text-gray-600  transition duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-gray-600  transition duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/blog"
                className="text-gray-600  transition duration-300"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="/farewell-book"
                className="text-gray-600  transition duration-300"
              >
                Farewell Book
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-gray-600  transition duration-300"
              >
                Contact Us
              </a>
            </li>
          </ul>

          {/* Hamburger Menu (Mobile View) */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600  focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:hidden bg-white shadow-lg`}
        >
          <ul className="space-y-2 p-4">
            <li>
              <a
                href="/"
                className="block text-gray-600  transition duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="block text-gray-600  transition duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/blog"
                className="block text-gray-600  transition duration-300"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="/farewell-book"
                className="block text-gray-600  transition duration-300"
              >
                Farewell Book
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="block text-gray-600  transition duration-300"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
