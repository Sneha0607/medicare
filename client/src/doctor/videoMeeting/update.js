import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import {
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  DialogTitle,
  Divider,
  Tooltip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

const Update = (props) => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const [sugarLevel, setSugarLevel] = useState("");
  const [weight, setWeight] = useState("");

  //FUNCTIONS TO OPEN AND CLOSE DIALOG BOX
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //SEND PRESCRIPTION FUNCTION
  const updateReports = (e) => {
    e.preventDefault();

    //PUSHING BP DATA IN DATABASE
    db.collection("patients")
      .doc(`${props.patientUID}`)
      .collection("bloodSugarLevel")
      .doc(`${props.meetingID}`)
      .set({
        sugarLevel: sugarLevel,
        senderUid: props.doctorUID,
        senderEmail: currentUser.email,
        sentAt: new Date(),
        appointmentID: props.meetingID,
      });

    //PUSHING BP DATA IN DATABASE
    db.collection("patients")
      .doc(`${props.patientUID}`)
      .collection("weight")
      .doc(`${props.meetingID}`)
      .set({
        weight: weight,
        senderUid: props.doctorUID,
        senderEmail: currentUser.email,
        sentAt: new Date(),
        appointmentID: props.meetingID,
      });

    setWeight("");
    setSugarLevel("");
  };

  return (
    <div>
      {/* UPDATE BUTTON */}

      <Tooltip title="Update Reports" placement="top">
        <IconButton onClick={handleClickOpen} style={{ color: "#ffffff" }}>
          <MonitorHeartIcon />
        </IconButton>
      </Tooltip>

      {/* PRESCRIPTION DIALOG BOX */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">UPDATE REPORTS</DialogTitle>
        <Divider />
        <DialogContent>
          {/* FORM TO UPDATE REPORTS */}

          <form onSubmit={updateReports}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  id="outlined"
                  required
                  label="Blood-Sugar-Level (mg/dL)"
                  color="primary"
                  placeholder="Blood Sugar Level (mg/dL)"
                  value={sugarLevel}
                  onChange={(e) => {
                    setSugarLevel(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined"
                  required
                  label="Weight"
                  color="primary"
                  placeholder="Weight (kg)"
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" startIcon={<SendIcon />}>
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Update;
