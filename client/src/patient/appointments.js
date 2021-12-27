import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { Typography } from "@mui/material";

const Appointments = (props) => {
  const [prescriptions, setPrescriptions] = useState([]);

  ///FETCHING ALL PRESCRIPTIONS FROM DATABASE
  useEffect(() => {
    db.collection(
      `doctors/${props.doctorUID}/patients/${props.patientUID}/prescriptions`
    )
      .orderBy("sentAt", "desc")
      .onSnapshot((snapshot) => {
        setPrescriptions(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <>
      {prescriptions.map((prescription) => {
        if (prescription.appointmentID === props.appointmentID)
          return <Typography>{prescription.prescription}</Typography>;
      })}
    </>
  );
};

export default Appointments;
