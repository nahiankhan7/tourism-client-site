import React from "react";
import { useLoaderData } from "react-router-dom";

const TouristSpotDetailsPage = () => {
  const { isError, message, data } = useLoaderData();

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
  } = data;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {isError && (
          <p className="text-red-600 text-center font-semibold p-4">
            {message}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          <div className="col-span-2">
            <img
              src={imageUrl}
              alt={touristSpotName}
              className="w-full object-cover h-64 sm:h-80 md:h-full rounded-lg shadow"
            />
          </div>

          <div className="col-span-1 flex flex-col justify-center ml-0 md:ml-4 space-y-2">
            <h1 className="text-2xl font-bold mb-2">{touristSpotName}</h1>
            <ul className="space-y-2">
              <li>
                <strong>Country:</strong> {country}
              </li>
              <li>
                <strong>Location:</strong> {location}
              </li>
              <li>
                <strong>Average Cost:</strong> ${averageCost}
              </li>
              <li>
                <strong>Seasonality:</strong> {seasonality}
              </li>
              <li>
                <strong>Travel Time:</strong> {travelTime} Days
              </li>
              <li>
                <strong>Total Visitors per Year:</strong> {totalVisitorPerYear}
              </li>
            </ul>

            <div className="mt-4">
              <h2 className="text-lg font-semibold">Contact Information:</h2>
              <ul className="space-y-1">
                <li>
                  <strong>Name:</strong> {fullName}
                </li>
                <li>
                  <strong>Email:</strong> {email}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-300">
          <h2 className="text-lg font-semibold">Description:</h2>
          <p>{shortDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default TouristSpotDetailsPage;
