import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
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
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/all-tourist-spots",
        element: <AllTouristSpots></AllTouristSpots>,
      },
      {
        path: "/add-tourist-spot",
        element: <AddTouristSpot></AddTouristSpot>,
      },
      {
        path: "/my-list",
        element: <MyList></MyList>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default routes;
