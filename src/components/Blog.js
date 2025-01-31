// src/Blog.js
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./blog.css";

const blogsData = [
  {
    id: 1,
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    title: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    date: "October 10, 2023",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 2,
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    title: "Blog Title 2",
    date: "October 11, 2023",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 3,
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    title: "Blog Title 3",
    date: "October 12, 2023",
    content:
      "This is another blog post with additional content to demonstrate the scroll functionality in the card. The card height is fixed, and the content will scroll if it exceeds the available space.",
  },
  {
    id: 4,
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    title: "Blog Title 4",
    date: "October 13, 2023",
    content:
      "This blog post contains even more content to test the scrollable area within the card. The design ensures that the layout remains consistent across different screen sizes.",
  },
];

const Blog = () => {
  const [blogs, setBlogs] = useState(blogsData);
  const navigate = useNavigate();
  const session = false;

  const handleEdit = (blog) => {
    navigate("/edit", { state: { blog } }); // Navigate to the edit page with blog data
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (confirmDelete) {
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4 bg-[#3992CE]">
      <h1 className="text-3xl font-bold mb-6 news-title">Latest News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
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
                {/* edit button */}
                { session &&
                    <button
                    onClick={() => handleEdit(blog)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                    >
                    <FaEdit className="h-5 w-5 text-gray-600" />
                    </button>}
                {/* Delete Icon */}
                    { session &&
                    <button
                    onClick={() => handleDelete(blog.id)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                    >
                    <FaTrash className="h-5 w-5 text-gray-600" />
                    </button>}
              </div>
            </div>
            <div className="p-4 flex flex-col flex-grow overflow-y-auto custom-scrollbar">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{blog.date}</p>
              <p className="text-gray-700">{blog.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;