import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Notifications = () => {
  const [doctors, setDoctors] = useState([]);
  const { currentUser } = useAuth();

  // FETCHING PATIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("doctors").onSnapshot((snapshot) => {
      setDoctors(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <>
      {doctors.map((doctor) => {
        if (doctor.uid === currentUser.uid)
          return (
            <Badge badgeContent={doctor.unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          );
      })}
    </>
  );
};

export default Notifications;
