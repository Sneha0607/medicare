import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { db } from "../firebase";
import { Container, List, ListItem, Typography } from "@mui/material";

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
      <Container maxWidth="lg" sx={{ mt: "12vh", ml: "5vw" }}>
        <List>
          {doctors.map((doctor) => {
            return (
              <ListItem>
                <Typography>
                  {doctor.name} <br />
                  <p>{doctor.medicalSpeciality}</p>
                  {doctor.experience}
                  <br />
                  <a href={`/doctor_profile/${doctor.uid}`} target="_blank">
                    See more details
                  </a>
                </Typography>
              </ListItem>
            );
          })}
        </List>
      </Container>
    </>
  );
};

export default View_Doctors;
