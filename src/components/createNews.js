import React, { useState, useEffect } from "react";
import { FaHeading, FaFileImage, FaCalendarAlt, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api";

const AddNews = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // For image preview
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in when component mounts
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle image selection and set preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file)); // Generate preview URL
    } else {
      setPreview(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !content || !date || !image) {
      setMessage("All fields are required!");
      return;
    }
  
    setLoading(true);
    setMessage("");
    setError(false);
  
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("date", date);
      formData.append("image", image);
  
      const response = await axios.post(`${api}/news`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setMessage(response.data.message);
      setTitle("");
      setContent("");
      setDate("");
      setImage(null);
      setPreview(null); // Clear preview after submission
    } catch (error) {
      setError(true);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // Show backend error message
      } else {
        alert("Error adding news. Try again."); // Fallback error message
      }
    }
  
    setLoading(false);
    if (!error) {
      navigate("/news");
      window.location.reload();
    }
    setError(false);
  };
  

  if (!isLoggedIn) {
    return (
      <p className="text-center text-red-500 text-lg mt-4">
        You must be logged in to add news.
      </p>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-[#3992CE] shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-white mb-4">Add News</h2>

      {message && <p className="text-center text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Field */}
        <div className="flex items-center border border-gray-300 p-2 rounded-md bg-white">
          <FaHeading className="text-gray-600 mr-2" />
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full outline-none bg-transparent"
          />
        </div>

        {/* Content Field */}
        <div className="flex items-center border border-gray-300 p-2 rounded-md bg-white">
          <FaPen className="text-gray-600 mr-2" />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full outline-none h-24 bg-transparent"
          />
        </div>

        {/* Date Field */}
        <div className="flex items-center border border-gray-300 p-2 rounded-md bg-white">
          <FaCalendarAlt className="text-gray-600 mr-2" />
          <input
            type="text"
            placeholder="Date (e.g. June-10-2002)"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full outline-none bg-transparent"
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col items-center border border-gray-300 p-2 rounded-md bg-white">
          <div className="flex items-center w-full">
            <FaFileImage className="text-gray-600 mr-2" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full outline-none bg-transparent"
            />
          </div>
          {/* Image Preview */}
          {preview && (
            <div className="mt-2">
              <img
                src={preview}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-md border border-gray-300"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add News"}
        </button>
      </form>
    </div>
  );
};

export default AddNews;
