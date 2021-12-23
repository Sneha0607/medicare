import * as React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  box,
  description,
  aboutPaper,
  subtitle,
  raleway,
  headerBox,
} from "./styles";

const About = () => {
  return (
    <div id="about">
      <Typography
        component="h1"
        variant="h5"
        color="inherit"
        align="center"
        gutterBottom
        sx={description}
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
      <Paper sx={aboutPaper}>
        {/* Increase the priority of the hero background image */}
        {
          <img
            style={{ display: "none" }}
            src={process.env.PUBLIC_URL + "images/doctors.jpg"}
            alt="Doctors"
          />
        }
        <Box sx={box} />

        {/* Text above image */}
        <Grid container>
          <Grid item md={6}>
            <Box sx={headerBox}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
                sx={subtitle}
              >
                "Trusted Professionals"
              </Typography>
              <Typography variant="h5" color="inherit" paragraph sx={raleway}>
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
