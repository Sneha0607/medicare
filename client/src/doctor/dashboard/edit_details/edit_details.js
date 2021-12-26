import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";
import Title from "../title";
import Age from "./age";
import Address from "./address";
import Degree from "./degree";
import Experience from "./experience";
import TimeSlot from "./timeSlot";

const theme = createTheme();

const Edit_Details = (props) => {
  const [doctors, setDoctors] = useState([]);

  // FETCHING PATIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("doctors").onSnapshot((snapshot) => {
      setDoctors(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {doctors.map((doctor) => {
          if (doctor.uid === props.uid)
            return (
              <Grid container spacing={1} key={doctor.uid}>
                <Grid item xs={12}>
                  <Title>Your Profile has been verified!</Title>
                  <Typography variant="subtitle2" gutterBottom>
                    (You can still edit your details)
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography>Name: {doctor.name}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography>Gender: {doctor.gender}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography>
                    Medical Speciality: {doctor.medicalSpeciality}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>
                        Experience: {doctor.experience} years
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Experience uid={doctor.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>Age: {doctor.age} years</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Age uid={doctor.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>Degree: {doctor.degree}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Degree uid={doctor.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>
                        Address: {doctor.address1}, {doctor.address2},
                        <br />
                        {doctor.city}, {doctor.state}, {doctor.country},{" "}
                        {doctor.pincode}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Address uid={doctor.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>
                        Time Slot :{" "}
                        {new Date(doctor.startTime.seconds * 1000).getHours()}:
                        {new Date(doctor.startTime.seconds * 1000).getMinutes()}
                        0 - {new Date(doctor.endTime.seconds * 1000).getHours()}
                        :{new Date(doctor.endTime.seconds * 1000).getMinutes()}0
                        hrs
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <TimeSlot uid={doctor.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <br />
                <Grid item xs={12}>
                  <Typography variant="subtitle2">
                    Last updated at:
                    {new Date(
                      doctor.updatedAt.seconds * 1000
                    ).toLocaleDateString("en-US")}
                    ,{new Date(doctor.updatedAt.seconds * 1000).getHours()}:
                    {new Date(doctor.updatedAt.seconds * 1000).getMinutes()}
                  </Typography>
                </Grid>
              </Grid>
            );
        })}
      </Box>
    </ThemeProvider>
  );
};
export default Edit_Details;
