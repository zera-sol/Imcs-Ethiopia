import React, { useEffect } from "react";
import "./testimonySection.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import testimonies from "../data/testimonies";

const TestimonySection = () => {
  var settings = {
    dots: false,              // ❌ remove dots
    arrows: false,            // ❌ remove arrows
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,         // ✅ no pause between slides
    speed: 10000,              // ✅ very slow transition
    cssEase: "linear",        // ✅ smooth continuous motion
    pauseOnHover: false,      // ✅ keep sliding even on hover
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
  }, []);

  return (
    <div className="w-full p-6 testimony-container">
      <h1>Testimonies of Students</h1>
      {/* Testimony Section */}
      <div className="px-5">
        <Slider {...settings}>
          {testimonies.map((person) => (
            <div
              key={person.id}
              className="bg-white shadow-lg rounded-lg text-center border border-gray-200 p-4"
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
    </div>
  );
};

export default TestimonySection;
