import React from "react";
import Banner from "./Banner";
import { useLoaderData } from "react-router-dom";
import TouristCardSection from "./TouristCardSection";

const Home = () => {
  const { isError, message, data } = useLoaderData() || {};

  console.log(data);

  return (
    <div className="min-h-screen">
      <Banner />
      <div className="my-4">
        <h1 className="text-center font-bold text-3xl mb-6">
          Explore Tourist Place
        </h1>
        {isError && (
          <p className="text-red-600 text-center font-semibold p-4">
            {message}
          </p>
        )}
        <div className="flex justify-between bg-gray-300 p-4">
          {data?.length > 0 ? (
            data.map((cardData) => (
              <TouristCardSection key={cardData._id} cardData={cardData} />
            ))
          ) : (
            <p className="text-center font-semibold p-4">No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
