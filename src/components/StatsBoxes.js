import React from "react";
import { motion } from "framer-motion";
import { Users, Globe, BookOpen, Building } from "lucide-react"; // Use icons related to your stats
import "./statsBoxes.css"; // Custom CSS file for additional styling

const StatsBoxes = () => {
  const stats = [
    {
      icon: <Globe className="w-10 h-10 text-[#3992CE]" />,
      title: "Approximately 1000",
      description: "Members and Beneficiaries",
    },
    {
      icon: <BookOpen className="w-10 h-10 text-[#3992CE]" />,
      title: "13",
      description: "Vicarate",
    },
    {
      icon: <Building className="w-10 h-10 text-[#3992CE]" />,
      title: "45+",
      description: "Universities and Colleges",
    },
  ];

  return (
    <div className="stats-container bg-white text-gray-800 py-12">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delayChildren: 0.2 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-box p-6 border border-gray-300 rounded-2xl shadow-md hover:shadow-lg flex flex-col items-center text-center bg-gray-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="icon mb-4">{stat.icon}</div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.title}</h3>
            <p className="text-sm text-gray-600">{stat.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default StatsBoxes;
