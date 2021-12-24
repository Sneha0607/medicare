import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./navbar";
import { db } from "../firebase";
import { Button, Container, List, ListItem, Typography } from "@mui/material";
import { container, listItem, typography } from "./styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

const Your_Patients = () => {
  const [patients, setPatients] = useState([]);
  const [yourPatients, setYourPatients] = useState([]);
  const { currentUser } = useAuth();

  // FETCHING DOCTOR'S DATA FROM DB
  useEffect(() => {
    db.collection("doctors")
      .doc(currentUser.uid)
      .collection("patients")
      .onSnapshot((snapshot) => {
        setYourPatients(snapshot.docs.map((doc) => doc.data()));
      });

    db.collection("patients").onSnapshot((snapshot) => {
      setPatients(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  console.log(yourPatients);
  console.log(patients);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <Typography variant="h4" align="center" sx={typography}>
          Your Patients
        </Typography>
        <List>
          {yourPatients.map((yourPatient) => {
            {
              patients.map((patient) => {
                if (yourPatient.patientUID === patient.uid)
                  return (
                    <ListItem sx={listItem} key={patient.uid}>
                      <Typography>{patient.name}</Typography>
                    </ListItem>
                  );
              });
            }
          })}
        </List>
      </Container>
    </>
  );
};

export default Your_Patients;
