import React, { useState, useEffect, useRef } from "react";
import Navbar from "./navbar";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDateTimePicker from "@mui/lab/DesktopDateTimePicker";

const Book_Appointment = (props) => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("");
  const [mode, setMode] = useState("");
  const [slotStart, setSlotStart] = useState("");
  const [slotEnd, setSlotEnd] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const { currentUser } = useAuth();

  const handleClickOpen = () => () => {
    setOpen(true);
    setScroll("paper");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //PUSHING APPOINTMENT DATA IN PATIENT'S COLLECTION
    db.collection("patients")
      .doc(currentUser.uid)
      .collection("appointments")
      .add({
        mode: mode,
        slotStart: slotStart,
        slotEnd: slotEnd,
        symptoms: symptoms,
        isConfirmed: "pending",
        doctorUID: props.doctorUID,
        bookedAt: new Date(),
      });

    //PUSHING APPOINTMENT DATA IN DOCTOR'S COLLECTION
    db.collection("doctors")
      .doc(props.doctorUID)
      .collection("appointments")
      .add({
        mode: mode,
        slotStart: slotStart,
        slotEnd: slotEnd,
        symptoms: symptoms,
        isConfirmed: "pending",
        patientUID: currentUser.uid,
        bookedAt: new Date(),
      });

    //PUSHING APPOINTMENT DATA IN DB
    db.collection("appointments").add({
      mode: mode,
      slotStart: slotStart,
      slotEnd: slotEnd,
      symptoms: symptoms,
      isConfirmed: "pending",
      doctorUID: props.doctorUID,
      patientUID: currentUser.uid,
      bookedAt: new Date(),
    });

    setOpen(false);
  };

  return (
    <>
      <Navbar />
      <Button variant="contained" onClick={handleClickOpen()}>
        Book Appointment
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps={{ sx: { position: "fixed", top: 0, m: 0 } }}
      >
        <DialogTitle id="scroll-dialog-title">Book Appointment</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="mode"
                    name="mode"
                    label="Mode of Consultation"
                    fullWidth
                    size="small"
                    select
                    onChange={(e) => setMode(e.target.value)}
                  >
                    <MenuItem value="Online">Online</MenuItem>
                    <MenuItem value="Offline">Offline</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Enter Preferred Time Slot (From - To)</Typography>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDateTimePicker
                      value={slotStart}
                      size="small"
                      onChange={(newValue) => {
                        setSlotStart(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          required
                          id="slotStartTime"
                          name="slotStartTime"
                          fullWidth
                          size="small"
                          onChange={(e) => setSlotStart(e.target.value)}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDateTimePicker
                      value={slotEnd}
                      size="small"
                      onChange={(newValue) => {
                        setSlotEnd(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          required
                          id="slotEndTime"
                          name="slotEndTime"
                          fullWidth
                          size="small"
                          onChange={(e) => setSlotEnd(e.target.value)}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="symptoms"
                    name="symptoms"
                    label="Symptoms"
                    fullWidth
                    size="small"
                    onChange={(e) => setSymptoms(e.target.value)}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleClose}>
              Book
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Book_Appointment;
