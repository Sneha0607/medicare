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
  ButtonGroup,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { db } from "../firebase";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const theme = createTheme();

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

  const handleConfirm = (docID, patientUID) => {
    db.collection("appointments").doc(docID).update({
      isConfirmed: "true",
    });

    db.collection("meetings").doc(docID).set({});

    db.collection("patients").doc(patientUID).collection("notifications").add({
      message:
        "Your appointment has been confirmed! You can check its details in the scheduled meetings section.",
      sentAt: new Date(),
    });

    history.push("/doctor/schedule_meeting");
  };

  const handleCancel = (docID, patientUID) => {
    db.collection("appointments").doc(docID).update({
      isConfirmed: "false",
    });

    db.collection("patients").doc(patientUID).collection("notifications").add({
      message: "Your appointment has been cancelled!",
      sentAt: new Date(),
    });
  };

  return (
    <>
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          mt: "12vh",
          ml: "5vw",
          height: "100vh",
          backgroundImage: `url('../images/blue2.jpg')`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
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
                          <Grid item xs={12} sm={6} md={9}>
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

                          <Grid item xs={12} sm={6} md={3}>
                            <ButtonGroup
                              variant="contained"
                              sx={{
                                [theme.breakpoints.down("md")]: {
                                  size: "small",
                                },
                              }}
                            >
                              <div
                                onClick={(e) =>
                                  db.doc(`meetings/${appointment.id}`).set({
                                    meetingID: appointment.id,
                                    doctorUID: appointment.doctorUID,
                                    patientUID: appointment.patientUID,
                                    scheduledAt: appointment.timeSlot,
                                    mode: appointment.mode,
                                  })
                                }
                              >
                                <Button
                                  startIcon={<DoneIcon />}
                                  sx={{
                                    backgroundColor: "#009900",
                                    "&:hover": {
                                      backgroundColor: "#006600",
                                    },
                                  }}
                                  onClick={() =>
                                    handleConfirm(
                                      appointment.id,
                                      appointment.patientUID
                                    )
                                  }
                                >
                                  Confirm
                                </Button>
                              </div>

                              <Button
                                startIcon={<CloseIcon />}
                                sx={{
                                  backgroundColor: "#e60000",
                                  "&:hover": {
                                    backgroundColor: "#b30000",
                                  },
                                }}
                                onClick={() =>
                                  handleCancel(
                                    appointment.id,
                                    appointment.patientUID
                                  )
                                }
                              >
                                Cancel
                              </Button>
                            </ButtonGroup>
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
