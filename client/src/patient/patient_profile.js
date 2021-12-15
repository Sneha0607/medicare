import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { Container, Grid, Paper, Typography } from "@mui/material";
import Title from "./patient_dashboard/title";

const Patient_Profile = () => {
  const { currentUser } = useAuth();
  const [patients, setPatients] = useState([]);

  // FETCHING PATIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("patients").onSnapshot((snapshot) => {
      setPatients(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  console.log(patients);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: "12vh", ml: "5vw" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Title>Profile</Title>
              {patients.map((patient) => {
                if (patient.uid === currentUser.uid)
                  return (
                    <>
                      <Typography>Name: {patient.name}</Typography>
                      <Typography>Age: {patient.age}</Typography>
                      <Typography>Gender: {patient.gender}</Typography>
                      <Typography>Blood Group: {patient.bloodGroup}</Typography>
                      <Typography>
                        Address: {patient.address1}, {patient.address2}
                      </Typography>
                      <Typography>City: {patient.city}</Typography>
                      <Typography>State: {patient.state}</Typography>
                      <Typography>Country: {patient.country}</Typography>
                      <Typography>Pincode: {patient.pincode}</Typography>
                    </>
                  );
              })}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Patient_Profile;
