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
        <List>
          {doctors.map((doctor) => {
            if (doctor.isVerified === "true")
              return (
                <ListItem sx={{ border: "1px solid", margin: "2px" }}>
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
