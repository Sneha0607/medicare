import React, { useState, useEffect } from "react";
import { Grid, Paper, Container } from "@mui/material";
import Navbar from "./navbar";
import { db } from "../firebase";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    db.collection("doctors").onSnapshot((snapshot) => {
      setDoctors(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: "12vh", ml: "5vw" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "100vh",
              }}
            ></Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Doctors;
