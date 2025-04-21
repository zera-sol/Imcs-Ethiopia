import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import './navbar.css'
import api from "../api";
import axios from "axios";
import "./blog.css";
import { FaSpinner } from "react-icons/fa";

// Mock Data (replace with data fetched from backend later)
// const recentBlogs = [
//   {
//     title: "Geneva Pax Catholica Forum: A Commitment to Peace and Disarmament",
//     content:
//       "Geneva Pax Catholica Forum: A Commitment to Peace and Disarmament. Date: October 25, 2024. Venue: Franciscan International Office, Geneva (Hybrid). Hosted by IMCS Pax Romana...",
//     date: "October 25, 2024",
//     image: require("../images/photo_5814494706799852941_y.jpg"),
//   },
//   {
//     title: "Strategic Meeting with His Eminence Cardinal Berhaneyesus Suraphel D. CM",
//     content:
//       "Strategic Meeting with His Eminence Cardinal Berhaneyesus Suraphel D. CM. Santa Marta, Vatican City | October 13, 2024...",
//     date: "October 13, 2024",
//     image: require("../images/photo_5814494706799852941_y.jpg"),
//   },
//   {
//     title: "Empowering the Laity: IMCS Pax Romana at the Lay Mission and Vocation Conference on Synodality",
//     content:
//       "Empowering the Laity: IMCS Pax Romana at the Lay Mission and Vocation Conference on Synodality. Rome, Italy | October 9–13, 2024...",
//     date: "October 9, 2024",
//     image: require("../images/photo_5814494706799852941_y.jpg"),
//   },
// ];

const RecentBlog = () => {
  const [blogsToShow, setBlogsToShow] = useState(3);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] =useState(false);

  // Fetch news from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${api}/news`);
        setBlogs(response.data); // Assuming response.data is an array of news
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
      setLoading(false)
    };
    fetchBlogs();
  }, []);

  // UseRef to store reference for inView
  const ref = useRef(null);
  const inView = useInView(ref, { triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      console.log("Section is in view!");
    }
  }, [inView]);

  return (
    <div ref={ref} className="bg-[#3992CE] py-16 px-6 md:my-20 md:px-20 blog-container-comp">
      {/* Title Section */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-center text-white mb-12"
      >
        Our Recent Blog & News
      </motion.h2>
      
      {/* Blog Grid */}
      {loading? (<FaSpinner className="animate-spin text-white text-[100px] flex justify-center items-center mx-auto my-10" />):
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {blogs.slice(0, blogsToShow).map((blog, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="relative group bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105"
                  >
                    {/* Blog Image */}
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
                    />

                    {/* Blog Content */}
                    <a href={`blog${blog._id}`}>
                      <div className="p-4 text-container-recent-blog">
                        <h3 className="text-xl font-semibold text-blue-900 group-hover:text-[#3992CE] transition-all duration-500 group-hover:underline">
                          {blog.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-2">Date: {blog.date}</p>
                        <p className="text-sm text-gray-600 mt-2">{blog.content}</p>
                    </div>
                    </a>
                  </motion.div>
                ))}
          </div>}

      {/* Read More Button */}
      <div className="mt-12 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <a href="/blog">
            <motion.button
              className="relative px-8 py-3 font-semibold text-lg rounded-md overflow-hidden bg-transparent border-2 border-blue-500 text-blue-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient" />
              <span className="relative z-10 text-white">See more blogs</span>
            </motion.button>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default RecentBlog;
