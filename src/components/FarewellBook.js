import { useState } from "react";
import { graduates } from "../data/graduates";
import { FaUniversity } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import './FarewellBook.css'

const FarewellBook = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const filteredGraduates = graduates.filter(g => g.year === selectedYear);
  const groupedByUniversity = filteredGraduates.reduce((acc, graduate) => {
    acc[graduate.university] = acc[graduate.university] || [];
    acc[graduate.university].push(graduate);
    return acc;
  }, {});

  return (
    <div className="p-5 max-w-10xl mx-auto bg-[#3992CE]">
      <h1 className="text-4xl font-bold text-center farewell-title">Farewell Book</h1>
      <div className="flex justify-center">
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
      {Object.entries(groupedByUniversity).map(([university, students]) => (
        <div key={university} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 farewell-title-h2 flex gap-5">
            <FaUniversity className="text-4xl" />{university}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {students.map(student => (
              <div 
              key={student.id} 
              className="shadow-lg rounded-lg overflow-hidden bg-blue-50 p-4 transition-all duration-300 transform group hover:bg-[#3992CE] hover:scale-105"
            >
              <img 
                src={student.image} 
                alt={student.name} 
                className="w-full h-48 object-cover rounded-md transition-transform duration-300 group-hover:scale-110"
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
      ))}
    </div>
  );
};

export default FarewellBook;
