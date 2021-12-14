import React from "react";
import { Grid, Paper, Container } from "@mui/material";
import Navbar from "../navbar";
import Form from "./form";
import Deposits from "./Deposits";
import Records from "./records";

const Patient_Dashboard = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: "12vh", ml: "5vw" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Form />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Deposits />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Patient_Dashboard;
