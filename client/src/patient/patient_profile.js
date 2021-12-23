import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { Avatar, Container, Grid, Paper, Typography } from "@mui/material";
import Title from "./patient_dashboard/title";
import { container, paper, avatar, upload } from "./styles";

const Patient_Profile = () => {
  const { currentUser } = useAuth();
  const [patients, setPatients] = useState([]);

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
          if (patient.uid === currentUser.uid)
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
                  <Paper sx={paper}>
                    <Title>Profile</Title>
                    <Typography sx={{ fontStyle: "italic" }}>
                      (You can update these details by going to the dashboard
                      tab)
                    </Typography>
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
                  </Paper>
                </Grid>
              </Grid>
            );
        })}
      </Container>
    </>
  );
};

export default Patient_Profile;
