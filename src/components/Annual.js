import React from "react";
import { motion } from "framer-motion";
import "./annual.css"

const Annual = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#3992CE] text-white px-6 md:px-20 gap-8 py-10">
      {/* Flyer Image */}
      <motion.div
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <img
          src={require("../images/Yearly gathering.png")}
          alt="Annual Gathering Flyer"
          className="h-auto max-h-[90vh] max-w-full object-contain rounded-lg shadow-lg"
        />
      </motion.div>

      {/* Description Section */}
      <motion.div
        initial={{ x: "-100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="w-full md:w-1/2 flex flex-col justify-center space-y-6 text-left px-4 md:px-0"
      >
        <h1 className="text-4xl font-bold annual-tittle-h1">IMCS Ethiopia Annual Gathering</h1>
        <p className="text-lg annual-description">
          The IMCS Ethiopia Annual Gathering brings together student
          representatives from universities nationwide for a transformative week
          of learning, leadership, and unity. The program includes insightful
          sessions on faith, psychology, peacebuilding, and environmental
          stewardship.
        </p>
        <h2 className="text-2xl font-semibold annual-tittle">Objective</h2>
        <p className="text-lg annual-description">
          To equip students with knowledge, strengthen their faith, and foster
          national unity through meaningful dialogue and activities.
        </p>
        <h2 className="text-2xl font-semibold annual-tittle">Activities</h2>
        <p className="text-lg annual-description">
          The gathering includes educational workshops, leadership training,
          discussions on social issues, sports, cultural activities, and
          experience-sharing sessions that promote brotherhood and growth.
        </p>
      </motion.div>
    </div>
  );
};

export default Annual;
