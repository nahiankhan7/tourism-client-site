import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import { useLoaderData } from "react-router-dom";
import TouristCardSection from "./TouristCardSection";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ColorRing } from "react-loader-spinner";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { isError, message, data } = useLoaderData() || {};

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

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
        {/* Show spinner if loading */}
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        ) : (
          // Slider card div
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
        )}
      </div>
    </div>
  );
};

export default Home;
