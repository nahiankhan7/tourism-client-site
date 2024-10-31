import React from "react";
import { Link } from "react-router-dom";

const TouristCardSection = ({ cardData }) => {
  const { _id, imageUrl, country, fullName, touristSpotName } = cardData;

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden mr-4 ml-4">
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

        <p className=" text-gray-500 text-lg">
          Country: <span className="text-gray-700">{country}</span>
        </p>

        <p className="text-gray-500 text-lg">
          Full Name: <span className="text-gray-700">{fullName}</span>
        </p>

        <div className="flex flex-col md:flex-row items-center justify-end gap-4 mt-4">
          <Link
            to={`/tourist-spot-details-page/${_id}`}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-200 w-full md:w-auto">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TouristCardSection;
