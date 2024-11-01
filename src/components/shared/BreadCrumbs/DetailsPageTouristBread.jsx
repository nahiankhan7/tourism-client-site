import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const DetailsPageTouristBread = () => {
  return (
    <nav aria-label="breadcrumb">
      <Breadcrumbs separator=">" aria-label="breadcrumb">
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          Home
        </Link>
        <Link
          component={RouterLink}
          to="/my-list"
          underline="hover"
          color="inherit">
          My List
        </Link>
        <Link
          component={RouterLink}
          to=""
          underline="hover"
          color="text.primary"
          aria-current="page">
          Tourist Spot Details
        </Link>
      </Breadcrumbs>
    </nav>
  );
};

export default DetailsPageTouristBread;
