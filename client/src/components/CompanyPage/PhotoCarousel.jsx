import { useState } from 'react';
export default function PhotoCarousal() {

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

const nextSlide = () => {
  setCurrentSlide((prev) => (prev + 1) % images.length);
};

const prevSlide = () => {
  setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
};

const displayedImages = [
  images[currentSlide % images.length],
  images[(currentSlide + 1) % images.length],
  images[(currentSlide + 2) % images.length],
  images[(currentSlide + 3) % images.length],
];

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
        <div className="relative w-70% mx-4 overflow-hidden">
          <div className="flex transition-all ease-in-out duration-300 transform rounded-box max-w-xl px-6 py-2 space-x-2 bg-neutral ">
            {displayedImages.map((image, index) => (
              <img
                key={index}
                src={image}
                className="rounded-box w-[25%] opacity-100 -translate-x-3"
              />
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
        <div className="carousel carousel-center max-w-2/4 p-4 space-x-4 bg-neutral rounded-box">
          {images.map((imageSrc, index) => (
            <div key={index} className="carousel-item">
              <img src={imageSrc} className="rounded-box" alt={`Slide ${index}`} />
            </div>
          ))}
        </div>
    </div>
  );
}
