import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import AllSpotCard from "./AllSpotCard";
import { ColorRing } from "react-loader-spinner";
import allTouristBanner from "../../assets/images/all-tourist-banner.png";
import AllTouristBread from "../../components/shared/BreadCrumbs/AllTouristBread";

const AllTouristSpots = () => {
  const { data } = useLoaderData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8 px-4 md:px-0">
        <AllTouristBread />
      </div>
      <div className="mb-8">
        <img
          src={allTouristBanner}
          alt=""
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="p-4 flex flex-col">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-2">
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
    </div>
  );
};

export default AllTouristSpots;
