import React, { useEffect } from "react";
import "./testimonySection.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import testimonies from "../data/testimonies";

const TestimonySection = () => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 10000,           // Slow continuous motion
    cssEase: "linear",
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

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
  }, []);

  return (
    <div className="w-full p-6 bg-[#3992CE]">   {/* ✅ Same as GraduatesSlider */}
      <h1 className="text-center text-white text-2xl font-bold mb-4">
        Testimonies of Students
      </h1>

      <Slider {...settings}>
        {testimonies.map((person) => (
          <div
            key={person.id}
            className="bg-white shadow-lg rounded-lg text-center border border-gray-200 p-4 mx-2" 
            /* ✅ same padding & margin as GraduatesSlider */
          >
            <img
              src={person.image}
              alt={person.name}
              className="w-24 h-24 rounded-full mx-auto border-4 border-[#3992CE]"
            />
            <h3 className="text-lg font-bold mt-2">{person.name}</h3>
            <p className="text-sm text-gray-500">{person.university}</p>
            <p className="mt-2 text-gray-700 italic">"{person.text}"</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonySection;
