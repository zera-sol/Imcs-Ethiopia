import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom"; // for getting idfrom URL
import axios from "axios";
import api from "../api";
import { FaSpinner } from "react-icons/fa";

const BlogDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // get blogidfrom /blog/:_id
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role === "admin") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
  }, []);

  // Fetch blog by _ID
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${api}/news/${id}`);
        console.log("zera -> ", response)
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
      setLoading(false);
    };

    fetchBlog();
  }, [ id]);

  if (loading) {
    return (
      <div className="bg-[#3992CE] py-16 px-6 md:px-20 text-center">
        <FaSpinner className="animate-spin text-white text-[100px] mx-auto" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="bg-[#3992CE] py-16 px-6 md:px-20 text-center text-white">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="bg-[#3992CE] py-16 px-6 md:px-20 min-h-screen">
      {/* Blog Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-h_idden">
        {/* Blog Image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-72 object-cover"
        />
        {/* Blog Content */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">
            {blog.title}
          </h1>
          <p className="text-sm text-gray-500 mb-4">Date: {blog.date}</p>
          <p className="text-gray-700 text-lg leading-relaxed">{blog.content}</p>
          {/* Show Edit button only if admin */}
            {isAdmin && (
                    <div className="mt-6">
                    <button
                        onClick={() => navigate(`/edit-news/${id}`, {state : { blog }})}
                        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all"
                    > 
                        Edit Blog
                    </button>
                    </div>
                )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
