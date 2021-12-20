import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

const Header = () => {
  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('images/home.jpg')`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {
        <img
          style={{ display: "none" }}
          src={process.env.PUBLIC_URL + "images/home.jpg"}
          alt="Medicare"
        />
      }
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
        }}
      />

      {/* Text above image */}
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
              sx={{
                fontFamily: "Raleway",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              "We are here for your care..."
            </Typography>
            <Typography
              variant="h5"
              color="inherit"
              paragraph
              sx={{ fontFamily: "Raleway" }}
            >
              Consult from the best doctors just by sitting at your home because
              we care for your health every moment
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Header;
