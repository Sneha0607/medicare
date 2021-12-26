import React, { useState, useEffect, useRef } from "react";
import { db } from "../../../firebase";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  TextField,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import EditIcon from "@mui/icons-material/Edit";

const TimeSlot = (props) => {
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStartTimeChange = (newValue) => {
    setStartTime(newValue);
  };

  const handleEndTimeChange = (newValue) => {
    setEndTime(newValue);
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
    db.collection("doctors").doc(props.uid).update({
      startTime: startTime,
      endTime: endTime,
      updatedAt: new Date(),
    });
    setOpen(false);
  };

  return (
    <>
      <Button startIcon={<EditIcon />} onClick={handleClickOpen}></Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { position: "fixed", top: 0, m: 0 } }}
      >
        <DialogTitle>Edit TimeSlot</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
              <Grid container spacing={1}>
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
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Edit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default TimeSlot;
