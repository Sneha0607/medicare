import * as React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

const About = () => {
  return (
    <div id="about">
      <Typography
        component="h1"
        variant="h5"
        color="inherit"
        align="center"
        gutterBottom
        sx={{
          fontFamily: "Raleway",
          marginBottom: "3vh",
        }}
      >
        Medicare is for those people who don't want to wait in long queues to
        book an appointment with one of the best doctors nearby and also for
        those doctors who wish to consult their patients at their own
        convenience.
        <br />
        <i>
          <b> Let's together bring a change in the medical industry!</b>
        </i>
      </Typography>
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: 4,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url('images/doctors.jpg')`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {
          <img
            style={{ display: "none" }}
            src={process.env.PUBLIC_URL + "images/doctors.jpg"}
            alt="Doctors"
          />
        }
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.3)",
          }}
        />

        {/* Text above image */}
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: "relative",
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
                sx={{
                  fontFamily: "Raleway",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                "Trusted Professionals"
              </Typography>
              <Typography
                variant="h5"
                color="inherit"
                paragraph
                sx={{ fontFamily: "Raleway" }}
              >
                Consult one of the best doctors just by a click!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default About;
