import React, { useState } from 'react';
import React from 'react'
import ip17pm from '../images/ip17pmSD.png';
import ipad from '../images/IpadSD.png';
import macbook from '../images/MacM4SD.png';

const Slideshow = () => {
  const slides = [
    `${ip17pm}`,
    `${ipad}`,
    `${macbook}`,
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="relative w-full max-w-4xl">
        <img src={slides[currentSlide]} alt="slide" className="w-full h-96 object-cover" />
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Slideshow;