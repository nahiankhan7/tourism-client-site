import axios from "axios";
import React from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import UpdateTouristBread from "../../components/shared/BreadCrumbs/UpdateTouristBread";
import { BASE_URL } from "../../config/api.Config";

const UpdateSpotCard = () => {
  const { isError, message, data } = useLoaderData();
  const {
    _id,
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

  const updateTouristSpot = async (event) => {
    event.preventDefault();
    const form = event.target;

    const country = form.country.value;
    const fullName = form.full_name.value;
    const email = form.email.value;
    const touristSpotName = form.tourists_spot_name.value;
    const location = form.location.value;
    const averageCost = form.average_cost.value;
    const seasonality = form.seasonality.value;
    const travelTime = form.travel_time.value;
    const totalVisitorPerYear = form.total_visitors_per_year.value;
    const shortDescription = form.short_description.value;
    const imageUrl = form.image_url.value;

    const updatedTouristSpotValue = {
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
      imageUrl,
    };

    console.log(updatedTouristSpotValue);

    // Update data to the server
    try {
      const res = await axios.put(
        `${BASE_URL}/tourist-spot/${_id}`,
        updatedTouristSpotValue
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Tourist Spot Updated Successfully",
          icon: "success",
          confirmButtonText: "Okay",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update tourist spot",
        icon: error.response ? error.response.data.message : error.message,
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-tourist-bg bg-cover bg-center bg-no-repeat p-4 md:p-6">
      <div className="container mx-auto py-8 px-4 md:px-0">
        <UpdateTouristBread />
      </div>
      <div className="bg-white/80 p-6 rounded-lg max-w-4xl w-full shadow-lg md:mx-0">
        <h1 className="my-8 text-3xl font-bold text-center">
          Update Tourist Spot
        </h1>

        {/* Error message display */}
        {isError && (
          <div className="mb-4 p-3 bg-red-200 text-red-800 rounded-md">
            {message}
          </div>
        )}

        <form onSubmit={updateTouristSpot} className="flex flex-col space-y-6">
          {/* Country name dropdown */}
          <div>
            <label
              htmlFor="country"
              className="block text-lg font-medium text-gray-700 mb-2">
              Select a country:
            </label>
            <select
              id="country"
              name="country"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              defaultValue={country || "Bangladesh"}>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Thailand">Thailand</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Cambodia">Cambodia</option>
            </select>
          </div>

          {/* Full name and Email input field */}
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full mb-4 md:mb-0">
              <label
                htmlFor="full_name"
                className="block text-lg font-medium text-gray-700 mb-2">
                Full Name:
              </label>
              <input
                type="text"
                name="full_name"
                placeholder="Enter your full name"
                defaultValue={fullName}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700 mb-2">
                Email:
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                defaultValue={email}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Tourist spot name and Location input field */}
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full mb-4 md:mb-0">
              <label
                htmlFor="tourists_spot_name"
                className="block text-lg font-medium text-gray-700 mb-2">
                Tourist Spot Name:
              </label>
              <input
                type="text"
                name="tourists_spot_name"
                placeholder="Enter the spot name"
                defaultValue={touristSpotName}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="location"
                className="block text-lg font-medium text-gray-700 mb-2">
                Location:
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter the location"
                defaultValue={location}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Average cost and Seasonality input field */}
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full mb-4 md:mb-0">
              <label
                htmlFor="average_cost"
                className="block text-lg font-medium text-gray-700 mb-2">
                Average Cost:
              </label>
              <input
                type="text"
                name="average_cost"
                placeholder="Enter average cost"
                defaultValue={averageCost}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="seasonality"
                className="block text-lg font-medium text-gray-700 mb-2">
                Seasonality:
              </label>
              <input
                type="text"
                name="seasonality"
                placeholder="Enter seasonality"
                defaultValue={seasonality}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Travel time and Total visitors per year input field */}
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full mb-4 md:mb-0">
              <label
                htmlFor="travel_time"
                className="block text-lg font-medium text-gray-700 mb-2">
                Travel Time:
              </label>
              <input
                type="text"
                name="travel_time"
                placeholder="Enter travel time"
                defaultValue={travelTime}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="total_visitors_per_year"
                className="block text-lg font-medium text-gray-700 mb-2">
                Total Visitors Per Year:
              </label>
              <input
                type="text"
                name="total_visitors_per_year"
                placeholder="Enter total visitors per year"
                defaultValue={totalVisitorPerYear}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Short description input field */}
          <div className="w-full">
            <label
              htmlFor="short_description"
              className="block text-lg font-medium text-gray-700 mb-2">
              Short Description:
            </label>
            <textarea
              name="short_description"
              rows="5"
              placeholder="Enter a short description"
              defaultValue={shortDescription}
              className="block resize-none w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Image URL input field */}
          <div className="w-full">
            <label
              htmlFor="image_url"
              className="block text-lg font-medium text-gray-700 mb-2">
              Image URL:
            </label>
            <input
              type="text"
              name="image_url"
              placeholder="Enter image URL"
              defaultValue={imageUrl}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-center">
            <button
              className="bg-orange-500 w-full text-white py-3 text-xl rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSpotCard;
