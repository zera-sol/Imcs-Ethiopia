import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Icons
import "./testimonySection.css"

// Sample testimony data (16 people)
const testimonies = [
    { id: 1, name: "John Doe", university: "Harvard University", text: "This platform changed my life! I learned so much and met amazing people.", image: "https://randomuser.me/api/portraits/men/1.jpg" },
    { id: 2, name: "Jane Smith", university: "Stanford University", text: "Incredible experience! Highly recommend it to everyone.", image: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: 3, name: "Alice Johnson", university: "MIT", text: "The best decision I ever made. Thank you for this opportunity!", image: "https://randomuser.me/api/portraits/women/3.jpg" },
    { id: 4, name: "Bob Brown", university: "Oxford University", text: "Absolutely fantastic! I gained so much knowledge and confidence.", image: "https://randomuser.me/api/portraits/men/4.jpg" },
    { id: 5, name: "Charlie Davis", university: "Cambridge University", text: "Life-changing experience. I will never forget it.", image: "https://randomuser.me/api/portraits/men/5.jpg" },
    { id: 6, name: "Diana Evans", university: "Yale University", text: "I am so grateful for this platform. It exceeded all my expectations.", image: "https://randomuser.me/api/portraits/women/6.jpg" },
    { id: 7, name: "Ethan Green", university: "Princeton University", text: "An amazing journey! I learned so much and grew as a person.", image: "https://randomuser.me/api/portraits/men/7.jpg" },
    { id: 8, name: "Fiona Harris", university: "Columbia University", text: "This was the best experience of my life. Thank you!", image: "https://randomuser.me/api/portraits/women/8.jpg" },
    { id: 9, name: "George Clark", university: "University of Chicago", text: "I am so happy I joined this platform. It was worth every second.", image: "https://randomuser.me/api/portraits/men/9.jpg" },
    { id: 10, name: "Hannah Lewis", university: "University of Pennsylvania", text: "I learned so much and made lifelong friends. Highly recommend!", image: "https://randomuser.me/api/portraits/women/10.jpg" },
    { id: 11, name: "Ian Walker", university: "Duke University", text: "This platform is a game-changer. I am so grateful for the experience.", image: "https://randomuser.me/api/portraits/men/11.jpg" },
    { id: 12, name: "Jessica Hall", university: "Cornell University", text: "I had an amazing time and learned so much. Thank you!", image: "https://randomuser.me/api/portraits/women/12.jpg" },
    { id: 13, name: "Kevin Young", university: "University of Michigan", text: "This was the best decision I ever made. I am so happy I joined.", image: "https://randomuser.me/api/portraits/men/13.jpg" },
    { id: 14, name: "Laura Allen", university: "University of California", text: "I am so grateful for this opportunity. It was an incredible experience.", image: "https://randomuser.me/api/portraits/women/14.jpg" },
    { id: 15, name: "Michael King", university: "University of Texas", text: "This platform is amazing. I learned so much and had a great time.", image: "https://randomuser.me/api/portraits/men/15.jpg" },
    { id: 16, name: "Nina Wright", university: "University of Washington", text: "I am so happy I joined this platform. It was an unforgettable experience.", image: "https://randomuser.me/api/portraits/women/16.jpg" }
  ];  

const TestimonySecion = () => {
  const [index, setIndex] = useState(0);
  const itemsPerSlide = window.innerWidth < 768 ? 2 : 4; // 2 for mobile, 4 for larger screens

  // Automatically slide every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + itemsPerSlide) % testimonies.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - itemsPerSlide + testimonies.length) % testimonies.length);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto p-6 testimony-container">
        <h1>Testimonies of Students</h1>
      {/* Testimony Section */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${itemsPerSlide} gap-6`}
          >
            {testimonies.slice(index, index + itemsPerSlide).map((person) => (
              <div key={person.id} className="bg-white shadow-lg p-4 rounded-lg text-center border border-gray-200">
                <img src={person.image} alt={person.name} className="w-24 h-24 rounded-full mx-auto border-4 border-[#3992CE]" />
                <h3 className="text-lg font-bold mt-2">{person.name}</h3>
                <p className="text-sm text-gray-500">{person.university}</p>
                <p className="mt-2 text-gray-700 italic">"{person.text}"</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#FDE500] p-3 rounded-full shadow-lg hover:scale-110 transition"
      >
        <ChevronLeft size={24} className="text-gray-900" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#FDE500] p-3 rounded-full shadow-lg hover:scale-110 transition"
      >
        <ChevronRight size={24} className="text-gray-900" />
      </button>
    </div>
  );
};

export default TestimonySecion;
