import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function SimpleSlider( {photos} ) {
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
    <div className="min-w-full mx-auto">
      <Slider {...settings}>
        {photos.map((image, index) => (
          <div key={index} className="px-1 py-2 h-full flex items-center justify-center">
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