import React, { useState } from "react";
import { db } from "../../firebase";
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  Divider,
  Tooltip,
  TextField,
  Grid,
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";

const Feedback = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(1);
  const [review, setReview] = useState("");

  //FUNCTIONS TO OPEN AND CLOSE DIALOG BOX
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    db.doc(`doctors/${props.doctorUID}/feedbacks/${props.meetingID}`).set({
      rating: value,
      review: review,
      submittedBy: props.patientUID,
      submittedAt: new Date(),
    });

    db.doc(
      `patients/${props.patientUID}/doctors/${props.doctorUID}/feedbacks/${props.meetingID}`
    ).set({
      rating: value,
      review: review,
      submittedAt: new Date(),
    });

    setReview("");
    setValue(1);
  };

  return (
    <div>
      {/* PRESCRIPTION BUTTON */}

      <Tooltip title="Feedback" placement="top">
        <IconButton onClick={handleClickOpen} style={{ color: "#ffffff" }}>
          <RateReviewIcon />
        </IconButton>
      </Tooltip>

      {/* FEEDBACK DIALOG BOX */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">FEEDBACK</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="filled-basic"
                    color="primary"
                    placeholder="Write review"
                    fullWidth
                    value={review}
                    onChange={(e) => {
                      setReview(e.target.value);
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit">Submit</Button>
                </Grid>
              </Grid>
            </form>
          </DialogContentText>
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

export default Feedback;
