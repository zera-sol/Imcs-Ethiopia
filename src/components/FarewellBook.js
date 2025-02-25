import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUniversity, FaGraduationCap, FaPhone, FaEdit, FaTrash, FaSpinner, FaUserGraduate} from "react-icons/fa";
import './FarewellBook.css';
import api from "../api";

const FarewellBook = () => {
  const [graduates, setGraduates] = useState([]); // Store graduates data
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // Holds ID of graduate to delete
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  // Fetch graduates from backend
  useEffect(() => {
    const fetchGraduates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${api}/graduates`);
        setGraduates(response.data); // Assuming API returns an array of graduates
      } catch (err) {
        console.error("Error fetching graduates:", err);
        setError("Failed to load graduates.");
      } finally {
        setLoading(false);
      }
    };
    fetchGraduates();
  }, []);

   // Handle Edit
   const handleEdit = (graduate) => {
    navigate(`/edit-graduate/${graduate._id}`, { state: { graduate } });
  };

  // Function to handle delete confirmation
  const handleDelete = async (id) => {
    try {
      setLoading(true)
      await axios.delete(`${api}/graduates/${id}`);
      setGraduates(graduates.filter((graduate) => graduate.id !== id)); // Remove from UI
      setDeleteConfirm(null);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting graduate:", error);
      alert("Failed to delete graduate.");
    }finally{
      setLoading(false)
    }
  };

  const filteredGraduates = graduates.filter(g => g.year === selectedYear);
  const groupedByUniversity = filteredGraduates.reduce((acc, graduate) => {
    acc[graduate.university] = acc[graduate.university] || [];
    acc[graduate.university].push(graduate);
    return acc;
  }, {});

  return (
    <div className="p-5 max-w-10xl mx-auto bg-[#3992CE]">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-50 gap-5">
          <button
              className="text-2xl font-bold text-center flex justify-center items-center gap-5 farewell-title px-2 py-2 text-white border-2 hover:border-white-700 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={() => navigate("/add-graduates")}
              >
              <FaUserGraduate /> Add Graduate
          </button>
          <div >
            <select
              className="border px-8 py-2 rounded-lg shadow-md farewell-select border-white text-10xl font-bold"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {[...new Set(graduates.map(g => g.year))].sort().map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
      </div>

      {loading && <p className="text-center text-white">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {selectedYear && <p className="farewell-title-p inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient gap-5"><FaGraduationCap className="text-1xl" /> Graduates of {selectedYear}</p>}
      
      {!loading && !error && Object.keys(groupedByUniversity).length > 0 ? 
        Object.entries(groupedByUniversity).map(([university, students]) => (
        <div key={university} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 farewell-title-h2 flex gap-5">
            <FaUniversity className="text-4xl" />{university}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {students.map(student => (
              <div 
                key={student._id} 
                className="shadow-lg rounded-lg overflow-hidden bg-blue-50 p-4 transition-all duration-300 transform group hover:bg-[#3992CE] hover:scale-105 relative"
              >
                {/* Edit & Delete Icons (Only for Admins) */}
                {user && (
                  <div className="absolute top-2 right-2 flex space-x-3">
                    <FaEdit 
                      className="text-green-500 text-xl cursor-pointer hover:text-green-700"
                      onClick={() => handleEdit(student)}
                    />
                    <FaTrash 
                      className="text-red-500 text-xl cursor-pointer hover:text-red-700"
                      onClick={() => setDeleteConfirm(student._id)}
                    />
                  </div>
                )}

                <img 
                  src={student.image} 
                  alt={student.name} 
                  className="w-full h-48 object-cover rounded-md transition-transform duration-300 group-hover:scale-80"
                />
                <h3 className="text-lg font-bold mt-3 transition-colors duration-300 group-hover:text-white">
                  {student.name}
                </h3>
                <p className="text-gray-600 flex gap-5 flex-center transition-colors duration-300 group-hover:text-white">
                  <FaGraduationCap className="text-2xl" />{student.department}
                </p>
                {student.phone && (
                  <p className="text-gray-500 text-sm flex gap-5 transition-colors duration-300 group-hover:text-white">
                    <FaPhone className="text-xl" />{student.phone}
                  </p>
                )}
                <p className="mt-2 italic text-gray-700 group-hover:text-white">
                  "{student.lastword}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )) :
        !loading && <div className="text-white">There are no graduates in {selectedYear}</div>
    }

    {/* Delete Confirmation Modal */}
    {deleteConfirm && (
      <div className="fixed inset-0 flex items-center justify-center bg-[#000000b3] bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          {!loading && <p className="text-xl font-bold mb-4">Are you sure you want to delete?</p>}
              {loading? (<FaSpinner className="animate-spin text-blue-500 text-4xl flex justfy-center items-centr" />) : 
              <div className="flex justify-center space-x-4">
                <button 
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                  onClick={() => handleDelete(deleteConfirm)}
                >
                  Yes
                </button>
                <button 
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                  onClick={() => setDeleteConfirm(null)}
                >
                  No
                </button>
              </div>}
        </div>
      </div>
    )}
  </div>
  );
};

export default FarewellBook;
