import React from "react";
import { Grid, Paper, Container } from "@mui/material";
import Navbar from "./navbar";
import { container, paper } from "./styles";

const Admin_Dashboard = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper sx={paper}>
              Doctor verification, Patient Verification? Answer to
              complaints/read feedbacks/chat, post news/updates for all users
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Paper sx={paper}></Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Admin_Dashboard;
