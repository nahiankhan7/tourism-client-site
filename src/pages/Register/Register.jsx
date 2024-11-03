import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { IMAGEBB_ADD_API } from "../../config/api.Config";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  // State variables to manage user input and error messages
  const [error, setError] = useState(""); // To store error messages
  const [name, setName] = useState(""); // To store user's name
  const [email, setEmail] = useState(""); // To store user's email
  const [password, setPassword] = useState(""); // To store user's password
  const [file, setFile] = useState(null); // To hold the uploaded file
  const [loading, setLoading] = useState(false); // To manage loading state

  // Extract functions from AuthContext for user creation and profile update
  const { createNewUser, updateUserProfile, googleLogin } =
    useContext(AuthContext);

  // Hooks for routing
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Function for navigation

  // Function to validate the password according to specified criteria
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password); // Check for uppercase letters
    const hasLowerCase = /[a-z]/.test(password); // Check for lowercase letters
    const isValidLength = password.length >= 6; // Check for minimum length
    return hasUpperCase && hasLowerCase && isValidLength; // Return true if all conditions are met
  };

  // Handle changes in file input
  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Update file state with the selected file
  };

  // Function to upload the image to ImageBB
  const uploadImage = async () => {
    if (!file) return null; // Exit if no file is selected

    const formData = new FormData(); // Create a FormData object
    formData.append("image", file); // Append the image file to the form data

    try {
      // Send POST request to ImageBB API
      const response = await axios.post(`${IMAGEBB_ADD_API}`, formData);
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

  // Handle login with Google
  const handleGoogleLogin = async () => {
    try {
      setLoading(true); // Start loading state
      await googleLogin(); // Attempt to log in with Google
      const redirectPath = location.state?.from || "/"; // Determine where to redirect after login
      navigate(redirectPath); // Redirect the user
    } catch (error) {
      // Show error message if login fails
      Swal.fire({
        title: "Google login failed!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Okay",
      });
    } finally {
      setLoading(false); // End loading state
    }
  };

  // Function to handle form submission
  const handleRegisterSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Validate the password before creating the user
    if (!validatePassword(password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return; // Exit if validation fails
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address."); // Set error message if invalid
      return; // Exit if email is invalid
    }

    try {
      // Upload the image and get the URL
      const uploadedPhotoUrl = await uploadImage();

      // Create a new user with the provided email and password
      const result = await createNewUser(email, password);
      console.log(result.user); // Log the newly created user

      // Update user profile with name and the uploaded photo URL
      await updateUserProfile(name, uploadedPhotoUrl);

      // Display a success message using SweetAlert
      Swal.fire({
        title: "Success!",
        text: "Registration successful.",
        icon: "success",
        confirmButtonText: "Okay",
      });

      // Reset form fields after successful registration
      resetForm();

      // Redirect the user to the previous location or the home page
      const redirectPath = location.state?.from || "/";
      navigate(redirectPath);
    } catch (error) {
      console.error("Registration error:", error.message); // Log any errors that occur
      // Display an error message using SweetAlert
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  // Function to reset the form fields
  const resetForm = () => {
    setName(""); // Clear name field
    setEmail(""); // Clear email field
    setPassword(""); // Clear password field
    setError(""); // Clear error messages
    setFile(null); // Clear file state
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
          <div className="w-full">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-2">
              User Image:
            </label>
            <input
              type="file"
              accept="image/*" // Accept only image files
              onChange={handleFileChange} // Handle change for the file input
              required // Make this field required
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
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
          {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}{" "}
          {/* Display error message if exists */}
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

        <div className="mt-6 space-y-4">
          <button
            onClick={handleGoogleLogin} // Handle Google login on click
            className={`flex items-center justify-center w-full py-2 rounded-md transition duration-200 ${
              loading ? "bg-gray-400" : "bg-gray-200 hover:bg-gray-300"
            } text-gray-700`}
            disabled={loading} // Disable button while loading
          >
            <FaGoogle className="mr-2" /> Login with Google{" "}
            {/* Google login button */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
