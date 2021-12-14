import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { Container, Grid, Paper, Typography } from "@mui/material";
import Title from "./doctor_dashboard/Title";

const Doctor_Profile = () => {
  const { currentUser } = useAuth();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    db.collection("doctors").onSnapshot((snapshot) => {
      setDoctors(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  console.log(doctors);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: "12vh", ml: "5vw" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Title>Profile</Title>
              {doctors.map((doctor) => {
                if (doctor.uid === currentUser.uid)
                  return (
                    <>
                      <Typography>Name: {doctor.name}</Typography>
                      <Typography>Age: {doctor.age}</Typography>
                      <Typography>Gender: {doctor.gender}</Typography>
                      <Typography>Address: {doctor.address}</Typography>
                      <Typography>{doctor.city}</Typography>
                      <Typography>{doctor.state}</Typography>
                      <Typography>{doctor.country}</Typography>
                      <Typography>{doctor.pincode}</Typography>
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

export default Doctor_Profile;
