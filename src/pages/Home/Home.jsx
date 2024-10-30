import React from "react";
import Banner from "./Banner";
import { useLoaderData } from "react-router-dom";
import TouristCardSection from "./TouristCardSection";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default for desktop
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024, // Tablet size
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // Mobile size
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Extra small devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false, // Hide dots on very small screens
        },
      },
    ],
  };

  const { isError, message, data } = useLoaderData() || {};

  return (
    <div className="min-h-screen">
      <Banner />
      <div className="my-4">
        <h1 className="text-center font-bold text-3xl mb-6">
          Explore Tourist Places
        </h1>
        {isError && (
          <p className="text-red-600 text-center font-semibold p-4">
            {message}
          </p>
        )}
        {/* Slider card div */}
        <div className="bg-zinc-600 py-8 px-10 flex justify-center">
          <Slider {...settings} className="w-full max-w-[100rem]">
            {data?.length > 0 ? (
              data.map((cardData) => (
                <TouristCardSection key={cardData._id} cardData={cardData} />
              ))
            ) : (
              <p className="text-center font-semibold p-4">
                No data available.
              </p>
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Home;
