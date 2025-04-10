import React, { useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaSpinner } from "react-icons/fa";
import api from "../api"
import universitiesList from "../data/universityList";

const DatabasePage = () => {
  const [university, setUniversity] = useState(""); // Selected university
  const [filteredUniversities, setFilteredUniversities] = useState([]); // Filtered list for dropdown
  const [data, setData] = useState([]); // Table data
  const [editingRow, setEditingRow] = useState(null); // Track editing\
  const [loading, setLoading] = useState(false);

  // Live search for university selection
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

  // Select a university from the dropdown
  const handleSelectUniversity = (uni) => {
    setUniversity(uni);
    setFilteredUniversities([]);
    fetchUniversityData(uni);
  };

  // Fetch data from Google Sheets when university is selected
  const fetchUniversityData = async (selectedUniversity) => {
    try {
      setLoading(true)
      const response = await axios.get(`${api}/imcs-database/getUniversityData?university=${selectedUniversity}`);
      setData(response.data); // Load existing students
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false)
      alert("Failed to fetch university data.");
    }
    setLoading(false)
  };

  // Add a new row
  const handleAddRow = () => {
    if (!university) {
      alert("Please select a university first.");
      return;
    }
    setData([
      ...data,
      { fullName: "", university, department: "", graduationYear: "", sex: "", phone: "",hagereSebket: "", email: ""},
    ]);
  };

  // Delete a row
  const handleDeleteRow = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  // Edit a cell
  const handleInputChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  // Paste data from Excel
  const handlePaste = (event) => {
    const clipboardData = event.clipboardData.getData("text");
    const rows = clipboardData.split("\n").map((row) => row.split("\t"));

    const formattedData = rows
      .filter((row) => row.length > 1)
      .map((row) => ({
        fullName: row[0] || "",
        university,
        department: row[2] || "",          
        graduationYear: row[3] || "",  
        sex: row[4] || "",    
        phone: row[5] || "",
        hagereSebket: row[6] || "",
        email: row[7] || "",
      }));

    setData([...data, ...formattedData]);
  };

  // Save data to Google Sheets
  const handleSave = async () => {
    const phoneNumbers = data.map((d) => d.phone);
    setLoading(true)
    if (new Set(phoneNumbers).size !== phoneNumbers.length) {
      alert("Duplicate phone numbers found!");
      return;
    }
    console.log({"Sent data": data})
    try {
      await axios.post(`${api}/imcs-database`, { datafromUi: data });
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data.");
    }
    setLoading(false)
  };

  return (
    <div className="p-6">
      {/* Live Search for University */}
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

     {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3 min-w-[50px]">#</th>
                <th className="border p-3 min-w-[100px]">Actions</th>
                <th className="border p-3 min-w-[200px]">Full-Name</th>
                <th className="border p-3 min-w-[150px]">Institution</th>
                <th className="border p-3 min-w-[200px]">Department/field</th>
                <th className="border p-3 min-w-[180px]">Year-of-Graduation</th>
                <th className="border p-3 min-w-[100px]">Sex</th>
                <th className="border p-3 min-w-[180px]">Phone-number</th>
                <th className="border p-3 min-w-[180px]">Vicariate</th>
                <th className="border p-3 min-w-[250px]">Email</th>
              </tr>
            </thead>
            <tbody onPaste={handlePaste}>
              {data.map((row, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-3 min-w-[50px]">{index + 1}</td> {/* Row Number */}
                  <td className="p-3 border-t flex gap-2 justify-center min-w-[30px]">
                    {editingRow === index ? (
                      <button onClick={() => setEditingRow(null)} className="text-green-500">✅</button>
                    ) : (
                      <FaEdit className="text-blue-500 cursor-pointer" onClick={() => setEditingRow(index)} />
                    )}
                    <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDeleteRow(index)} />
                  </td>
                  {Object.keys(row).map((field, i) => (
                    field !== "university" ? (
                      <td key={i} className="border p-3 min-w-[150px]">
                        {editingRow === index ? (
                          <input
                            type="text"
                            value={row[field]}
                            onChange={(e) => handleInputChange(index, field, e.target.value)}
                            className="w-full p-1"
                          />
                        ) : (
                          row[field]
                        )}
                      </td>
                    ) : (
                      <td key={i} className="border p-3 min-w-[200px]">{university}</td> 
                    )
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      {/* Add Row Button */}
      <button onClick={handleAddRow} className="mt-4 bg-blue-500 text-white p-2 rounded">
        + Add Row
      </button>

      {/* Save Button */}
      {loading?<FaSpinner className="animate-spin text-blue-500 text-4xl flex justfy-center items-centr m-5" /> :
          <button onClick={handleSave} className="mt-4  bg-green-500 text-white p-2 rounded block">
                Save to Google Sheets
          </button>
       }
    </div>
  );
};

export default DatabasePage;
