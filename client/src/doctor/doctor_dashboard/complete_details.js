import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Alert,
  Button,
  Grid,
  Box,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { db } from "../../firebase";
import Title from "./title";

const theme = createTheme();

const Complete_Details = (props) => {
  const [name, setName] = useState("");
  const [medicalSpeciality, setMedicalSpeciality] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [degree, setDegree] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [yearOfReg, setYearOfReg] = useState("");
  const [stateMedicalCouncil, setStateMedicalCouncil] = useState("");
  const [experience, setExperience] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [nameError, setNameError] = useState("");
  const [medicalSpecialityError, setMedicalSpecialityError] = useState("");
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
    setMedicalSpeciality("");
    setAgeError();
    setGenderError("");
    setCityError("");
    setStateError("");
    setPincodeError();
    setCountryError("");

    //PUSHING USER DATA IN DATABASE
    const doctorRef = db.doc("doctors/props.uid");
    doctorRef.set({
      uid: props.uid,
      name,
      email: props.email,
      medicalSpeciality,
      age,
      regNumber,
      experience,
      stateMedicalCouncil,
      gender,
      address1,
      address2,
      city,
      state,
      country,
      pincode,
      imageURL: null,
      isVerified: "pending",
      updatedAt: new Date(),
    });

    history.push("/doctor/profile");
  };

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Title>Complete/Edit Your Details</Title>
              <Typography variant="subtitle1" gutterBottom>
                Changes will be reflected in your profile
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="Name"
                name="Name"
                label="Name"
                fullWidth
                size="small"
                onChange={(e) => setName(e.target.value)}
                error={nameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="Medical Speciality"
                name="Medical Speciality"
                label="Medical Speciality"
                fullWidth
                size="small"
                onChange={(e) => setMedicalSpeciality(e.target.value)}
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
                size="small"
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
                select
                autoComplete="gender"
                size="small"
                onChange={handleChangeGender}
                error={genderError}
              >
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="Degrees"
                name="Degrees"
                label="Degrees (separated by comma)"
                fullWidth
                size="small"
                onChange={(e) => setDegree(e.target.value)}
                error={ageError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="Registration Number"
                name="Registration Number"
                label="Registration Number"
                fullWidth
                size="small"
                onChange={(e) => setRegNumber(e.target.value)}
                error={ageError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="Year of Registration"
                name="Year of Registration"
                label="Year of Registration"
                fullWidth
                size="small"
                onChange={(e) => setYearOfReg(e.target.value)}
                error={ageError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="State Medical Council"
                name="State Medical Council"
                label="State Medical Council"
                fullWidth
                size="small"
                onChange={(e) => setStateMedicalCouncil(e.target.value)}
                error={ageError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="Experience"
                name="Experience"
                label="Experience (Years)"
                fullWidth
                size="small"
                onChange={(e) => setExperience(e.target.value)}
                error={ageError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Address Line 1"
                fullWidth
                autoComplete="shipping address-line1"
                size="small"
                onChange={(e) => setAddress1(e.target.value)}
                error={addressError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="address2"
                name="address2"
                label="Address Line 2"
                fullWidth
                autoComplete="shipping address-line2"
                size="small"
                onChange={(e) => setAddress2(e.target.value)}
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
                size="small"
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
                size="small"
                onChange={(e) => setState(e.target.value)}
                error={stateError}
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
                size="small"
                onChange={(e) => setCountry(e.target.value)}
                error={countryError}
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
                size="small"
                onChange={(e) => setPincode(e.target.value)}
                error={pincodeError}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </ThemeProvider>
  );
};

export default Complete_Details;
