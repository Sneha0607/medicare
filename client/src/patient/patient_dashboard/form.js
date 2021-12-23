import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Complete_Details from "./complete_details";
import { Typography } from "@mui/material";
import Edit_Details from "./edit_details/edit_details";

const theme = createTheme();

const Form = (props) => {
  const [patients, setPatients] = useState([]);

  // FETCHING PATIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("patients").onSnapshot((snapshot) => {
      setPatients(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {patients.map((patient) => {
        if (patient.uid === props.uid) {
          if (patient.isVerified === "false")
            return <Complete_Details uid={props.uid} />;
          else if (patient.isVerified === "true")
            return <Edit_Details uid={props.uid} />;
        }
      })}
    </ThemeProvider>
  );
};

export default Form;
