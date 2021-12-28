import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./navbar";
import { db } from "../firebase";
import { Avatar, Container, Grid, Paper, Typography } from "@mui/material";
import Title from "./dashboard/title";
import { container, paper, avatar, upload } from "./styles";
import BPGraph from "./bpGraph";
import WeightGraph from "./weightGraph";
import Past_Appointments from "./past_appointments";

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const { currentUser } = useAuth();

  const location = useLocation();
  const uid = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  // FETCHING PATIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("patients").onSnapshot((snapshot) => {
      setPatients(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        {patients.map((patient) => {
          if (patient.uid === uid)
            return (
              <Grid container spacing={3}>
                {/* PATIENT'S PROFILE IMAGE */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper sx={upload}>
                    <Title>{patient.name}</Title>
                    <Avatar
                      alt="Patient_Profile_Image"
                      src={`${patient.imageURL}`}
                      sx={avatar}
                    />
                  </Paper>
                </Grid>

                {/* PATIENT'S PROFILE */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      height: "100%",
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Title>Profile</Title>
                    <Typography>Name: {patient.name}</Typography>
                    <Typography>Age: {patient.age}</Typography>
                    <Typography>Gender: {patient.gender}</Typography>
                    <Typography>Blood Group: {patient.bloodGroup}</Typography>
                    <Typography>
                      Address: {patient.address1}, {patient.address2},{" "}
                      {patient.city}, {patient.state}, {patient.country},{" "}
                      {patient.pincode}
                    </Typography>
                  </Paper>
                </Grid>

                {/* GRAPHS */}
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 275,
                    }}
                  >
                    <BPGraph uid={patient.uid} />
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 275,
                    }}
                  >
                    <WeightGraph uid={patient.uid} />
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper sx={paper}>
                    <Past_Appointments
                      patientUID={patient.uid}
                      doctorUID={currentUser.uid}
                    />
                  </Paper>
                </Grid>
              </Grid>
            );
        })}
      </Container>
    </>
  );
};

export default Patient;
