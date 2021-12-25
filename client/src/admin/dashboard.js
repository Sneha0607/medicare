import React from "react";
import { Grid, Paper, Container, Typography } from "@mui/material";
import Navbar from "./navbar";
import { container, paper, typography } from "./styles";

const Admin_Dashboard = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" sx={typography}>
              ADMIN DASHBOARD
            </Typography>
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Paper sx={paper}>
              <Typography>
                Your job is to: verify doctors by visiting the National Medical
                Council Page, keep a check on patients, create new posts/updates
                for all users, read feedbacks and respond to them!
              </Typography>
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
