import React, { useState, useEffect } from "react";
import "./testimonySection.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import  testimonies from "../data/testimonies"

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block"}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block"}}
      onClick={onClick}
    />
  );
}
const TestimonySecion = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true, // ✅ Enable autoplay
    autoplaySpeed:4000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          dots:false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
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
                <div key={person.id} className="bg-white shadow-lg  rounded-lg text-center border border-gray-200">
                  <img src={person.image} alt={person.name} className="w-24 h-24 rounded-full mx-auto border-4 border-[#3992CE]" />
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

export default TestimonySecion;
