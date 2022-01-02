import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Button,
  Grid,
  Box,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
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
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const handleStartTimeChange = (newValue) => {
    setStartTime(newValue);
  };

  const handleEndTimeChange = (newValue) => {
    setEndTime(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //PUSHING USER DATA IN DATABASE
    const doctorRef = db.doc(`doctors/${props.uid}`);
    doctorRef.set({
      uid: props.uid,
      name,
      medicalSpeciality,
      degree,
      yearOfReg,
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
      startTime: startTime,
      endTime: endTime,
      isVerified: "pending",
      unreadCount: 0,
      updatedAt: new Date(),
    });
  };

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Title>Complete/Edit Your Details</Title>
              <Typography variant="subtitle1" gutterBottom>
                Be careful while editing the important details!
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
              />
            </Grid>
            {/* EDIT START TIME */}
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Start-Time"
                  value={startTime}
                  onChange={handleStartTimeChange}
                  renderInput={(params) => (
                    <TextField
                      required
                      id="StartTime"
                      name="StartTime"
                      label="Start-Time"
                      fullWidth
                      size="small"
                      {...params}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            {/* EDIT END TIME */}
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="End-Time"
                  value={endTime}
                  onChange={handleEndTimeChange}
                  renderInput={(params) => (
                    <TextField
                      required
                      id="EndTime"
                      name="EndTime"
                      label="End-Time"
                      fullWidth
                      size="small"
                      {...params}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  )}
                />
              </LocalizationProvider>
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
