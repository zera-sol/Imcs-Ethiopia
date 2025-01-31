// src/EditBlog.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./editBlog.css"

const EditBlog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { blog } = location.state || {};

  const [title, setTitle] = useState(blog?.title || "");
  const [content, setContent] = useState(blog?.content || "");
  const [image, setImage] = useState(blog?.image || "");

  const handleSave = () => {
    // Save logic here (e.g., update the blog in the state or send to an API)
    alert("Blog updated successfully!");
    navigate("/blog"); // Navigate back to the blog page
  };

  return (
    <div className="container mx-auto p-4 edit-container">
      <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>
      <div className="bg-blue-50 rounded-lg shadow-md p-6 mx-40">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="5"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditBlog;