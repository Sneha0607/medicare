import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Container,
  Typography,
  ListItem,
  List,
  Button,
} from "@mui/material";
import Navbar from "./navbar";
import { db } from "../firebase";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    db.collection("doctors").onSnapshot((snapshot) => {
      setDoctors(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  const handleVerify = (uid) => {
    db.collection("doctors").doc(uid).update({
      isVerified: "true",
    });
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: "12vh", ml: "5vw" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography>Unverified Doctors</Typography>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <List>
                {doctors.map((doctor) => {
                  if (doctor.isVerified === "pending")
                    return (
                      <ListItem sx={{ border: "1px solid", margin: "2px" }}>
                        <Grid container>
                          <Grid item xs={12} sm={9}>
                            <Typography>
                              Name: {doctor.name} <br />
                              Age: {doctor.age} <br />
                              Gender: {doctor.gender} <br />
                              Blood Group: {doctor.bloodGroup}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <Button
                              variant="contained"
                              onClick={() => handleVerify(doctor.uid)}
                            >
                              Verify
                            </Button>
                          </Grid>
                        </Grid>
                      </ListItem>
                    );
                })}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography>Verified Doctors</Typography>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <List>
                {doctors.map((doctor) => {
                  if (doctor.isVerified == "true")
                    return (
                      <ListItem sx={{ border: "1px solid", margin: "2px" }}>
                        <Grid container>
                          <Grid item xs={12} sm={9}>
                            <Typography>
                              Name: {doctor.name} <br />
                              Age: {doctor.age} <br />
                              Gender: {doctor.gender} <br />
                              Blood Group: {doctor.bloodGroup}
                            </Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                    );
                })}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Doctors;
