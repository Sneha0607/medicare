import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import MedicationIcon from "@mui/icons-material/Medication";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from "@mui/icons-material/Download";
import { jsPDF } from "jspdf";

const Prescription = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const [prescription, setPrescription] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);

  //FETCHING MEETING CODE FROM URL
  const location = useLocation();
  const meetingCode = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  //FETCHING ALL PRESCRIPTIONS FROM DATABASE
  useEffect(() => {
    db.collection(`meetings/${meetingCode}/prescriptions`)
      .orderBy("sentAt", "asc")
      .onSnapshot((snapshot) => {
        setPrescriptions(snapshot.docs.map((doc) => doc.data()));
      });
  }, [meetingCode]);

  //FUNCTIONS TO OPEN AND CLOSE DIALOG BOX
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //SEND PRESCRIPTION FUNCTION
  const sendPrescription = (e) => {
    e.preventDefault();

    //PUSHING MESSAGE IN DATABASE
    db.collection("meetings").doc(meetingCode).collection("prescriptions").add({
      prescription: prescription,
      senderEmail: currentUser.email,
      senderUid: currentUser.uid,
      sentAt: new Date(),
    });

    setPrescription("");
  };

  //DOWNLOAD PRESCRIPTION FUNCTION
  const downloadPrescription = () => {
    var doc = new jsPDF();
    var i = 20;
    var j = 40;
    doc.setFontSize("15");
    doc.addImage("/images/Medicare.png", "PNG", 5, 10, 200, 15);
    prescriptions.map((prescript) => {
      doc.text(prescript.prescription, i, j);
      j = j + 20;
    });
    doc.save("doctor_prescription.pdf");
  };

  return (
    <div>
      {/* PRESCRIPTION BUTTON */}

      <Tooltip title="Prescription" placement="top">
        <IconButton onClick={handleClickOpen} style={{ color: "#ffffff" }}>
          <MedicationIcon />
        </IconButton>
      </Tooltip>

      {/* PRESCRIPTION DIALOG BOX */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">PRESCRIPTION</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <List>
              {prescriptions.map((prescript) => {
                return (
                  <>
                    <ListItem style={{ margin: "0" }}>
                      <Typography>
                        {prescript.senderEmail}
                        <p>
                          <b>{prescript.prescription}</b>
                        </p>
                      </Typography>
                    </ListItem>
                  </>
                );
              })}
            </List>
          </DialogContentText>

          {/* FORM TO WRITE PRESCRIPTION */}

          <form onSubmit={sendPrescription}>
            <TextField
              id="outlined-multiline-flexible"
              label="Prescription"
              multiline
              maxRows={4}
              color="primary"
              placeholder="Enter prescription..."
              value={prescription}
              onChange={(e) => {
                setPrescription(e.target.value);
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

export default Prescription;
