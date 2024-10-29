import React from "react";

const SpotCard = ({ touristSpot }) => {
  const {
    imageUrl,
    country,
    fullName,
    email,
    touristSpotName,
    location,
    averageCost,
    seasonality,
    travelTime,
    totalVisitorPerYear,
    shortDescription,
  } = touristSpot;

  return (
    <div className="max-w-md w-full rounded-lg overflow-hidden shadow-lg bg-white transform transition duration-300 hover:shadow-2xl">
      <img
        className="w-full h-48 object-cover"
        src={imageUrl}
        alt={touristSpotName}
        loading="lazy"
      />
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition duration-200">
          {touristSpotName}
        </h2>
        <p className="text-gray-600 text-base mt-2">{shortDescription}</p>
        <div className="mt-4 space-y-2">
          <p className="text-gray-500 text-sm">
            Location: <span className="text-gray-700">{location}</span>
          </p>
          <p className="text-gray-500 text-sm">
            Country: <span className="text-gray-700">{country}</span>
          </p>
          <p className="text-gray-500 text-sm">
            Average Cost: <span className="text-gray-700">{averageCost}</span>
          </p>
          <p className="text-gray-500 text-sm">
            Seasonality: <span className="text-gray-700">{seasonality}</span>
          </p>
          <p className="text-gray-500 text-sm">
            Travel Time: <span className="text-gray-700">{travelTime}</span>
          </p>
          <p className="text-gray-500 text-sm">
            Visitors per Year:{" "}
            <span className="text-gray-700">{totalVisitorPerYear}</span>
          </p>
          <p className="text-gray-500 text-sm">
            Contact:{" "}
            <span className="text-gray-700">
              {fullName} ({email})
            </span>
          </p>
        </div>
        <div className="flex items-center justify-end mt-4">
          <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-200 w-full md:w-auto mr-2">
            View Details
          </button>
          <button className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition duration-200 w-full md:w-auto">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotCard;
