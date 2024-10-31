import React, { useContext, useState } from "react"; // Import necessary React hooks and libraries
import { FaGoogle, FaFacebook } from "react-icons/fa"; // Import icons for Google and GitHub
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import routing utilities
import { AuthContext } from "../../providers/AuthProvider"; // Import authentication context
import Swal from "sweetalert2";

const Login = () => {
  // State variables for handling user input and error messages
  const [error, setError] = useState(""); // To store error messages
  const [email, setEmail] = useState(""); // To store user's email
  const [password, setPassword] = useState(""); // To store user's password

  // Use context to get the loginUser function from AuthContext
  const { loginUser, googleLogin, facebookLogin } = useContext(AuthContext);

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

  // Handle login with google
  const handleGoogleLogin = async () => {
    try {
      const gLogin = await googleLogin();
      console.log("Google login successful:: ", gLogin);

      // Redirect the user after successful login
      const redirectPath = location.state?.from || "/login"; // Get redirect path from location state or default to '/login'
      navigate(redirectPath); // Navigate to the redirect path
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        title: "Google login failed!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const fLogin = await facebookLogin();
      console.log("Facebook login successful:: ", fLogin);
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        title: "Facebook login failed!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  // Function to handle form submission
  const handleLoginSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      // Validate the password
      if (validatePassword(password)) {
        // Attempt to log the user in
        const result = await loginUser(email, password);
        console.log(result.user); // Log the user object to console
        setError(""); // Clear any previous errors

        // Redirect the user after successful login
        const redirectPath = location.state?.from || "/login"; // Get redirect path from location state or default to '/login'
        navigate(redirectPath); // Navigate to the redirect path
      } else {
        // Set an error message if password validation fails
        setError(
          "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
        );
      }
    } catch (error) {
      console.error("Login error:", error); // Log any error that occurs during login
      setError("Login failed. Please check your email and password."); // Set error message for user
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Main container for the login form */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login Form</h2>
        <form className="space-y-4" onSubmit={handleLoginSubmit}>
          {/* Email input field */}
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
          {/* Password input field */}
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
            {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}{" "}
            {/* Display error message if exists */}
          </div>
          {/* Registration link */}
          <div className="flex items-center space-x-2">
            <span>Don't have an account?</span>
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </div>
          {/* Submit button for logging in */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
            Login
          </button>
        </form>
        {/* Buttons for social login */}
        <div className="mt-6 space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition duration-200">
            <FaGoogle className="mr-2" /> Login with Google
          </button>
          <button
            onClick={handleFacebookLogin}
            className="flex items-center justify-center w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition duration-200">
            <FaFacebook className="mr-2" /> Login with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login; // Export the Login component for use in other parts of the app
