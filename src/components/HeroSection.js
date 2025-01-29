"use client";

import React from "react";
import { motion } from "framer-motion"; // for the animation in hero text section
import { Typewriter } from "react-simple-typewriter"; // for typewriter effect
import './herosection.css'

const HeroSection = () => {
  const images = [
    require("../images/photo_5793932417726265562_y.jpg"),
    require("../images/photo_5814494706799852941_y.jpg"),
    require("../images/photo_5847943220611367131_y.jpg"),
    require("../images/photo_5847943220611367132_y.jpg"),
    require("../images/photo_5870737243411431876_y.jpg"),
    require("../images/photo_5931720792557599348_y.jpg"),
    require("../images/photo_5987952428542181323_y.jpg"),
    require("../images/photo_5793932417726265562_y.jpg"),
    require("../images/photo_5814494706799852941_y.jpg"),
    require("../images/photo_5870737243411431876_y.jpg"),
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Slide duration: 6 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {/* Slideshow Container */}
      <div className="relative h-full w-full">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Hero Text and Button */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 bg-none bg-opacity-30 hero-text"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 hero-title">
          Welcome to IMCS Ethiopia
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl mx-auto leading-relaxed text-gradient">
          <Typewriter
            className = "self-text"
            words={[
              "Inspiring, Empowering, and Serving Communities Together",
              `Mobilizing students for peace & justice since 1921`,
              "Join us on this journey of change.",
            ]}
            loop={Infinity} // Loops infinitely
            cursor
            cursorStyle="|"
            typeSpeed={70} // Speed of typing
            deleteSpeed={50} // Speed of deleting
            delaySpeed={2000} // Delay between each word
          />
        </p>
        <a href="/contact">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Contact Us
          </motion.button>
        </a>
      </motion.div>

      {/* Indicator Lines */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-8 rounded-full ${
              index === currentIndex ? "bg-blue-600" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
