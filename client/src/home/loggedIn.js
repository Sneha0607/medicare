import { Container, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React from "react";

const theme = createTheme();

const LoggedIn = () => {
  return (
    <>
      <Container
        sx={{
          mt: "12vh",
          ml: "5vw",
          minHeight: "100vh",
          [theme.breakpoints.down("md")]: {
            mt: "10vh",
            ml: "10vw",
            maxWidth: "95vw",
          },
          [theme.breakpoints.down("sm")]: {
            ml: "12vw",
            maxWidth: "80vw",
          },
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#063547" }}>
          Are you a patient? Click here to get redirected....
          <a href="/patient/dashboard">Patient</a>
        </Typography>
        <br />
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#063547" }}>
          Are you a doctor? Click here to get redirected....
          <a href="/doctor/dashboard">Doctor</a>
        </Typography>
      </Container>
    </>
  );
};

export default LoggedIn;
