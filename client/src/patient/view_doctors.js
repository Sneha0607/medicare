import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { db } from "../firebase";
import {
  Avatar,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { container, listItem, typography } from "./styles";
import Title from "./patient_dashboard/title";

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
        <Typography align="center" variant="h4" sx={typography}>
          Book Appointment with any Doctor - Click on See More
        </Typography>
        <List>
          {doctors.map((doctor) => {
            if (doctor.isVerified === "true")
              return (
                <ListItem sx={listItem}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={3} md={3}>
                      <Avatar
                        alt="Doctor_Profile_Image"
                        src={`${doctor.imageURL}`}
                        sx={{
                          width: 100,
                          height: 100,
                          border: "1px solid #08475e",
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <Title>
                        {doctor.name} <br />
                        {doctor.medicalSpeciality}
                      </Title>
                    </Grid>

                    <Grid item xs={12} sm={3} md={3}>
                      <Button
                        variant="contained"
                        href={`/doctor_profile/${doctor.uid}`}
                        target="_blank"
                      >
                        See more
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
