import * as React from "react";
import {
  Button,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const Register = () => {
  return (
    <Grid container spacing={4} id="register">
      {/* REGISTER AS DOCTOR */}
      <Grid item xs={12} md={6}>
        <CardActionArea component="a" href="#">
          <Card sx={{ display: "flex" }}>
            <CardContent sx={{ flex: 1, fontFamily: "Raleway" }}>
              <Typography
                component="h1"
                variant="h4"
                sx={{ fontFamily: "Raleway", fontWeight: "bold" }}
              >
                Register as a Doctor
              </Typography>
              <Typography variant="h5" paragraph sx={{ fontFamily: "Raleway" }}>
                Sign Up to provide consultations to patients
              </Typography>
              <Button
                sx={{
                  backgroundColor: "#3284be",
                  color: "#ffffff",
                  margin: "1%",
                  fontFamily: "Raleway",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#d7e8f4",
                    color: "#3284be",
                  },
                }}
                href="/doctor_signup"
              >
                Sign Up
              </Button>

              <Button
                sx={{
                  backgroundColor: "#3284be",
                  color: "#ffffff",
                  margin: "1%",
                  fontFamily: "Raleway",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#d7e8f4",
                    color: "#3284be",
                  },
                }}
                href="/doctor_signin"
              >
                Sign In
              </Button>
            </CardContent>

            {/* Image */}
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: "none", sm: "block" } }}
              image="images/doctor.jpg"
              alt="Doctor"
            />
          </Card>
        </CardActionArea>
      </Grid>

      {/* REGISTER AS PATIENT */}
      <Grid item xs={12} md={6}>
        <CardActionArea component="a" href="#">
          <Card sx={{ display: "flex" }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography
                component="h1"
                variant="h4"
                sx={{ fontFamily: "Raleway", fontWeight: "bold" }}
              >
                Register as a Patient
              </Typography>
              <Typography variant="h5" paragraph sx={{ fontFamily: "Raleway" }}>
                Sign Up to book appointments with doctors
              </Typography>
              <Button
                sx={{
                  backgroundColor: "#3284be",
                  color: "#ffffff",
                  margin: "1%",
                  fontFamily: "Raleway",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#d7e8f4",
                    color: "#3284be",
                  },
                }}
                href="/patient_signup"
              >
                Sign Up
              </Button>

              <Button
                sx={{
                  backgroundColor: "#3284be",
                  color: "#ffffff",
                  margin: "1%",
                  fontFamily: "Raleway",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#d7e8f4",
                    color: "#3284be",
                  },
                }}
                href="/patient_signin"
              >
                Sign In
              </Button>
            </CardContent>

            {/* Image */}
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: "none", sm: "block" } }}
              image="images/patient.jpg"
              alt="Patient"
            />
          </Card>
        </CardActionArea>
      </Grid>

      {/* ADMIN LOGIN */}
      <Grid item xs={12}>
        <CardActionArea component="a" href="#">
          <Card sx={{ display: "flex" }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography
                component="h1"
                variant="h4"
                sx={{ fontFamily: "Raleway", fontWeight: "bold" }}
              >
                Sign in as an Admin
              </Typography>
              <Typography variant="h5" paragraph sx={{ fontFamily: "Raleway" }}>
                Only verified admins of Medicare can login using the email ID
                provided to them
              </Typography>

              <Button
                sx={{
                  backgroundColor: "#3284be",
                  color: "#ffffff",
                  margin: "1%",
                  fontFamily: "Raleway",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#d7e8f4",
                    color: "#3284be",
                  },
                }}
                href="/admin_signin"
              >
                Sign In
              </Button>
            </CardContent>

            {/* Image */}
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: "none", sm: "block" } }}
              image="images/admin.jpg"
              alt="Admin"
            />
          </Card>
        </CardActionArea>
      </Grid>
    </Grid>
  );
};

export default Register;
