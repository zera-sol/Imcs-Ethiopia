import React from 'react';
import { motion} from "framer-motion";
import "./popLetter.css"

const PopLetter = () => {
  // Pop's image URL
  const popImage = require("../images/pop-fransis.webp"); // Replace with your image URL

  // Pop's letter content
  const letterContent = (
    <>
      <h1 className="font-bold mb-4">A Message from Pope Francis to IMCS Pax Romana,</h1>
      <p className="mb-4">
      “I send prayerful good wishes to the students and professionals celebrating the hundredth anniversary of the International Movement of Catholic Students – Pax Romana.
      </p>
      <p className="mb-4">
      Your Movement received official recognition by the Holy Sec in 1921, and l am pleased that you have maintained your spirituality of action end fulfilled your mission of addressing the spiritual and material needs of young people in tertiary educational institutions throughout the world.
      </p>
      <p className="mb-4">
         I am likewise appreciative of the contribution you have made within the Church over this period, and for the notable fruits that have been borne in nurturing lenders and supporting the faithful in promoting Catholic social teaching in the Americas, Africa and Asia.
      </p>
      <p className="mb-4">
      Your vital apostolate encourages young people to take the lead in striving for a more just social order within their countries.”
      </p>
    </>
  );

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${popImage})` }}>
      {/* Container for large screens */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left section - Pop's image (background) */}
        <div className="w-1/2 mr-10"></div>

        {/* Right section - Letter content */}
        <div className="w-1/2 p-8 pop-letter">
          <div className="max-w-2xl mx-auto">
            <div className="prose prose-lg">
              {letterContent}
            </div>
            {/* Read More Button */}
      <div className="mt-12 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <a href="https://www.imcs-miec.org/wp-content/uploads/2024/12/His-Holiness-Pope-Francis-to-Pax-Romana-2022-1-1.pdf">
            <motion.button
              className="relative px-8 py-3 font-semibold text-lg rounded-md overflow-hidden bg-transparent border-2 border-blue-500 text-blue-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient" />
              <span className="relative z-10 text-white">Read the letter</span>
            </motion.button>
          </a>
        </motion.div>
      </div>
          </div>
        </div>
      </div>

      {/* Container for smaller screens */}
      <div className="lg:hidden flex flex-col min-h-screen p-4">
        {/* Top section - Pop's image */}
        <div className="w-full h-64 bg-cover bg-center mb-8" style={{ backgroundImage: `url(${popImage})` }}></div>

        {/* Bottom section - Letter content */}
        <div className="flex-1 p-6 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg">
          <div className="prose prose-lg">
            {letterContent}
          </div>
          {/* Read More Button */}
                <div className="mt-12 text-center">
                    <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    >
                    <a href="https://www.imcs-miec.org/wp-content/uploads/2024/12/His-Holiness-Pope-Francis-to-Pax-Romana-2022-1-1.pdf">
                        <motion.button
                        className="relative px-8 py-3 font-semibold text-lg rounded-md overflow-hidden bg-transparent border-2 border-blue-500 text-blue-500"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        >
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient" />
                        <span className="relative z-10 text-white">Read the letter</span>
                        </motion.button>
                    </a>
                    </motion.div>
                </div>
        </div>
      </div>
    </div>
  );
};

export default PopLetter;