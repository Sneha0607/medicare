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
  const [timeSlot, setTimeSlot] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const { currentUser } = useAuth();

  const handleClickOpen = () => {
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

    //PUSHING APPOINTMENT DATA IN DB
    db.collection("appointments").add({
      mode: mode,
      timeSlot: timeSlot,
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
      <Button variant="contained" onClick={() => handleClickOpen()}>
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
        <form onSubmit={(e) => handleSubmit()}>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <Grid container spacing={1}>
                {/* MODE OF CONSULTATION */}
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

                {/* DATE AND TIME SLOT */}
                <Grid item xs={12}>
                  <Typography>Preferred Date and Time Slot </Typography>
                </Grid>

                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDateTimePicker
                      value={timeSlot}
                      onChange={(newValue) => {
                        setTimeSlot(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          required
                          id="timeSlot"
                          name="timeSlot"
                          fullWidth
                          size="small"
                          onChange={(e) => setTimeSlot(e.target.value)}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                {/* SYMPTOMS */}
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
            <Button onClick={() => handleClose()}>Cancel</Button>
            <Button type="submit">Book</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Book_Appointment;
