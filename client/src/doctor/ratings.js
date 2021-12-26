import { Paper, Typography, Rating } from "@mui/material";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { paper } from "./styles";
import Title from "./dashboard/title";

const Ratings = (props) => {
  const [feedbacks, setFeedbacks] = useState([]);
  var rating = 0;
  var number = 0;

  useEffect(() => {
    db.collection("doctors")
      .doc(props.uid)
      .collection("feedbacks")
      .onSnapshot((snapshot) => {
        setFeedbacks(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  {
    feedbacks.map((feedback) => {
      rating += feedback.rating;
      number++;
    });
  }

  rating = rating / number;

  return (
    <Paper sx={paper}>
      <Title>Average Rating Given by Patients</Title>
      <Rating
        name="half-rating-read"
        defaultValue={rating}
        value={rating}
        precision={0.5}
        readOnly
      />
      <Typography>{rating}</Typography>
    </Paper>
  );
};

export default Ratings;
