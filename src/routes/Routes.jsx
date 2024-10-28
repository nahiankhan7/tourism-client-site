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
