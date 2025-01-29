import React from "react";
import { motion } from "framer-motion";

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
    role: "Secretary geneal for Imcs-Pax-Romana",
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
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {leaders.map((leader, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default Leadership;
