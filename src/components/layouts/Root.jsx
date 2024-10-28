import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Root = () => {
  return (
    <div className="font-roboto">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
