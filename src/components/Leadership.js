import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import the arrow icons

const leaders = [
  {
    name: "Elsabeth Epherem",
    role: "National Office Head",
    image: require("../images/person-icon.png"),
  },
  {
    name: "Alice Smith",
    role: "African Office Chairman",
    image: require("../images/person-icon.png"),
  },
  {
    name: "Michael Johnson",
    role: "African Office Chairman",
    image: require("../images/person-icon.png"),
  },
  {
    name: "Fasica Lachore",
    role: "Secretary general for Imcs-Pax-Romana",
    image: require("../images/person-icon.png"),
  },
  {
    name: "David Brown",
    role: "World Office Representative",
    image: require("../images/person-icon.png"),
  },
  {
    name: "",
    role: "Imcs Pax Romana",
    image: require("../images/cropped-IMCS-Logo_edited-White-tex.png"),
  },
];

const Leadership = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Check for mobile screen width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust this width as necessary
    };

    // Check on mount
    checkMobile();

    // Add event listener to handle screen resize
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Handle auto-slide for mobile
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % leaders.length);
      }, 15000); // Change slide every 15 seconds

      return () => clearInterval(interval); // Cleanup on component unmount
    }
  }, [isMobile]);

  // Navigate to previous or next slide
  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % leaders.length); // Move to the next slide
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + leaders.length) % leaders.length); // Move to the previous slide
  };

  return (
    <div className="min-h-screen bg-blue-50 py-16 px-6 md:px-20 flex flex-col items-center">
      {/* Title Section */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-center text-[#3992CE] mb-12"
      >
        Our Leadership Team
      </motion.h2>

      {/* Leadership Cards */}
      <div
        className={`${
          isMobile ? "w-full overflow-hidden relative" : "grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {isMobile ? (
          <>
            {/* Back and Next Buttons */}
            {/* <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-3xl text-gray-600 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
            >
              <FaArrowLeft />
            </button> */}

            <div
              className="flex transition-all duration-500 transform"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {leaders.map((leader, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className="relative w-full flex-shrink-0"
                >
                  {/* Leader Image */}
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-64 object-cover transition-all duration-500 group-hover:brightness-50"
                  />

                  {/* Name & Role Section (Always Visible) */}
                  <div className="absolute bottom-0 w-full bg-opacity-60 text-white text-center py-4 transition-all duration-500 group-hover:opacity-0">
                    <h3 className="text-lg font-semibold">{leader.name}</h3>
                    <p className="text-sm">{leader.role}</p>
                  </div>

                  {/* Hidden Details (Visible on Hover) */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white px-4">
                    <h3 className="text-xl font-semibold">{leader.name}</h3>
                    <p className="text-sm">{leader.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-3xl text-gray-600 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
            >
              <FaArrowRight />
            </button>
          </>
        ) : (
          leaders.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="relative bg-white rounded-xl shadow-xl overflow-hidden group transform transition-all duration-500 hover:scale-105"
            >
              {/* Leader Image */}
              <img
                src={leader.image}
                alt={leader.name}
                className="w-full h-64 object-cover transition-all duration-500 group-hover:brightness-50"
              />

              {/* Name & Role Section (Always Visible) */}
              <div className="absolute bottom-0 w-full bg-opacity-60 text-white text-center py-4 transition-all duration-500 group-hover:opacity-0">
                <h3 className="text-lg font-semibold">{leader.name}</h3>
                <p className="text-sm">{leader.role}</p>
              </div>

              {/* Hidden Details (Visible on Hover) */}
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white px-4">
                <h3 className="text-xl font-semibold">{leader.name}</h3>
                <p className="text-sm">{leader.role}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leadership;
