import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../components/layouts/Root";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import AllTouristSpots from "../pages/AllTouristSpots/AllTouristSpots";
import AddTouristSpot from "../pages/AddTouristSpot/AddTouristSpot";
import MyList from "../pages/MyList/MyList";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import UpdateSpotCard from "../pages/UpdateTouristSpot/UpdateSpotCard";
import TouristSpotDetailsPage from "../pages/TouristSpotDetailsPage/TouristSpotDetailsPage";
import PrivateRoute from "./PrivateRoute";
import { BASE_URL } from "../config/api.Config";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

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

const Index = () => {
  const { user } = useContext(AuthContext) || {}; // Use optional chaining
  // console.log("user:::", user);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <Home />,
          loader: () => fetchWithErrorHandling(`${BASE_URL}/tourist-spot`),
        },
        {
          path: "all-tourist-spots",
          element: <AllTouristSpots />,
          loader: () => fetchWithErrorHandling(`${BASE_URL}/tourist-spot`),
        },
        {
          path: "add-tourist-spot",
          element: (
            <PrivateRoute>
              <AddTouristSpot />
            </PrivateRoute>
          ),
        },
        {
          path: "my-list",
          element: (
            <PrivateRoute>
              <MyList />
            </PrivateRoute>
          ),
          loader: () =>
            fetchWithErrorHandling(`${BASE_URL}/my-list/${user?.email}`),
        },
        {
          path: "update-spot-card/:id",
          element: <UpdateSpotCard />,
          loader: ({ params }) =>
            fetchWithErrorHandling(`${BASE_URL}/tourist-spot/${params.id}`),
        },
        {
          path: "tourist-spot-details-page/:id",
          element: (
            <PrivateRoute>
              <TouristSpotDetailsPage />
            </PrivateRoute>
          ),
          loader: ({ params }) =>
            fetchWithErrorHandling(`${BASE_URL}/tourist-spot/${params.id}`),
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

  return <RouterProvider router={routes} />;
};

export default Index;
