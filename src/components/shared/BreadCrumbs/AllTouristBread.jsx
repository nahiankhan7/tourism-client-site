import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const AllTouristBread = () => {
  return (
    <nav aria-label="breadcrumb">
      <Breadcrumbs separator=">" aria-label="breadcrumb">
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          Home
        </Link>
        <Link
          component={RouterLink}
          to="/all-tourist-spots"
          underline="hover"
          color="text.primary"
          aria-current="page">
          All Tourist Spots
        </Link>
      </Breadcrumbs>
    </nav>
  );
};

export default AllTouristBread;
