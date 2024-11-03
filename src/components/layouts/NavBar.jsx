import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import {
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import logo from "../../assets/images/logo.png";
import { AuthContext } from "../../providers/AuthProvider";

const NavBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);

  const handleLogOut = async () => {
    await logoutUser();
  };

  const handleMobileMenuClick = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        onClick={handleMobileMenuClick}
        className={({ isActive }) =>
          `text-gray-200 hover:text-white hover:bg-[#007BFF] flex items-center transition duration-200 rounded-md ${
            isActive ? "bg-[#007BFF] text-white py-2 px-4" : "py-1 px-3"
          }`
        }>
        Home
      </NavLink>
      <NavLink
        to="/all-tourist-spots"
        onClick={handleMobileMenuClick}
        className={({ isActive }) =>
          `text-gray-200 hover:text-white hover:bg-[#007BFF] flex items-center transition duration-200 rounded-md ${
            isActive ? "bg-[#007BFF] text-white py-2 px-4" : "py-1 px-3"
          }`
        }>
        All Tourist Spots
      </NavLink>
      <NavLink
        to="/add-tourist-spot"
        onClick={handleMobileMenuClick}
        className={({ isActive }) =>
          `text-gray-200 hover:text-white hover:bg-[#007BFF] flex items-center transition duration-200 rounded-md ${
            isActive ? "bg-[#007BFF] text-white py-2 px-4" : "py-1 px-3"
          }`
        }>
        Add Tourist Spot
      </NavLink>
      <NavLink
        to="/my-list"
        onClick={handleMobileMenuClick}
        className={({ isActive }) =>
          `text-gray-200 hover:text-white hover:bg-[#007BFF] flex items-center transition duration-200 rounded-md ${
            isActive ? "bg-[#007BFF] text-white py-2 px-4" : "py-1 px-3"
          }`
        }>
        My List
      </NavLink>
    </>
  );

  return (
    <nav className="bg-[#1A1A19] p-4 shadow-md ">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex justify-between items-center ">
          <NavLink className="flex items-center space-x-2" to="/">
            <img src={logo} width={25} alt="" />
            <span className="text-white text-xl font-bold">TripNest</span>
          </NavLink>

          <div className="hidden md:flex space-x-2 lg:space-x-6">
            {navLinks}
          </div>

          {user ? (
            <div className="md:flex items-center space-x-4 hidden">
              <div className="flex items-center justify-center rounded-full ring-2 ring-sky-600 hover:ring-sky-400 duration-200 p-1">
                <Link id="my-anchor-element">
                  <img
                    src={user.photoURL}
                    className="w-10 h-10 rounded-full object-cover"
                    alt={user.displayName}
                  />
                </Link>
                <Tooltip
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                  place="left"
                  anchorSelect="#my-anchor-element"
                  content={user.displayName}
                />
              </div>

              <button
                onClick={handleLogOut}
                className="flex items-center text-gray-200 hover:text-[#007BFF] transition duration-200">
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          ) : (
            <div className="items-center space-x-4 lg:space-x-6 hidden md:flex">
              <NavLink
                to="/login"
                onClick={handleMobileMenuClick}
                className={({ isActive }) =>
                  `flex items-center text-gray-200 hover:text-[#007BFF] transition duration-200 ${
                    isActive ? "text-[#007BFF] py-2 px-4" : ""
                  }`
                }
                aria-label="Login">
                <FaSignInAlt className="mr-2" /> Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={handleMobileMenuClick}
                className={({ isActive }) =>
                  `flex items-center text-gray-200 hover:text-[#007BFF] transition duration-200 ${
                    isActive ? "text-[#007BFF] py-2 px-4" : ""
                  }`
                }
                aria-label="Register">
                <FaUser className="mr-2" /> Register
              </NavLink>
            </div>
          )}

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
            {user ? (
              <div className="flex items-center justify-end space-x-4 mt-6 md:mt-0">
                <div className="flex items-center justify-center rounded-full ring-2 ring-sky-500 hover:ring-sky-400 duration-200 p-1">
                  <Link id="my-anchor-element">
                    <img
                      src={user.photoURL}
                      className="w-10 h-10 rounded-full object-cover"
                      alt={user.displayName}
                    />
                  </Link>
                  <Tooltip
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                    place="left"
                    anchorSelect="#my-anchor-element"
                    content={user.displayName}
                  />
                </div>
                <button
                  onClick={handleLogOut}
                  className="flex items-center text-gray-200 hover:text-[#007BFF] transition duration-200">
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4 mt-4 ml-3">
                <NavLink
                  to="/login"
                  onClick={handleMobileMenuClick}
                  className={({ isActive }) =>
                    `text-gray-200 hover:text-[#007BFF] flex items-center transition duration-200 ${
                      isActive ? "text-[#007BFF] py-2 px-4" : ""
                    }`
                  }>
                  <FaSignInAlt className="mr-2" /> Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={handleMobileMenuClick}
                  className={({ isActive }) =>
                    `text-gray-200 hover:text-[#007BFF] flex items-center transition duration-200 ${
                      isActive ? "text-[#007BFF] py-2 px-4" : ""
                    }`
                  }>
                  <FaUser className="mr-2" /> Register
                </NavLink>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
