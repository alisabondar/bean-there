import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function SimpleSlider( {photos} ) {
  console.log(photos)
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    accessibility: true

  };
  return (
    <div className="min-w-full mx-auto bg-neutral rounded-box border-accent border-4">
      <Slider {...settings}>
        {photos.map((image, index) => (
          <div key={index} className="px-2 py-2 h-full flex items-center justify-center">
            <img
              src={image}
              className="rounded-box opacity-100 w-full h-[20rem] object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>

  );
}