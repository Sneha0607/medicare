import React from "react";
import Navbar from "./navbar";
import { Container, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { v1 as uuid } from "uuid";

const Schedule_Meeting = () => {
  const history = useHistory();

  const create = () => {
    const id = uuid();

    history.push(`/room/${id}`);
    alert(`Copy your meeting code : ${id}`);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: "12vh", ml: "5vw" }}>
        <Button onClick={create} variant="contained">
          Meet
        </Button>
      </Container>
    </>
  );
};

export default Schedule_Meeting;
