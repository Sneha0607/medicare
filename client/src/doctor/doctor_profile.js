import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { Container, Grid, Paper, Typography } from "@mui/material";
import Title from "./doctor_dashboard/title";

const Doctor_Profile = () => {
  const { currentUser } = useAuth();
  const [doctors, setDoctors] = useState([]);

  // FETCH DOCTOR'S DATA FROM DB
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
              <Typography sx={{ fontStyle: "italic" }}>
                (You can update these details by going to the dashboard tab)
              </Typography>
              <br />
              {doctors.map((doctor) => {
                if (doctor.uid === currentUser.uid)
                  return (
                    <>
                      <Typography>Name: {doctor.name}</Typography>
                      <Typography>
                        Medical Speciality: {doctor.medicalSpeciality}
                      </Typography>
                      <Typography>
                        Experience: {doctor.experience} years
                      </Typography>
                      <Typography>Age: {doctor.age}</Typography>
                      <Typography>Gender: {doctor.gender}</Typography>
                      <Typography>Degree: {doctor.degree}</Typography>
                      <Typography>
                        Address: {doctor.address1}, {doctor.address2}
                      </Typography>
                      <Typography>City: {doctor.city}</Typography>
                      <Typography>State: {doctor.state}</Typography>
                      <Typography>Country: {doctor.country}</Typography>
                      <Typography>Pincode: {doctor.pincode}</Typography>
                      <Typography>
                        Last updated at:{" "}
                        {new Date(
                          doctor.updatedAt.seconds * 1000
                        ).toLocaleDateString("en-US")}
                        , at{" "}
                        {new Date(doctor.updatedAt.seconds * 1000).getHours()}:
                        {new Date(doctor.updatedAt.seconds * 1000).getMinutes()}{" "}
                        hrs
                      </Typography>
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
