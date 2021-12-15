import React from "react";
import { Grid, Paper, Container } from "@mui/material";
import Navbar from "../navbar";
import Form from "./form";
import Upload from "./upload";
import Records from "./records";

const Doctor_Dashboard = () => {
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
                height: "100vh",
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
                height: "100vh",
              }}
            >
              <Upload />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Doctor_Dashboard;
