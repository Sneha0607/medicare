import React from "react";
import { Grid, Paper, Container } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../navbar";
import Form from "./form";
import Upload from "./upload";
import { container, paper } from "../styles";
import { upload } from "../../patient/styles";

const Doctor_Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <Grid container spacing={3}>
          {/* UPLOAD PROFILE IMAGE */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper sx={upload}>
              <Upload uid={currentUser.uid} />
            </Paper>
          </Grid>

          {/* FORM TO UPDATE DETAILS */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper sx={paper}>
              <Form uid={currentUser.uid} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Doctor_Dashboard;
