import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  // State variables for handling user input and error messages
  const [error, setError] = useState(""); // To store error messages
  const [name, setName] = useState(""); // To store user's name
  const [email, setEmail] = useState(""); // To store user's email
  const [photo, setPhoto] = useState(""); // To store user's photo URL
  const [password, setPassword] = useState(""); // To store user's password

  // Extracting functions from AuthContext for user creation and profile update
  const { createNewUser, updateUserProfile } = useContext(AuthContext);

  // Hooks for routing
  const location = useLocation(); // Current location
  const navigate = useNavigate(); // Navigation function

  // Function to validate the password according to specified criteria
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password); // Check for uppercase letters
    const hasLowerCase = /[a-z]/.test(password); // Check for lowercase letters
    const isValidLength = password.length >= 6; // Check for minimum length
    return hasUpperCase && hasLowerCase && isValidLength; // Return true if all conditions are met
  };

  // Function to handle form submission
  const handleRegisterSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Validate the password before creating the user
      if (validatePassword(password)) {
        const result = await createNewUser(email, password); // Create a new user
        console.log(result.user); // Log the newly created user

        // Update user profile with name and photo URL
        await updateUserProfile(name, photo);

        // Display a success message using SweetAlert
        Swal.fire({
          title: "Success!",
          text: "Registration successful.",
          icon: "success",
          confirmButtonText: "Okay",
        });

        setError(""); // Clear any previous error messages

        // Redirect the user to the previous location or the registration page
        const redirectPath = location.state?.from || "/register";
        navigate(redirectPath);
      } else {
        // Set an error message if password validation fails
        setError(
          "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
        );
      }
    } catch (error) {
      console.error(error.message); // Log any errors that occur
      // Display an error message using SweetAlert
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Register Form
        </h2>
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update name state on change
              required
              placeholder="Enter your name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
              required
              placeholder="you@example.com"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-700">
              Photo URL:
            </label>
            <input
              type="text"
              id="photo"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)} // Update photo state on change
              required
              placeholder="Enter your photo URL"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state on change
              required
              placeholder="••••••••"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Display error message if exists */}
          {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}{" "}
          <div className="flex items-center space-x-2">
            <span>Already have an account?</span>
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
