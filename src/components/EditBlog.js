import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa"; // Importing the camera icon
import "./editBlog.css";
import api from "../api"

const EditBlog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { blog } = location.state || {};
  const user = localStorage.getItem("user");
  const [title, setTitle] = useState(blog?.title || "");
  const [content, setContent] = useState(blog?.content || "");
  const [image, setImage] = useState(blog?.image || "");
  const [newImage, setNewImage] = useState(null); // For the new image preview
  const [isLoading, setIsLoading] = useState(false);


  // Function to handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file); // Store actual file for backend
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Show preview before upload
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
  
    // Format the date in "Jun-17-2002" format
    const formattedDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).replace(",", "-"); // Remove the comma
    formData.append("date", formattedDate);
  
    // Append the actual image file (not just preview)
    if (newImage) {
      formData.append("image", newImage); // Correctly add image to FormData
    }
  
    try {
      setIsLoading(true);
      const response = await fetch(`${api}/news/${blog._id}`, {
        method: "PUT",
        body: formData,
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }
  
      alert("News updated successfully!");
      navigate("/news");
    } catch (error) {
      console.error("Error updating a News:", error);
      alert("Failed to update a News.");
    }
    setIsLoading(false);
  };
  
  

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-[#3992CE]">
      {user ? (
        <>
            <h1 className="text-3xl font-bold mb-4 mt-4 text-center  text-white">Edit a News</h1>
            <div className="bg-blue-50 rounded-lg shadow-md p-6 mx-auto max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
              {/* Image Preview Section */}
              {/* Image Preview Section */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Current Image</label>
                <div className="relative flex justify-center">
                  <img
                    src={image} // Shows either the existing or new preview
                    alt="Blog Image"
                    className="w-full sm:w-3/4 md:w-1/2 h-48 object-cover rounded-md"
                  />
                  <div className="absolute top-0 right-0 p-2 cursor-pointer">
                    <label htmlFor="image-upload" className="text-black rounded-full p-2">
                      <FaCamera size={20} />
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
              {/* Title Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="2"
                />
              </div>

              {/* Content Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="4"
                />
              </div>

              {/* Save Button */}
              <div className="text-center">
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  {isLoading ? "Loading..." : "Save Changes"}
                </button>
              </div>
            </div>
          </>
          ) : (
            <div className="text-center mt-10 text-red-600 text-2xl font-bold">
              You are not authorized to edit this news.
            </div>
          )}
    </div>
  );
};

export default EditBlog;
