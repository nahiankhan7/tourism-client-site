import axios from "axios";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import UpdateTouristBread from "../../components/shared/BreadCrumbs/UpdateTouristBread";
import { BASE_URL, IMAGEBB_UPLOAD_API } from "../../config/api.Config";

const UpdateSpotCard = () => {
  // Load data from the loader
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

  // Initialize state for form values, pre-filled with data from loader
  const [formValues, setFormValues] = useState({
    country: country || "Bangladesh",
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
  });

  // State to hold the uploaded file
  const [file, setFile] = useState(null);

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle changes in file input
  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Store the selected file in state
  };

  // Function to upload image to ImageBB
  const uploadImage = async () => {
    if (!file) return null; // If no file is selected, return null

    const formData = new FormData(); // Create a FormData object to hold the file
    formData.append("image", file); // Append the image file to form data

    try {
      // Send POST request to ImageBB API
      const response = await axios.post(`${IMAGEBB_UPLOAD_API}`, formData);
      return response.data.data.url; // Return the URL of the uploaded image
    } catch (error) {
      console.error("Image upload error: ", error);
      // Show error alert using SweetAlert2
      Swal.fire({
        title: "Image upload failed!",
        text: error.response ? error.response.data.message : error.message,
        icon: "error",
        confirmButtonText: "Okay",
      });
      return null; // Return null on error
    }
  };

  // Function to handle the form submission
  const updateTouristSpot = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Attempt to upload the image and get the new URL
    const uploadedImageUrl = await uploadImage();
    if (!uploadedImageUrl) {
      Swal.fire({
        title: "Upload Error!",
        text: "Please upload a valid image.",
        icon: "warning",
        confirmButtonText: "Okay",
      });
      return; // Stop execution if upload failed
    }

    // Prepare updated data including the new image URL
    const updatedData = {
      ...formValues,
      imageUrl: uploadedImageUrl, // Update the image URL in the data
    };

    // Send the updated data to the server
    try {
      const res = await axios.put(
        `${BASE_URL}/tourist-spot/${_id}`,
        updatedData
      );

      // If the update was successful, show a success message
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
      // Show error alert if update fails
      Swal.fire({
        title: "Error!",
        text: "Failed to update tourist spot",
        icon: "error",
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

        {/* Display error message if applicable */}
        {isError && (
          <div className="mb-4 p-3 bg-red-200 text-red-800 rounded-md">
            {message}
          </div>
        )}

        {/* Form to update tourist spot information */}
        <form onSubmit={updateTouristSpot} className="flex flex-col space-y-6">
          {/* Country dropdown */}
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
              value={formValues.country}
              onChange={handleChange}>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Thailand">Thailand</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Cambodia">Cambodia</option>
            </select>
          </div>

          {/* Full name and Email input fields */}
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full mb-4 md:mb-0">
              <label
                htmlFor="fullName"
                className="block text-lg font-medium text-gray-700 mb-2">
                Full Name:
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formValues.fullName}
                onChange={handleChange}
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
                value={formValues.email}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Tourist spot name and Location input fields */}
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full mb-4 md:mb-0">
              <label
                htmlFor="touristSpotName"
                className="block text-lg font-medium text-gray-700 mb-2">
                Tourist Spot Name:
              </label>
              <input
                type="text"
                name="touristSpotName"
                placeholder="Enter the spot name"
                value={formValues.touristSpotName}
                onChange={handleChange}
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
                value={formValues.location}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Average cost and Seasonality input fields */}
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full mb-4 md:mb-0">
              <label
                htmlFor="averageCost"
                className="block text-lg font-medium text-gray-700 mb-2">
                Average Cost:
              </label>
              <input
                type="text"
                name="averageCost"
                placeholder="Enter average cost"
                value={formValues.averageCost}
                onChange={handleChange}
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
                value={formValues.seasonality}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Travel time and Total visitors per year input fields */}
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full mb-4 md:mb-0">
              <label
                htmlFor="travelTime"
                className="block text-lg font-medium text-gray-700 mb-2">
                Travel Time:
              </label>
              <input
                type="text"
                name="travelTime"
                placeholder="Enter travel time"
                value={formValues.travelTime}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="totalVisitorPerYear"
                className="block text-lg font-medium text-gray-700 mb-2">
                Total Visitors Per Year:
              </label>
              <input
                type="text"
                name="totalVisitorPerYear"
                placeholder="Enter total visitors per year"
                value={formValues.totalVisitorPerYear}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Short description input field */}
          <div className="w-full">
            <label
              htmlFor="shortDescription"
              className="block text-lg font-medium text-gray-700 mb-2">
              Short Description:
            </label>
            <textarea
              name="shortDescription"
              rows="5"
              placeholder="Enter a short description"
              value={formValues.shortDescription}
              onChange={handleChange}
              className="block resize-none w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          {/* File input for image upload */}
          <div className="w-full">
            <label
              htmlFor="file"
              className="block text-lg font-medium text-gray-700 mb-2">
              Upload Image:
            </label>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Submit button to update the tourist spot */}
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
