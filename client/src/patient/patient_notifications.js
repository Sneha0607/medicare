import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./navbar";
import { db } from "../firebase";
import { Container, List, ListItem, Typography } from "@mui/material";
import { container, listItem } from "./styles";

const Patient_Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { currentUser } = useAuth();

  // FETCHING PATIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("patients")
      .doc(currentUser.uid)
      .collection("notifications")
      .orderBy("sentAt", "desc")
      .onSnapshot((snapshot) => {
        setNotifications(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <List>
          {notifications.map((notification) => {
            return (
              <ListItem sx={listItem}>
                <Typography>
                  {notification.message} <br />{" "}
                  {new Date(
                    notification.sentAt.seconds * 1000
                  ).toLocaleDateString("en-US")}
                  ,{new Date(notification.sentAt.seconds * 1000).getHours()}:
                  {new Date(notification.sentAt.seconds * 1000).getMinutes()}
                  <br />
                </Typography>
              </ListItem>
            );
          })}
        </List>
      </Container>
    </>
  );
};

export default Patient_Notifications;
