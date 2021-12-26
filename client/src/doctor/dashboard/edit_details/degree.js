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
import EditIcon from "@mui/icons-material/Edit";

const Degree = (props) => {
  const [open, setOpen] = useState(false);
  const [degree, setDegree] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
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
    db.collection("doctors").doc(props.uid).update({
      degree: degree,
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
        <DialogTitle>Edit Degree</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
              <Grid container spacing={1}>
                {/* EDIT DEGREE */}
                <Grid item xs={12}>
                  <TextField
                    required
                    id="Degree"
                    name="Degree"
                    label="Degree"
                    fullWidth
                    size="small"
                    onChange={(e) => setDegree(e.target.value)}
                  />
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

export default Degree;
