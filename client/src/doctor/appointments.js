import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./navbar";
import { useAuth } from "../contexts/AuthContext";
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  Button,
} from "@mui/material";
import { db } from "../firebase";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const history = useHistory();
  const { currentUser } = useAuth();

  useEffect(() => {
    db.collection("appointments")
      .orderBy("timeSlot", "asc")
      .onSnapshot((snapshot) => {
        setAppointments(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
  }, []);

  const handleConfirm = (id) => {
    db.collection("appointments").doc(id).update({
      isConfirmed: "true",
    });

    history.push("/doctor/schedule_meeting");
  };

  const handleCancel = (id) => {
    db.collection("appointments").doc(id).update({
      isConfirmed: "false",
    });
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: "12vh", ml: "5vw" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography>New Appointments</Typography>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <List>
                {appointments.map((appointment) => {
                  if (
                    appointment.isConfirmed === "pending" &&
                    appointment.doctorUID === currentUser.uid
                  )
                    return (
                      <ListItem sx={{ border: "1px solid", margin: "2px" }}>
                        <Grid container>
                          <Grid item xs={12} sm={9}>
                            <Typography>
                              Mode: {appointment.mode} <br />
                              Slot:{" "}
                              {new Date(
                                appointment.timeSlot.seconds * 1000
                              ).toLocaleDateString("en-US")}
                              ,
                              {new Date(
                                appointment.timeSlot.seconds * 1000
                              ).getHours()}
                              :
                              {new Date(
                                appointment.timeSlot.seconds * 1000
                              ).getMinutes()}
                              <br />
                              Symptoms: {appointment.symptoms}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <Button
                              variant="contained"
                              onClick={() => handleConfirm(appointment.id)}
                            >
                              Confirm
                            </Button>

                            <Button
                              variant="contained"
                              onClick={() => handleCancel(appointment.id)}
                            >
                              Cancel
                            </Button>
                          </Grid>
                        </Grid>
                      </ListItem>
                    );
                })}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Typography>Confirmed Appointments</Typography>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <List>
                {appointments.map((appointment) => {
                  if (
                    appointment.isConfirmed === "true" &&
                    appointment.doctorUID === currentUser.uid
                  )
                    return (
                      <ListItem sx={{ border: "1px solid", margin: "2px" }}>
                        <Grid container>
                          <Grid item xs={12} sm={9}>
                            <Typography>
                              Mode: {appointment.mode} <br />
                              Slot:{" "}
                              {new Date(
                                appointment.timeSlot.seconds * 1000
                              ).toLocaleDateString("en-US")}
                              ,
                              {new Date(
                                appointment.timeSlot.seconds * 1000
                              ).getHours()}
                              :
                              {new Date(
                                appointment.timeSlot.seconds * 1000
                              ).getMinutes()}
                              <br />
                              Symptoms: {appointment.symptoms}
                            </Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                    );
                })}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Appointments;
