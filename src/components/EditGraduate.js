import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCamera, FaSpinner } from "react-icons/fa";
import api from "../api"

const EditGraduate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { graduate } = location.state || {};

  const [name, setName] = useState(graduate?.name || "");
  const [university, setUniversity] = useState(graduate?.university || "");
  const [department, setDepartment] = useState(graduate?.department || "");
  const [year, setYear] = useState(graduate?.year || "");
  const [phone, setPhone] = useState(graduate?.phone || "");
  const [lastword, setLastWord] = useState(graduate?.lastword || "");
  const [image, setImage] = useState(graduate?.image || "");
  const [newImage, setNewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("university", university);
    formData.append("department", department);
    formData.append("year", year);
    formData.append("phone", phone);
    formData.append("lastword", lastword);

    if (newImage) {
      formData.append("image", newImage);
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${api}/graduates/${graduate._id}`, {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      alert("Graduate information updated successfully!");
      navigate("/farewell-book");
    } catch (error) {
      console.error("Error updating graduate information:", error);
      alert("Failed to update graduate information.");
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-[#3992CE]">
      <h1 className="text-3xl font-bold mb-4 mt-4 text-center text-white">Edit Graduate</h1>
      <div className="bg-blue-50 rounded-lg shadow-md p-6 mx-auto max-w-lg">
        {/* Image Preview Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Current Image</label>
          <div className="relative flex justify-center">
            <img
              src={image}
              alt="Graduate Image"
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
        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        {/* University Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">University</label>
          <input
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        {/* Department Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <input
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        {/* Year Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        {/* Phone Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        {/* Last Words Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Last Words</label>
          <textarea
            value={lastword}
            onChange={(e) => setLastWord(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="3"
          />
        </div>
        {/* Save Button */}
        <div className="text-center">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {isLoading ? (<FaSpinner className="animate-spin text-white-500 text-4xl w-1/2 mx-auto"/>)  : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGraduate;
