import React from "react";
import { useLoaderData } from "react-router-dom";
import SpotCard from "./SpotCard";

const MyList = () => {
  const { isError, message, data } = useLoaderData();

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col">
      <div className="text-center my-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          My List Data Collection: {data.length}
        </h2>
        {isError && <p className="text-red-600 mt-2">{message}</p>}
      </div>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-8">
          {data.map((touristSpot) => (
            <SpotCard key={touristSpot._id} touristSpot={touristSpot} />
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
