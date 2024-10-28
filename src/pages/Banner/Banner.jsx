import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import slide1 from "../../assets/images/slider01.jpg";
import slide2 from "../../assets/images/slider02.jpg";
import slide3 from "../../assets/images/slider03.jpg";
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
    <div className="relative w-full max-h-[300px] md:max-h-[400px] overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {[slide1, slide2, slide3].map((slide, index) => (
          <div key={index} className="relative w-full h-full">
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white bg-black/50 p-4 rounded max-w-md">
                <h2 className="text-lg md:text-xl">Slide {index + 1} Title</h2>
                <p className="text-sm md:text-base">
                  Description for Slide {index + 1}
                </p>
              </div>
            </div>
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
s;
