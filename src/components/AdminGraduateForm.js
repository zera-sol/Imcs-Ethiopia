import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import "./adminGraduateForm.css"
import api from "../api"

const AdminGraduateForm = () => {
  const navigate = useNavigate();
  const [year, setYear] = useState(""); // Keeps the same year for all universities
  const [universities, setUniversities] = useState([]); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [loading, setLoading] = useState(false);

  // Check if user is logged in when component mounts
  useEffect(() => {
    const user = localStorage.getItem("user"); // Assume user data is stored in localStorage
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) {
    navigate("/"); // Redirect non-admin users
    return null;
  }

  const handleAddUniversity = () => {
    setUniversities([...universities, { university: "", students: [] }]);
  };

  const handleUniversityChange = (index, value) => {
    const updatedUniversities = [...universities];
    updatedUniversities[index].university = value;
    setUniversities(updatedUniversities);
  };

  const handleAddStudent = (uniIndex) => {
    const updatedUniversities = [...universities];
    updatedUniversities[uniIndex].students.push({
      name: "",
      department: "",
      phone: "",
      lastword: "",
      image: "",
    });
    setUniversities(updatedUniversities);
  };

  const handleStudentChange = (uniIndex, stuIndex, field, value) => {
    const updatedUniversities = [...universities];
    updatedUniversities[uniIndex].students[stuIndex][field] = value;
    setUniversities(updatedUniversities);
  }

  const handleSubmit = async () => {
    const studentsArray = universities.flatMap((uni) =>
      uni.students.map((student) => ({
        ...student,
        university: uni.university,
        year: year,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeCEI3KrEBo7UfpS_ulmOvcGNxta2ErpP02NXq6MoG5iRDcm9mf6CycIE7osCB06ANdcU&usqp=CAU"
      }))
    );

    try {
      setLoading(true)
      const response = await fetch(`${api}/graduates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ graduates: studentsArray }),
      });
      const resData = await response.json();
      if (!response.ok) throw new Error(resData.message);

      alert("Graduates added successfully!");
      navigate("/farewell-book");
    } catch (error) {
      console.error(error);
      alert(error);
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded adminGraduate-container">
      <h2 className="text-2xl font-bold mb-4">Add Graduate Students</h2>

      <div className="mb-4">
        <label className="block font-medium">Graduation Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-35 p-2 border-[#3992CE] rounded mx-5"
          placeholder="Enter Year"
        />
      </div>

      {universities.map((uni, uniIndex) => (
        <div key={uniIndex} className="mb-6 university p-4 rounded">
          <input
            type="text"
            value={uni.university}
            onChange={(e) => handleUniversityChange(uniIndex, e.target.value)}
            className="p-2 rounded graduate-input-university "
            placeholder="Enter University Name"
          />

          {uni.students.map((student, stuIndex) => (
            <div key={stuIndex} className="mt-4 university mx-20 p-2 rounded">
                <div className="cridential-field">
                    <input
                        type="text"
                        value={student.name}
                        onChange={(e) =>
                        handleStudentChange(uniIndex, stuIndex, "name", e.target.value)
                        }
                        className="w-full p-2  rounded"
                        placeholder="Student Name"
                    />
                    <input
                        type="text"
                        value={student.department}
                        onChange={(e) =>
                        handleStudentChange(uniIndex, stuIndex, "department", e.target.value)
                        }
                        className="w-full p-2 rounded mt-2"
                        placeholder="Department"
                    />
                </div>
                <div className="cridential-field">
                    <input
                        type="text"
                        value={student.phone}
                        onChange={(e) =>
                        handleStudentChange(uniIndex, stuIndex, "phone", e.target.value)
                        }
                        className="w-full p-2 rounded mt-2"
                        placeholder="Phone Number"
                    />
                    <textarea
                        value={student.lastword}
                        onChange={(e) =>
                        handleStudentChange(uniIndex, stuIndex, "lastword", e.target.value)
                        }
                        className="w-full p-2 rounded mt-2"
                        placeholder="Last Words"
                    ></textarea>
              </div>
            </div>
          ))}

          {/* Move the "Add Student" button below all student inputs */}
          <button
            onClick={() => handleAddStudent(uniIndex)}
            className="mt-4 p-2 bg-green-600 text-white rounded block w-40%"
          >
            + Add Student
          </button>
        </div>
      ))}

      <button
        onClick={handleAddUniversity}
        className="mt-4 p-2 bg-blue-600 text-white rounded w-40%"
      >
        + Add University
      </button>

     {loading ? (<FaSpinner className="animate-spin text-blue-500 text-4xl flex justfy-center items-centr m-5" />):
        <button
          onClick={handleSubmit}
          className="mt-4 p-2 bg-green-600 text-white rounded w-full block"
        >
          Submit All Graduates
        </button>}
    </div>
  );
};

export default AdminGraduateForm;
