import React from "react";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config/api.Config";

const SpotCard = ({ touristSpot, spotCard, setSpotCard }) => {
  const { _id, imageUrl, country, fullName, touristSpotName } = touristSpot;

  const handleDeleteSpot = async (_id) => {
    console.log(_id);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`${BASE_URL}/tourist-spot/${_id}`);
        const data = response.data;

        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your Spot has been deleted.",
            icon: "success",
          });
          const remaining = spotCard.filter((spot) => spot._id !== _id);
          setSpotCard(remaining);
        } else {
          Swal.fire({
            title: "Error!",
            text: "Spot could not be deleted.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          title: "Error!",
          text: "There was a problem deleting the spot.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="max-w-md w-full rounded-lg overflow-hidden shadow-lg bg-white transform transition duration-300 hover:shadow-2xl">
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

          <Link
            to={`/update-spot-card/${_id}`}
            className="bg-orange-600 flex items-center justify-center text-white font-semibold py-2 px-4 rounded hover:bg-orange-700 transition duration-200 w-full md:w-auto">
            Edit
            <FaEdit className="ml-2" />
          </Link>

          <button
            onClick={() => handleDeleteSpot(_id)}
            className="bg-red-600 text-white flex items-center justify-center font-semibold py-2 text-2xl px-4 rounded hover:bg-red-700 transition duration-200 w-full md:w-auto">
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotCard;
