import React, { useState, useEffect } from "react";
import { FiLogOut} from "react-icons/fi";
import './navbar.css'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  // Check if user is logged in when component mounts
  useEffect(() => {
    const user = localStorage.getItem("user"); // Assume user data is stored in localStorage
    if (user) {
      setIsLoggedIn(true);
      console.log(user)
    }
  }, []);

  // Toggle Mobile Menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from storage
    setIsLoggedIn(false); // Update state
    window.location.reload()
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="w-full bg-[#3992CE] text-white flex justify-between items-center p-4">
            <p>{ isLoggedIn && <p>Admin</p>} </p>
            <p className="flex space-x-4">
                <a href="/terms-conditions" className="text-white no-underline hover:underline">Terms & Conditions</a>
                <a href="/terms-conditions" className="text-white no-underline hover:underline">Privacy Policy</a>
            </p>
     </div>
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center py-4 list-container">
          {/* Logo */}
          <div className="navbar-logo">
            <a href="/">
              <img src={require("../images/logomani-removebg-preview.png")} alt="logo-of-Imcs-Ethipia" />
            </a>
          </div>

          {/* Desktop Menu Items */}
          <ul className="hidden md:flex space-x-2">
            <li><a href="/" className="text-gray-600 transition duration-300">Home</a></li>
            <li><a href="/about" className="text-gray-600 transition duration-300">About</a></li>
            <li><a href="/blogsGrid" className="text-gray-600 transition duration-300">News/blog</a></li>
            <li><a href="/farewell-book" className="text-gray-600 transition duration-300">Graduates</a></li>
            <li><a href="/contact" className="text-gray-600 transition duration-300">Contact</a></li>
            <li><a href="/students" className="text-gray-600 transition duration-300">Database</a></li>

            {!isLoggedIn ? (
              <li><a href="/login" className="text-gray-600 transition duration-300">Login</a></li>
            ) : (
              <li><button onClick={handleLogout} className="flex gap-1 rounded-[7px] bg-blue-500 text-white px-3 py-2 hover:bg-blue-600 w-[110px]">
                      <FiLogOut size={20} />Logout</button></li>
            )}
          </ul>

          {/* Hamburger Menu (Mobile View) */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-gray-600 focus:outline-none">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden bg-white shadow-lg`}>
          <ul className="space-y-2 p-4">
            <li><a href="/" className="block text-gray-600 transition duration-300">Home</a></li>
            <li><a href="/about" className="block text-gray-600 transition duration-300">About</a></li>
            <li><a href="/blogsGrid" className="block text-gray-600 transition duration-300">news/blog</a></li>
            <li><a href="/farewell-book" className="block text-gray-600 transition duration-300">Graduates</a></li>
            <li><a href="/contact" className="block text-gray-600 transition duration-300">Contact</a></li>
            <li><a href="/students" className="block text-gray-600 transition duration-300">Database</a></li>

            {!isLoggedIn ? (
              <li><a href="/login" className="text-gray-600 transition duration-300">Login</a></li>
            ) : (
              <li><button onClick={handleLogout} className="flex gap-1 rounded-[7px] bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 w-[100px]">
                      <FiLogOut size={20} />Logout</button></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
