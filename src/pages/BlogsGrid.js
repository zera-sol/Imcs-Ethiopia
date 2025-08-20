import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import api from "../api";
import { FaSpinner, FaPlus } from "react-icons/fa";
import '../components/blog.css'

const BlogsGrid = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const blogsPerPage = 30;

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${api}/news`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

  const createNews = () => {
    navigate("/add-news");
   }

  return (
    <div className="bg-[#3992CE] py-5 px-3 ">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-center text-white mb-12"
      >
        All Blogs & News
      </motion.h2>
         {user && <button onClick={createNews} className="create-news">
                             <FaPlus /> Creat News</button>}
      {/* Blog Grid */}
      {loading ? (
        <FaSpinner className="animate-spin text-white text-[100px] flex justify-center items-center mx-auto my-10" />
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {currentBlogs.map((blog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="relative group bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105"
            >
              {/* Blog Image */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
              />

              {/* Blog Content */}
              <a href={`blog/${blog._id}`}>
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
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center items-center gap-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white text-blue-500 font-bold rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-white font-semibold text-lg">
            {currentPage}/{totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white text-blue-500 font-bold rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogsGrid;
