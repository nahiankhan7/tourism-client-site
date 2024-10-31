import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import slide1 from "../../assets/images/slide-1.png";
import slide2 from "../../assets/images/slide-2.png";
import slide3 from "../../assets/images/slide-3.png";

import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const sliderRef = React.useRef(null);

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div className="relative w-full max-h-[600px] overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {[slide1, slide2, slide3].map((slide, index) => (
          <div key={index} className="relative w-full h-full">
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover bg-no-repeat bg-cover"
            />
          </div>
        ))}
      </Slider>
      <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2">
        <button
          onClick={handlePrev}
          className="bg-white/50 text-lg md:text-xl ml-4 duration-200 text-black p-4 rounded-full shadow-lg hover:bg-gray-200">
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="bg-white/50 text-lg md:text-xl mr-4 duration-200 text-black p-4 rounded-full shadow-lg hover:bg-gray-200">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Banner;
