import React from "react";
import { motion } from "framer-motion";
import "./history.css"
import { CheckCircle } from "lucide-react";
const History = () => {
  return (
    <div className="history-container bg-blue-50 py-12 px-6 md:px-20 lg:px-40">
      {/* Title Section */}
      <h1 className="history-title">History</h1>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          IMCS PAX ROMANA 
        </h2>
        <ul className="space-y-15">
              <li className="flex items-start gap-4">
                <CheckCircle className="w-5 h-5 history-list-icon flex-shrink-0" />
                <div>
                  <p className="history-list-description">IMCS PAX ROMANA, established in 1921, is a global organization uniting over 80 national federations of Catholic students in higher education.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-5 h-5 history-list-icon flex-shrink-0" />
                <div>
                  <p className="history-list-description">With a focus on promoting peace, justice, and intellectual and moral growth, IMCS operates in an advisory capacity to various United Nations bodies and engages with regional and international organizations. </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-5 h-5 history-list-icon flex-shrink-0" />
                <div>
                  <p className="history-list-description">Established in Africa in 1956 and based in Nairobi since 1978, it is recognized by bishops' conferences in 25 countries  with active members. </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-5 h-5 history-list-icon flex-shrink-0" />
                <div>
                  <p className="history-list-description"> The strategic plan for 2023-2027 centers on evangelization, sustainable development, environmental stewardship, peace, social justice, and faith, aiming to transform and empower students as global leaders.</p>
                </div>
              </li>
          </ul>
      </motion.div>

      {/* Learn More Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <a href="/history">
          <motion.button
            className="relative px-8 py-3 font-semibold text-lg rounded-md overflow-hidden bg-transparent border-2 border-blue-500 text-blue-500"
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient" />
            <span className="relative z-10 text-white">Learn More</span>
          </motion.button>
        </a>
      </motion.div>
    </div>
  );
};

export default History;
