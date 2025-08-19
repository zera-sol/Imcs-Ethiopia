import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./blog.css";
import api from "../api";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  // Fetch news from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${api}/news`);
        setBlogs(response.data); // Assuming response.data is an array of news
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  // Handle Edit
  const handleEdit = (blog) => {
    navigate(`/edit-news/${blog._id}`, { state: { blog } });
  };

  // Handle Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (confirmDelete) {
      try {
        await axios.delete(`${api}/news/${id}`);
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };
  const createNews = () => {
   navigate("/add-news");
  }

  return (
    <div className="container md:m-[3px] mx-auto p-4 bg-[#3992CE]">
     {user && <button onClick={createNews} className="create-news">Creat News</button>}
      <h1 className="text-3xl font-bold mb-6 news-title">Latest News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              style={{ height: "450px" }}
            >
              <div className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  {user && (
                    <>
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                      >
                        <FaEdit className="h-5 w-5 text-gray-600" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                      >
                        <FaTrash className="h-5 w-5 text-gray-600" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="p-4 flex flex-col flex-grow overflow-y-auto custom-scrollbar">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-sm text-gray-500 mb-4">{blog.date}</p>
                <p className="text-gray-700">{blog.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white text-lg">No news available.</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
