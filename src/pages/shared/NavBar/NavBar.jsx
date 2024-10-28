import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaSignInAlt, FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-white hover:bg-[#007BFF] flex items-center transition duration-200 rounded-md ${
            isActive ? "bg-[#007BFF80] py-2 px-4" : "py-1 px-3"
          }`
        }>
        Home
      </NavLink>
      <NavLink
        to="/all-tourist-spots"
        className={({ isActive }) =>
          `text-white hover:bg-[#007BFF] flex items-center transition duration-200 rounded-md ${
            isActive ? "bg-[#007BFF80] py-2 px-4" : "py-1 px-3"
          }`
        }>
        All Tourist Spots
      </NavLink>
      <NavLink
        to="/add-tourist-spot"
        className={({ isActive }) =>
          `text-white hover:bg-[#007BFF] flex items-center transition duration-200 rounded-md ${
            isActive ? "bg-[#007BFF80] py-2 px-4" : "py-1 px-3"
          }`
        }>
        Add Tourist Spot
      </NavLink>
      <NavLink
        to="/my-list"
        className={({ isActive }) =>
          `text-white hover:bg-[#007BFF] flex items-center transition duration-200 rounded-md ${
            isActive ? "bg-[#007BFF80] py-2 px-4" : "py-1 px-3"
          }`
        }>
        My List
      </NavLink>
    </>
  );

  return (
    <nav className="bg-[#1A1A19] p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <NavLink to="/">TripNest</NavLink>
        </div>

        <div className="hidden md:flex space-x-2 lg:space-x-6">{navLinks}</div>

        <div className="items-center space-x-4 lg:space-x-6 hidden md:flex">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `flex items-center text-white hover:text-blue-200 transition duration-200 ${
                isActive ? "text-blue-300 py-2 px-4" : ""
              }`
            }
            aria-label="Login">
            <FaSignInAlt className="mr-2" /> Login
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              `flex items-center text-white hover:text-blue-200 transition duration-200 ${
                isActive ? "text-blue-300 py-2 px-4" : ""
              }`
            }
            aria-label="Register">
            <FaUser className="mr-2" /> Register
          </NavLink>
        </div>

        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white/80 hover:text-white duration-200 focus:outline-none">
            {isMobileMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1A1A19] mt-6 mb-2">
          <div className="flex flex-col space-y-3">{navLinks}</div>
          <div className="flex flex-col space-y-4 mt-4 ml-3">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `text-white hover:text-blue-200 flex items-center transition duration-200 ${
                  isActive ? "text-blue-300 py-2 px-4" : ""
                }`
              }>
              <FaSignInAlt className="mr-2" /> Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `text-white hover:text-blue-200 flex items-center transition duration-200 ${
                  isActive ? "text-blue-300 py-2 px-4" : ""
                }`
              }>
              <FaUser className="mr-2" /> Register
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
