import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import DetailsPageTouristBread from "../../components/shared/BreadCrumbs/DetailsPageTouristBread";

const TouristSpotDetailsPage = () => {
  const { isError, message, data } = useLoaderData();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  if (isLoading) {
    return (
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
    );
  }

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto">
        <div className="py-8 px-4 md:px-0">
          <DetailsPageTouristBread />
        </div>
        <div className="flex justify-center items-center  p-4">
          <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
            {isError && (
              <p className="text-red-600 text-center font-semibold p-4">
                {message}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
              <div className="col-span-2">
                <img
                  src={data.imageUrl}
                  alt={data.touristSpotName}
                  className="w-full object-cover h-64 sm:h-80 md:h-full rounded-lg shadow"
                />
              </div>

              <div className="col-span-1 flex flex-col justify-center ml-0 md:ml-4 space-y-2">
                <h1 className="text-2xl font-bold mb-2">
                  {data.touristSpotName}
                </h1>
                <ul className="space-y-2">
                  <li>
                    <strong>Country:</strong> {data.country}
                  </li>
                  <li>
                    <strong>Location:</strong> {data.location}
                  </li>
                  <li>
                    <strong>Average Cost:</strong> ${data.averageCost}
                  </li>
                  <li>
                    <strong>Seasonality:</strong> {data.seasonality}
                  </li>
                  <li>
                    <strong>Travel Time:</strong> {data.travelTime}
                  </li>
                  <li>
                    <strong>Total Visitors per Year:</strong>{" "}
                    {data.totalVisitorPerYear}
                  </li>
                </ul>

                <div className="mt-4">
                  <h2 className="text-lg font-semibold">
                    Contact Information:
                  </h2>
                  <ul className="space-y-1">
                    <li>
                      <strong>Name:</strong> {data.fullName}
                    </li>
                    <li>
                      <strong>Email:</strong>{" "}
                      <a
                        className="text-blue-500 hover:underline"
                        href={`mailto:${data.email}`}
                        target="_blank">
                        {data.email}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-300">
              <h2 className="text-lg font-semibold">Description:</h2>
              <p>{data.shortDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristSpotDetailsPage;
