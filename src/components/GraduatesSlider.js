import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaUniversity, FaGraduationCap } from "react-icons/fa";
import axios from "axios";
import api from "../api";
// import "./GraduatesSlider.css";

const GraduatesSlider = () => {
  const [graduates, setGraduates] = useState([]);

  // Fetch graduates and shuffle randomly
  useEffect(() => {
    const fetchGraduates = async () => {
      try {
        const response = await axios.get(`${api}/graduates`);
        let grads = response.data;

        // Shuffle randomly
        grads = grads.sort(() => Math.random() - 0.5);

        setGraduates(grads);
      } catch (error) {
        console.error("Error fetching graduates:", error);
      }
    };

    fetchGraduates();
  }, []);

  // Slider settings (opposite direction of testimonies)
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 8000, // Slow and smooth
    cssEase: "linear",
    rtl: true, // ✅ Opposite direction
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="w-full p-6 bg-[#3992CE]">
      <h1 className="text-white text-2xl font-bold mb-4 text-center">
        Our Graduates
      </h1>
      <Slider {...settings}>
        {graduates.map((student) => (
          <div
            key={student._id}
            className="bg-white shadow-lg rounded-lg text-center border border-gray-200 p-4 mx-2"
          >
            <img
              src={student.image}
              alt={student.name}
              className="w-24 h-24 rounded-full mx-auto border-4 border-[#3992CE]"
            />
            <h3 className="text-lg font-bold mt-2">{student.name}</h3>
            <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <FaGraduationCap /> {student.year}
            </p>
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <FaUniversity /> {student.university}
            </p>
            <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <FaGraduationCap /> {student.department}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GraduatesSlider;
