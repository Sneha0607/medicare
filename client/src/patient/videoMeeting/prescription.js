import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  IconButton,
  Button,
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
import DownloadIcon from "@mui/icons-material/Download";
import { jsPDF } from "jspdf";

const Prescription = (props) => {
  const [open, setOpen] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);

  //FETCHING ALL PRESCRIPTIONS FROM DATABASE
  useEffect(() => {
    db.collection(`meetings/${props.meetingID}/prescriptions`)
      .orderBy("sentAt", "asc")
      .onSnapshot((snapshot) => {
        setPrescriptions(snapshot.docs.map((doc) => doc.data()));
      });
  }, [props.meetingCode]);

  //FUNCTIONS TO OPEN AND CLOSE DIALOG BOX
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
