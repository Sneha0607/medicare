import React from "react";
import { useLocation, useHistory } from "react-router";
import Navbar from "./navbar";
import { db } from "../firebase";

const Doctor = () => {
  const location = useLocation();
  const uid = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Doctor;
