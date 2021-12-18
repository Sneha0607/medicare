import React, { useState, useEffect } from "react";
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
  const { currentUser } = useAuth();

  useEffect(() => {
    db.collection("doctors")
      .doc(currentUser.uid)
      .collection("appointments")
      .onSnapshot((snapshot) => {
        setAppointments(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  const handleVerify = () => {};

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
                  if (appointment.isConfirmed === "pending")
                    return (
                      <ListItem sx={{ border: "1px solid", margin: "2px" }}>
                        <Grid container>
                          <Grid item xs={12} sm={9}>
                            <Typography>
                              Mode: {appointment.mode} <br />
                              Slot: {appointment.slotStart} -{" "}
                              {appointment.slotEnd}
                              <br />
                              Symptoms: {appointment.symptoms}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <Button
                              variant="contained"
                              onClick={() => handleVerify()}
                            >
                              Verify
                            </Button>
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
