import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function SimpleSlider( {photos} ) {

  if (!photos || photos.length === 0) {
    return <div>No Photos Available</div>;
  }

  function NewNext(props) {
    const { onClick } = props;
    return (
      <div
        className="btn flex justify-center items-center shadow-lg"
        style={{ fontSize: '24px', background: '#f2eada', width: '2rem', height: '5rem', position: "absolute", zIndex: 1, top: '45%', right: '9px'}}
        onClick={onClick}

      >
        ❯
      </div>
    );
}

function NewPrev(props) {
    const { onClick } = props;
    return (
      <div
        className="btn  flex justify-center items-center shadow-lg"
        style={{ fontSize: '24px', background: '#f2eada', width: '2rem', height: '5rem', position: "absolute", zIndex: 1, top: '45%', left: '10px'}}
        onClick={onClick}
      >
        ❮
      </div>
    );
}



  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    accessibility: true,
    nextArrow: <NewNext/>,
    prevArrow: <NewPrev/>

  };

   const imageURLs = photos.map(photo =>
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${import.meta.env.VITE_GOOGLEAPI_KEY}`
  );



  return (
    <div className="min-w-full mx-auto ">
      <Slider {...settings} className="relative">
        {imageURLs.map((image, index) => (
          <div key={index} className="px-2 py-4 h-full flex items-center justify-center">
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