import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { container, listItem, typography } from "./styles";

const Patient_Scheduled_Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    db.collection("meetings")
      .orderBy("scheduledAt", "desc")
      .onSnapshot((snapshot) => {
        setMeetings(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <Typography align="center" variant="h4" sx={typography}>
          Your Scheduled Appointments
        </Typography>
        <List>
          {meetings.map((meeting) => {
            if (meeting.patientUID === currentUser.uid)
              return (
                <ListItem sx={listItem}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={9}>
                      <Typography>
                        Meeting ID: {meeting.meetingID} <br />
                        Scheduled At:{" "}
                        {new Date(
                          meeting.scheduledAt.seconds * 1000
                        ).toLocaleDateString("en-US")}
                        ,
                        {new Date(
                          meeting.scheduledAt.seconds * 1000
                        ).getHours()}
                        :
                        {new Date(
                          meeting.scheduledAt.seconds * 1000
                        ).getMinutes()}
                        <br />
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Button
                        variant="contained"
                        target="_blank"
                        href={`/patient/room/${meeting.meetingID}`}
                      >
                        Join
                      </Button>
                    </Grid>
                  </Grid>
                </ListItem>
              );
          })}
        </List>
      </Container>
    </>
  );
};

export default Patient_Scheduled_Meetings;
