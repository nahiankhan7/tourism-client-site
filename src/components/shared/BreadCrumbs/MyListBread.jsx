import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const MyListBread = () => {
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
          color="text.primary"
          aria-current="page">
          My List
        </Link>
      </Breadcrumbs>
    </nav>
  );
};

export default MyListBread;
