import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import { Link, useLoaderData } from "react-router-dom";
import TouristCardSection from "./TouristCardSection";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ColorRing } from "react-loader-spinner";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Home = () => {
  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // Fetch data using useLoaderData
  const { isError, message, data } = useLoaderData() || {};

  // Effect to set loading to false when data is available
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  // Filter out duplicates based on unique _id
  const uniqueData = Array.from(
    new Map(data?.map((item) => [item._id, item])).values()
  );

  // Limit the data to a maximum of 6 items for the slider
  const limitedData = uniqueData.slice(0, 6);

  // Slider settings configuration
  const settings = {
    dots: true, // Show navigation dots
    infinite: limitedData.length > 4, // Enable infinite scroll if more than 4 items
    speed: 500, // Transition speed for sliding
    slidesToShow: Math.min(limitedData.length, 3), // Show up to 3 cards
    slidesToScroll: Math.min(limitedData.length, 3), // Scroll up to 3 cards at a time
    responsive: [
      {
        breakpoint: 1024, // Tablet size
        settings: {
          slidesToShow: Math.min(limitedData.length, 2), // Show up to 2 cards on tablet
          slidesToScroll: Math.min(limitedData.length, 2), // Scroll up to 2 cards
        },
      },
      {
        breakpoint: 768, // Mobile size
        settings: {
          slidesToShow: 1, // Show 1 card on mobile
          slidesToScroll: 1, // Scroll 1 card
        },
      },
      {
        breakpoint: 480, // Extra small devices
        settings: {
          slidesToShow: 1, // Show 1 card
          slidesToScroll: 1, // Scroll 1 card
          dots: false, // Hide dots on very small screens
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Banner />
      <div className="my-8">
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-6">
          Explore Tourist Places
        </h1>
        {isError && (
          <p className="text-red-600 text-center font-semibold p-4">
            {message} {/* Display error message if data fetching fails */}
          </p>
        )}
        {loading ? (
          // Show loading spinner while data is being fetched
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
          // Render slider when data is available
          <div className="bg-zinc-800">
            <div className="container mx-auto p-10">
              <Link
                to="/all-tourist-spots"
                className="text-blue-500 hover:underline flex items-center justify-end mb-4 mr-4">
                See more <FaArrowAltCircleRight className="ml-2" />
              </Link>
              <div className="flex justify-center">
                <Slider {...settings} className="w-full max-w-[80rem]">
                  {limitedData.length > 0 ? (
                    // Map through limited data and render TouristCardSection for each item
                    limitedData.map((cardData) => (
                      <TouristCardSection
                        key={cardData._id}
                        cardData={cardData}
                      />
                    ))
                  ) : (
                    // Message displayed if no cards are present
                    <p className="text-center font-semibold p-4">
                      No data available.
                    </p>
                  )}
                </Slider>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
