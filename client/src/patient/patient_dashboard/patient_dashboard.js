import React from "react";
import { Grid, Paper, Container } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../navbar";
import Form from "./form";
import Upload from "./upload";

const Patient_Dashboard = () => {
  const { currentUser } = useAuth();

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
        <Grid container spacing={3}>
          {/* UPLOAD PROFILE PICTURE */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Upload uid={currentUser.uid} />
            </Paper>
          </Grid>

          {/* UPDATE DETAILS */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Form uid={currentUser.uid} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Patient_Dashboard;
