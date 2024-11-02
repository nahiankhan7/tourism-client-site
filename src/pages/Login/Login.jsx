import React, { useContext, useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  // State variables to manage user input and error messages
  const [error, setError] = useState(""); // To store error messages
  const [email, setEmail] = useState(""); // To store user's email
  const [password, setPassword] = useState(""); // To store user's password
  const [loading, setLoading] = useState(false); // To manage loading state during async operations

  // Access authentication functions from AuthContext
  const { loginUser, googleLogin, facebookLogin } = useContext(AuthContext);
  const location = useLocation(); // Get the current location for redirecting after login
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  // Function to validate the password against specified criteria
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password); // Check for uppercase letters
    const hasLowerCase = /[a-z]/.test(password); // Check for lowercase letters
    const isValidLength = password.length >= 6; // Check for minimum length
    return hasUpperCase && hasLowerCase && isValidLength; // Return true if all conditions are met
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

  // Handle login with Facebook
  const handleFacebookLogin = async () => {
    try {
      setLoading(true); // Start loading state
      await facebookLogin(); // Attempt to log in with Facebook
      const redirectPath = location.state?.from || "/"; // Determine redirect path
      navigate(redirectPath); // Redirect the user
    } catch (error) {
      // Show error message if login fails
      Swal.fire({
        title: "Facebook login failed!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Okay",
      });
    } finally {
      setLoading(false); // End loading state
    }
  };

  // Function to handle form submission for email and password login
  const handleLoginSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Start loading state
    try {
      // Validate the password before attempting login
      if (validatePassword(password)) {
        await loginUser(email, password); // Attempt to log in with email and password
        setError(""); // Clear previous error messages
        const redirectPath = location.state?.from || "/"; // Determine redirect path
        navigate(redirectPath); // Redirect the user
      } else {
        // Set an error message if password validation fails
        setError(
          "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
        );
      }
    } catch (error) {
      console.error("Login error:", error); // Log any error during login
      setError("Login failed. Please check your email and password."); // Display a user-friendly error message
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login Form</h2>
        <form className="space-y-4" onSubmit={handleLoginSubmit}>
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
          <div className="flex items-center space-x-2">
            <span>Don't have an account?</span>
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>{" "}
            {/* Link to registration page */}
          </div>
          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className={`w-full py-2 rounded-md transition duration-200 ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white`}>
            {loading ? "Logging in..." : "Login"}{" "}
            {/* Change button text based on loading state */}
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
          <button
            onClick={handleFacebookLogin} // Handle Facebook login on click
            className={`flex items-center justify-center w-full py-2 rounded-md transition duration-200 ${
              loading ? "bg-gray-400" : "bg-gray-200 hover:bg-gray-300"
            } text-gray-700`}
            disabled={loading} // Disable button while loading
          >
            <FaFacebook className="mr-2" /> Login with Facebook{" "}
            {/* Facebook login button */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
