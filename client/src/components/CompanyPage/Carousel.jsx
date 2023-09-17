import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function SimpleSlider( {photos} ) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    variableWidth: true
  };
  return (
    <Slider {...settings}>
      {photos.map((image, index) => (
              <div key={index} className="">
                <div className="">
                  <img
                    src={image}
                    className="rounded-box opacity-100 w-64 h-64 object-cover"
                  />
                </div>

              </div>
            ))}
    </Slider>
  );
}