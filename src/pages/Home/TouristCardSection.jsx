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
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {touristSpotName}
        </h2>
        <p className="text-gray-600">Located in {country}</p>
        <p className="mt-2 text-gray-700">{fullName}</p>
        <Link
          to={`/tourist-spot-details-page/${_id}`}
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default TouristCardSection;
