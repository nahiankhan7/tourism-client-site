import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import SpotCard from "./SpotCard";
import { ColorRing } from "react-loader-spinner";
import myListBanner from "../../assets/images/my-list-banner.png";
import MyListBread from "../../components/shared/BreadCrumbs/MyListBread";

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
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8 px-4 md:px-0">
        <MyListBread />
      </div>
      <div className="mb-8">
        <img src={myListBanner} alt="" className="w-full h-auto object-cover" />
      </div>

      <div className="p-4 flex flex-col">
        {isError && <p className="text-red-600 mt-2">{message}</p>}

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
    </div>
  );
};

export default MyList;
