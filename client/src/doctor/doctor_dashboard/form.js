import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Complete_Details from "./complete_details";
import { Typography } from "@mui/material";

const theme = createTheme();

const Form = (props) => {
  const [doctors, setDoctors] = useState([]);

  // FETCHING DOCTOR'S DATA FROM DB
  useEffect(() => {
    db.collection("doctors").onSnapshot((snapshot) => {
      setDoctors(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {doctors.map((doctor) => {
        if (doctor.uid === props.uid) {
          if (doctor.isVerified === "false") return <Complete_Details />;
          else if (doctor.isVerified === "pending")
            return <Typography>Verification is pending by Admin</Typography>;
          else if (doctor.isVerified === "true")
            return <Typography>Your profile has been verified!</Typography>;
        }
      })}
    </ThemeProvider>
  );
};

export default Form;
