import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { Badge, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Notifications = () => {
  const [patients, setPatients] = useState([]);
  const { currentUser } = useAuth();

  // FETCHING PATIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("patients").onSnapshot((snapshot) => {
      setPatients(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <>
      {patients.map((patient) => {
        if (patient.uid === currentUser.uid)
          return (
            <Badge badgeContent={patient.unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          );
      })}
    </>
  );
};

export default Notifications;
