import React, { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    return hasUpperCase && hasLowerCase && isValidLength;
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const emailValue = form.email.value;
    const passwordValue = form.password.value;
    const loginData = { emailValue, passwordValue };

    if (validatePassword(password)) {
      console.log(loginData);

      setError("");
    } else {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
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
              name="email"
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
              name="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <span>Don't have an account?</span>
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
            Login
          </button>
        </form>
        <div className="mt-6 space-y-4">
          <button className="flex items-center justify-center w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition duration-200">
            <FaGoogle className="mr-2" /> Login with Google
          </button>
          <button className="flex items-center justify-center w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition duration-200">
            <FaGithub className="mr-2" /> Login with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
