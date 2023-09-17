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
    adaptiveHeight: true,

  };
  return (
    <div className="max-w-full mx-auto">

    <Slider {...settings}>
      {photos.map((image, index) => (
        <div key={index} className=" px-2 py-2 ">
            <img
              key={index}
              src={image}
              className="rounded-box opacity-100 w-full max-h-96 object-cover"
            />
        </div>
          ))}
    </Slider>
    </div>
  );
}