import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../components/layouts/Root";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import AllTouristSpots from "../pages/AllTouristSpots/AllTouristSpots";
import AddTouristSpot from "../pages/AddTouristSpot/AddTouristSpot";
import MyList from "../pages/MyList/MyList";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const fetchWithErrorHandling = async (url) => {
  try {
    const response = await axios.get(url);
    return {
      isError: false,
      message: null,
      data: response.data,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      isError: true,
      message: error.message,
      data: [],
    };
  }
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "all-tourist-spots",
        element: <AllTouristSpots />,
      },
      {
        path: "add-tourist-spot",
        element: <AddTouristSpot />,
      },
      {
        path: "my-list",
        element: <MyList />,
        loader: () => fetchWithErrorHandling(`${BASE_URL}/tourist-spot`),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default routes;
