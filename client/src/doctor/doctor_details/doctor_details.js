import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Alert,
  Button,
  Paper,
  Container,
  Box,
  CssBaseline,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";

const theme = createTheme();

const Doctor_Details = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [countryError, setCountryError] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError("");
    setAgeError();
    setGenderError("");
    setCityError("");
    setStateError("");
    setPincodeError();
    setCountryError("");

    if (name === "") {
      setNameError("Name is Required");
      return;
    }
    if (age === "") {
      setAgeError("Age is Required");
      return;
    }
    if (gender === "") {
      setGenderError("Gender is Required");
      return;
    }
    if (city === "") {
      setCityError("City is Required");
      return;
    }
    if (state === "") {
      setStateError("State is Required");
      return;
    }
    if (pincode === "") {
      setPincodeError("Pincode is Required");
      return;
    }
    if (country === "") {
      setCountryError("Country is Required");
      return;
    }

    //PUSHING USER DATA IN DATABASE

    history.push(`/doctor/profile/}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {nameError && <Alert severity="error">{nameError}</Alert>}
              {ageError && <Alert severity="error">{ageError}</Alert>}
              {genderError && <Alert severity="error">{genderError}</Alert>}
              {addressError && <Alert severity="error">{addressError}</Alert>}
              {cityError && <Alert severity="error">{cityError}</Alert>}
              {stateError && <Alert severity="error">{stateError}</Alert>}
              {countryError && <Alert severity="error">{countryError}</Alert>}
              {pincodeError && <Alert severity="error">{pincodeError}</Alert>}
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="Name"
                    name="Name"
                    label="Name"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setName(e.target.value)}
                    error={nameError}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="age"
                    name="age"
                    label="Age (in Years)"
                    fullWidth
                    autoComplete="age"
                    variant="standard"
                    onChange={(e) => setAge(e.target.value)}
                    error={ageError}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="gender"
                    name="gender"
                    label="Gender"
                    fullWidth
                    autoComplete="gender"
                    variant="standard"
                    onChange={(e) => setGender(e.target.value)}
                    error={genderError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete="shipping address-line1"
                    variant="standard"
                    onChange={(e) => setAddress(e.target.value)}
                    error={addressError}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="shipping address-level2"
                    variant="standard"
                    onChange={(e) => setCity(e.target.value)}
                    error={cityError}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setState(e.target.value)}
                    error={stateError}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="shipping postal-code"
                    variant="standard"
                    onChange={(e) => setPincode(e.target.value)}
                    error={pincodeError}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="shipping country"
                    variant="standard"
                    onChange={(e) => setCountry(e.target.value)}
                    error={countryError}
                  />
                </Grid>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Grid>
            </Box>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Doctor_Details;
