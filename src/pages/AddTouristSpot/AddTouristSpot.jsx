import React from "react";

const AddTouristSpot = () => {
  const addTouristSpot = (event) => {
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

    const touristSpoValue = {
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

    console.log(touristSpoValue);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full shadow-lg my-4 mx-2 md:mx-0">
        <h1 className="my-8 text-3xl font-bold text-center">
          Add Tourist Spot
        </h1>

        <form onSubmit={addTouristSpot} className="flex flex-col space-y-6">
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
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500">
              <option value="Bangladesh" selected>
                Bangladesh
              </option>
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
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-center">
            <button
              className="bg-orange-500 w-full text-white py-3 text-xl rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTouristSpot;
