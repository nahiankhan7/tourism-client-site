import axios from "axios";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import AddTouristBread from "../../components/shared/BreadCrumbs/AddTouristBread";
import { AuthContext } from "../../providers/AuthProvider";

const AddTouristSpot = () => {
  const { user } = useContext(AuthContext); // Get user info from context
  console.log("User form add page ::: ", user);

  // State to hold form input values
  const [formData, setFormData] = useState({
    country: "Bangladesh", // Default selected country
    fullName: `${user.displayName}`, // Pre-fill with user's display name
    email: `${user.email}`, // Pre-fill with user's email
    touristSpotName: "",
    location: "",
    averageCost: "",
    seasonality: "",
    travelTime: "",
    totalVisitorPerYear: "",
    shortDescription: "",
    imageUrl: "",
  });

  const [file, setFile] = useState(null); // State to hold the uploaded file

  // Handle changes in input fields
  const handleChange = (event) => {
    const { name, value } = event.target; // Destructure name and value from target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field in the form data
    }));
  };

  // Handle changes in file input
  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Update file state with selected file
  };

  // Function to upload image to ImageBB
  const uploadImage = async () => {
    if (!file) return; // If no file is selected, exit the function

    const formData = new FormData(); // Create a FormData object
    formData.append("image", file); // Append the image file

    try {
      // Send POST request to ImageBB API
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=592bd119a2c238747c808a8c315852e4",
        formData
      );
      return response.data.data.url; // Return the uploaded image URL
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

  // Function to handle form submission
  const addTouristSpot = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const uploadedImageUrl = await uploadImage(); // Upload the image and get the URL
    if (uploadedImageUrl) {
      // Update formData with the uploaded image URL
      setFormData((prevData) => ({
        ...prevData,
        imageUrl: uploadedImageUrl,
      }));

      try {
        // Send a POST request to the server with the form data
        const res = await axios.post("http://localhost:5000/tourist-spot", {
          ...formData,
          imageUrl: uploadedImageUrl,
        });
        console.log(res.data); // Log the response data

        // Show success alert using SweetAlert2
        Swal.fire({
          title: "Success!",
          text: "Tourist spot added successfully",
          icon: "success",
          confirmButtonText: "Okay",
        });

        // Reset form to initial state
        setFormData({
          country: "Bangladesh",
          fullName: `${user.displayName}`,
          email: `${user.email}`,
          touristSpotName: "",
          location: "",
          averageCost: "",
          seasonality: "",
          travelTime: "",
          totalVisitorPerYear: "",
          shortDescription: "",
          imageUrl: "",
        });
        setFile(null); // Reset file input
      } catch (error) {
        console.log(error); // Log any errors
        // Show error alert using SweetAlert2
        Swal.fire({
          title: "Tourist spot addition failed!",
          text: error.response ? error.response.data.message : error.message,
          icon: "error",
          confirmButtonText: "Okay",
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-tourist-bg bg-cover bg-center bg-no-repeat p-4 md:p-6">
      <div className="container mx-auto py-8 px-4 md:px-0">
        <AddTouristBread /> {/* Breadcrumb component */}
      </div>
      <div className="bg-white/80 p-6 rounded-lg max-w-4xl w-full shadow-lg md:mx-0">
        <h1 className="my-8 text-3xl font-bold text-center">
          Add Tourist Spot
        </h1>

        {/* Form for adding a tourist spot */}
        <form onSubmit={addTouristSpot} className="flex flex-col space-y-6">
          {/* Country selection dropdown */}
          <div>
            <label
              htmlFor="country"
              className="block text-lg font-medium text-gray-700 mb-2">
              Select a country:
            </label>
            <select
              id="country"
              name="country" // Name corresponds to the state field
              value={formData.country} // Controlled component
              onChange={handleChange} // Handle change for the dropdown
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500">
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
                htmlFor="full_name"
                className="block text-lg font-medium text-gray-700 mb-2">
                Full Name:
              </label>
              <input
                type="text"
                name="fullName" // Name corresponds to the state field
                placeholder="Enter your full name"
                value={formData.fullName} // Controlled component
                onChange={handleChange} // Handle change for the input
                required // Make this field required
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
                name="email" // Name corresponds to the state field
                placeholder="Enter your email"
                value={formData.email} // Controlled component
                onChange={handleChange} // Handle change for the input
                required // Make this field required
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Tourist spot name and Location input fields */}
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full mb-4 md:mb-0">
              <label
                htmlFor="tourists_spot_name"
                className="block text-lg font-medium text-gray-700 mb-2">
                Tourist Spot Name:
              </label>
              <input
                type="text"
                name="touristSpotName" // Name corresponds to the state field
                placeholder="Enter the spot name"
                value={formData.touristSpotName} // Controlled component
                onChange={handleChange} // Handle change for the input
                required // Make this field required
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
                name="location" // Name corresponds to the state field
                placeholder="Enter the location"
                value={formData.location} // Controlled component
                onChange={handleChange} // Handle change for the input
                required // Make this field required
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Average cost and Seasonality input fields */}
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full mb-4 md:mb-0">
              <label
                htmlFor="average_cost"
                className="block text-lg font-medium text-gray-700 mb-2">
                Average Cost:
              </label>
              <input
                type="text"
                name="averageCost" // Name corresponds to the state field
                placeholder="Enter average cost"
                value={formData.averageCost} // Controlled component
                onChange={handleChange} // Handle change for the input
                required // Make this field required
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
                name="seasonality" // Name corresponds to the state field
                placeholder="Enter seasonality"
                value={formData.seasonality} // Controlled component
                onChange={handleChange} // Handle change for the input
                required // Make this field required
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Travel time and Total visitors per year input fields */}
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full mb-4 md:mb-0">
              <label
                htmlFor="travel_time"
                className="block text-lg font-medium text-gray-700 mb-2">
                Travel Time:
              </label>
              <input
                type="text"
                name="travelTime" // Name corresponds to the state field
                placeholder="Enter travel time"
                value={formData.travelTime} // Controlled component
                onChange={handleChange} // Handle change for the input
                required // Make this field required
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="total_visitor_per_year"
                className="block text-lg font-medium text-gray-700 mb-2">
                Total Visitors Per Year:
              </label>
              <input
                type="number"
                name="totalVisitorPerYear" // Name corresponds to the state field
                placeholder="Enter total visitors"
                value={formData.totalVisitorPerYear} // Controlled component
                onChange={handleChange} // Handle change for the input
                required // Make this field required
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
              name="shortDescription" // Name corresponds to the state field
              rows="5"
              placeholder="Enter a short description"
              value={formData.shortDescription} // Controlled component
              onChange={handleChange} // Handle change for the textarea
              required // Make this field required
              className="block resize-none w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Image upload input field */}
          <div className="w-full">
            <label
              htmlFor="image"
              className="block text-lg font-medium text-gray-700 mb-2">
              Upload Image:
            </label>
            <input
              type="file"
              accept="image/*" // Accept only image files
              onChange={handleFileChange} // Handle change for the file input
              required // Make this field required
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Submit button */}
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
