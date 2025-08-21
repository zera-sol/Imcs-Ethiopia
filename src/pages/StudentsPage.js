import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // for navigation
import api from "../api"; 
import universitiesList from "../data/universityList";

const StudentsPage = () => {
  const [students, setStudents] = useState([]); // all students data
  const [loading, setLoading] = useState(false); // loading state
  const [university, setUniversity] = useState(""); // selected university
  const [filteredUniversities, setFilteredUniversities] = useState([]); // dropdown search
  const [filteredStudents, setFilteredStudents] = useState([]); // displayed data
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  

  const navigate = useNavigate(); // navigate to add student page

  // Check if user is logged in when component mounts
    useEffect(() => {
      const user = localStorage.getItem("user"); // Assume user data is stored in localStorage
      if (user) {
        setIsLoggedIn(true);
        console.log(user)
      }
    }, []);
  // 🔹 Fetch all students when page loads
  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${api}/imcs-database/students`);
        setStudents(response.data);
        setFilteredStudents(response.data); // show all initially
      } catch (error) {
        console.error("Error fetching students:", error);
        alert("Failed to fetch students.");
      }
      setLoading(false);
    };
    fetchAllStudents();
  }, []);

  // 🔹 Live search universities
  const handleUniversitySearch = (e) => {
    const value = e.target.value;
    setUniversity(value);

    if (value === "") {
      setFilteredUniversities(universitiesList);
    } else {
      const filtered = universitiesList.filter((uni) =>
        uni.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUniversities(filtered);
    }
  };

  // 🔹 When user selects a university, filter students
  const handleSelectUniversity = (uni) => {
    setUniversity(uni);
    setFilteredUniversities([]);
    const filtered = students.filter((s) => s.university === uni);
    setFilteredStudents(filtered);
  };

  return (
    <div className="p-6">
      {/* Add Student Button */}
     {isLoggedIn && <button
        onClick={() => navigate("/database")}
        className="mb-4 bg-green-500 text-white p-2 rounded w-[1000px]"
      >
        + Add Student
      </button>}
      {/* Search University */}
      <div className="relative w-64">
        <input
          type="text"
          value={university}
          onChange={handleUniversitySearch}
          placeholder="Search University..."
          className="p-2 border w-full"
        />
        {filteredUniversities.length > 0 && (
          <ul className="absolute top-10 left-0 w-full bg-white border max-h-40 overflow-y-auto">
            {filteredUniversities.map((uni, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSelectUniversity(uni)}
              >
                {uni}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto mt-4">
        {loading ? (
          <FaSpinner className="animate-spin text-blue-500 text-4xl flex justify-center items-center m-5" />
        ) : (
          <table className="min-w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3 min-w-[50px]">#</th>
                <th className="border p-3 min-w-[200px]">Full-Name</th>
                <th className="border p-3 min-w-[200px]">University</th>
                <th className="border p-3 min-w-[200px]">Department</th>
                <th className="border p-3 min-w-[150px]">Graduation Year</th>
                <th className="border p-3 min-w-[100px]">Sex</th>
                <th className="border p-3 min-w-[180px]">Phone</th>
                <th className="border p-3 min-w-[180px]">Vicariate</th>
                <th className="border p-3 min-w-[250px]">Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-3">{index + 1}</td>
                  <td className="border p-3">{student.fullName}</td>
                  <td className="border p-3">{student.university}</td>
                  <td className="border p-3">{student.department}</td>
                  <td className="border p-3">{student.graduationYear}</td>
                  <td className="border p-3">{student.sex}</td>
                  <td className="border p-3">{student.phone}</td>
                  <td className="border p-3">{student.hagereSebket}</td>
                  <td className="border p-3">{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentsPage;
