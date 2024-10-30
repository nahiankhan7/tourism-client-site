import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import SpotCard from "./SpotCard";
import { ColorRing } from "react-loader-spinner";

const MyList = () => {
  const { isError, message, data } = useLoaderData();
  const [loading, setLoading] = useState(true);
  const [spotCard, setSpotCard] = useState(data || []);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col">
      <div className="text-center my-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          My List Data Collection:{" "}
          <span className="text-blue-600">{data.length}</span>
        </h2>
        {isError && <p className="text-red-600 mt-2">{message}</p>}
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-8">
          {data.map((touristSpot) => (
            <SpotCard
              key={touristSpot._id}
              touristSpot={touristSpot}
              spotCard={spotCard}
              setSpotCard={setSpotCard}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-4">
          No tourist spots added yet.
        </p>
      )}
    </div>
  );
};

export default MyList;
