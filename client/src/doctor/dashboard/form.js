import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Complete_Details from "./complete_details";
import Edit_Details from "./edit_details/edit_details";
import Title from "./title";

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
          if (doctor.isVerified === "false")
            return <Complete_Details uid={props.uid} />;
          else if (doctor.isVerified === "pending")
            return <Title>Verification is pending by Admin</Title>;
          else if (doctor.isVerified === "true")
            return <Edit_Details uid={props.uid} />;
        }
      })}
    </ThemeProvider>
  );
};

export default Form;
