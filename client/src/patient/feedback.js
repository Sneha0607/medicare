import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { Typography } from "@mui/material";

const Feedback = (props) => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    db.collection("doctors")
      .doc(props.doctorUID)
      .collection("feedbacks")
      .onSnapshot((snapshot) => {
        setFeedback(
          snapshot.docs.map((doc) => doc.data({ id: doc.id, ...doc.data() }))
        );
      });
  }, []);

  return (
    <>
      {feedback.map((feed) => {
        if (props.meetingID === feed.id)
          return (
            <Typography>
              {feed.rating}/5 <br />
              {feed.review}
            </Typography>
          );
      })}
    </>
  );
};

export default Feedback;
