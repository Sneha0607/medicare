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
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from "@mui/icons-material/Download";
import { jsPDF } from "jspdf";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

const Update = (props) => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const [sugarLevel, setSugarLevel] = useState("");

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

    //PUSHING DATA IN DATABASE
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

    setSugarLevel("");
  };

  //DOWNLOAD PRESCRIPTION FUNCTION
  const downloadPrescription = () => {
    // var doc = new jsPDF();
    // var i = 20;
    // var j = 40;
    // doc.setFontSize("15");
    // doc.addImage("/images/Medicare.png", "PNG", 5, 10, 200, 15);
    // prescriptions.map((prescript) => {
    //   doc.text(prescript.prescription, i, j);
    //   j = j + 20;
    // });
    // doc.save("doctor_prescription.pdf");
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
            <Button type="submit" startIcon={<SendIcon />} />
          </form>
        </DialogContent>
        <DialogActions>
          {/* DOWNLOAD REPORT BUTTON */}
          <Button
            onClick={downloadPrescription}
            style={{
              textTransform: "none",
              margin: "2%",
            }}
            startIcon={<DownloadIcon />}
          >
            Download Prescription
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Update;
