import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import AllSpotCard from "./AllSpotCard";
import { ColorRing } from "react-loader-spinner";

const AllTouristSpots = () => {
  const { isError, message, data } = useLoaderData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col">
      <div className="text-center my-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          All Data Collection:{" "}
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
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-8">
          {data.map((allSpot) => (
            <AllSpotCard key={allSpot._id} allSpot={allSpot} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-4">
          Tourist spots not available.
        </p>
      )}
    </div>
  );
};

export default AllTouristSpots;
