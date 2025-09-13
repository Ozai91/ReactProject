import React, { useState, useEffect, useRef } from 'react';
import ip17pm from '../images/ip17pmSD.png';
import ipad from '../images/IpadSD.png';
import macbook from '../images/MacM4SD.png';
import iwatch from '../images/IwatchUltraSD.png';

const Slideshow = () => {
  const slides = [ip17pm, ipad, macbook , iwatch];
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const startX = useRef(null);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  // Mouse/touch drag handlers
  const handleMouseDown = (e) => {
    startX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    if (startX.current === null) return;
    const diff = e.clientX - startX.current;
    if (diff > 50) prevSlide();
    else if (diff < -50) nextSlide();
    startX.current = null;
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (startX.current === null) return;
    const diff = e.changedTouches[0].clientX - startX.current;
    if (diff > 50) prevSlide();
    else if (diff < -50) nextSlide();
    startX.current = null;
  };

  return (
    <div
      className="relative w-full"
      data-carousel="slide"
      ref={slideRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ userSelect: 'none' }}
    >
      <div className="relative w-full h-[40vw] max-h-[500px] min-h-[200px] overflow-hidden rounded-lg flex items-center justify-center bg-black">
        <div
          className="flex w-full h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            width: `${slides.length * 100}%`,
          }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 flex items-center justify-center">
              <img
                src={slide}
                className="block w-full h-full"
                alt={`Slide ${index + 1}`}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-gray-400'
            }`}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 focus:ring-4 focus:ring-white group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 focus:ring-4 focus:ring-white group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Slideshow;