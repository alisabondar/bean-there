import { useState } from 'react';

export default function PhotoCarousel() {
  const images = [
    '/assets/coffee-mock-1.jpeg',
    '/assets/coffee-mock-2.jpeg',
    '/assets/coffee-mock-3.jpeg',
    '/assets/coffee-mock-4.jpeg',
    '/assets/coffee-mock-5.jpeg',
    '/assets/coffee-mock-6.jpeg',
    '/assets/coffee-mock-7.jpeg',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const nextSlide = () => {
    if (currentSlide < images.length - 3) {
      setCurrentSlide(currentSlide + 1);
      setTranslateX(translateX - 300);
    } else {
      setCurrentSlide(0);
      setTranslateX(0);
    }
  };


  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(images.length - 3);
      setTranslateX(-(images.length - 3) * 300 );
    } else {
      setCurrentSlide(currentSlide - 1);
      setTranslateX(translateX + 300);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex items-center w-full justify-center">
        {/* Previous Button */}
        <div className="flex items-center pl-4 z-10">
          <button onClick={prevSlide} className="btn btn-circle">
            ❮
          </button>
        </div>
        {/* Carousel */}
        <div className="max-w-full overflow-hidden flex">
          <div className="flex flex-row" style={{ transform: `translateX(${translateX}px)`, transition: 'transform 0.5s ease-in-out' }}>
            {images.map((image, index) => (
              <div style={{ width: '300px', height: '300px', overflow: 'hidden' }} key={index}>
                <img
                  src={image}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  className="rounded-box opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Next Button */}
        <div className="flex items-center pr-4 z-10">
          <button onClick={nextSlide} className="btn btn-circle">
            ❯
          </button>
        </div>
      </div>
    </div>
  );
}






