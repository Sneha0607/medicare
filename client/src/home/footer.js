import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const Copyright = () => {
  return (
    <Typography
      variant="body2"
      color="#ffffff"
      align="center"
      sx={{ fontFamily: "Raleway" }}
    >
      {"Copyright © "} {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        backgroundColor: "#3284be",
        color: "#ffffff",
      }}
      id="contact"
    >
      {/* COPYRIGHT */}
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontFamily: "Raleway" }}
        >
          Medicare
        </Typography>
        <Copyright />
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ fontFamily: "Raleway" }}
        >
          Developed by Sneha Singh
        </Typography>

        <Grid container>
          {/* CONNECT WITH US */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ mt: 1, fontFamily: "Raleway", fontWeight: "bold" }}
            >
              Connect with us
            </Typography>

            <IconButton
              href="https://github.com/Sneha0607"
              sx={{ color: "#ffffff", "&:hover": { fontWeight: "bold" } }}
            >
              <GitHubIcon />
            </IconButton>

            <IconButton
              href="https://twitter.com/sneha_0607"
              sx={{ color: "#ffffff", "&:hover": { fontWeight: "bold" } }}
            >
              <TwitterIcon />
            </IconButton>

            <IconButton
              href="#"
              sx={{ color: "#ffffff", "&:hover": { fontWeight: "bold" } }}
            >
              <FacebookIcon />
            </IconButton>

            <Typography
              variant="h6"
              gutterBottom
              sx={{ mt: 1, fontFamily: "Raleway", fontWeight: "bold" }}
            >
              Go back to top
            </Typography>
            <IconButton
              href="#"
              sx={{ color: "#ffffff", "&:hover": { fontWeight: "bold" } }}
            >
              <ArrowUpwardIcon />
            </IconButton>
          </Grid>

          {/* CONTACTS */}
          <Grid xs={12} md={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ mt: 1, fontFamily: "Raleway", fontWeight: "bold" }}
            >
              Contact us
            </Typography>
            <IconButton
              href="#"
              sx={{ color: "#ffffff", "&:hover": { fontWeight: "bold" } }}
            >
              <EmailIcon />
              <Typography variant="body2">
                {" "}
                sneha.20198023@mnnit.ac.in{" "}
              </Typography>
            </IconButton>
            <IconButton
              href="#"
              sx={{ color: "#ffffff", "&:hover": { fontWeight: "bold" } }}
            >
              <PhoneIcon />
              <Typography variant="body2"> +91-9999 999 999 </Typography>
            </IconButton>
          </Grid>

          {/* NEWSLETTER SUBSCRIPTION */}
          <Grid>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ mt: 1, fontFamily: "Raleway", fontWeight: "bold" }}
            >
              Subscribe to our newsletter
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                sx={{
                  backgroundColor: "#ffffff",
                  fontFamily: "Raleway",
                }}
              />
              <Button
                type="submit"
                variant="contained"
                startIcon={<SendIcon />}
                sx={{
                  color: "#3284be",
                  backgroundColor: "#ffffff",
                  fontFamily: "Raleway",
                  fontWeight: "bold",
                }}
              >
                Send
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
