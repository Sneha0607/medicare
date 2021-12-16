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

const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    db.collection("patients").onSnapshot((snapshot) => {
      setPatients(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  const handleVerify = (uid) => {
    db.collection("patients").doc(uid).update({
      isVerified: "true",
    });
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: "12vh", ml: "5vw" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography>Unverified Patients</Typography>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <List>
                {patients.map((patient) => {
                  if (patient.isVerified === "pending")
                    return (
                      <ListItem sx={{ border: "1px solid", margin: "2px" }}>
                        <Grid container>
                          <Grid item xs={12} sm={9}>
                            <Typography>
                              Name: {patient.name} <br />
                              Age: {patient.age} <br />
                              Gender: {patient.gender} <br />
                              Blood Group: {patient.bloodGroup}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <Button
                              variant="contained"
                              onClick={() => handleVerify(patient.uid)}
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
            <Typography>Verified Patients</Typography>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <List>
                {patients.map((patient) => {
                  if (patient.isVerified == "true")
                    return (
                      <ListItem sx={{ border: "1px solid", margin: "2px" }}>
                        <Grid container>
                          <Grid item xs={12} sm={9}>
                            <Typography>
                              Name: {patient.name} <br />
                              Age: {patient.age} <br />
                              Gender: {patient.gender} <br />
                              Blood Group: {patient.bloodGroup}
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

export default Patients;
