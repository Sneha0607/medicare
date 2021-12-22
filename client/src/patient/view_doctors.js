import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { db } from "../firebase";
import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { container, listItem } from "./styles";

const View_Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  // FETCHING PATIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("doctors").onSnapshot((snapshot) => {
      setDoctors(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <List>
          {doctors.map((doctor) => {
            if (doctor.isVerified === "true")
              return (
                <ListItem sx={listItem}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                      <Typography>
                        {doctor.name} <br />
                        <p>{doctor.medicalSpeciality}</p>
                        {doctor.experience}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button
                        variant="contained"
                        href={`/doctor_profile/${doctor.uid}`}
                        target="_blank"
                      >
                        See more details
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

export default View_Doctors;
