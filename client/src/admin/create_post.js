import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Paper,
  Container,
  LinearProgress,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import Navbar from "./navbar";
import { db, storage } from "../firebase";
import { container, paper, typography } from "./styles";

const Create_Post = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const history = useHistory();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleCreate = () => {
    const uploadTask = storage.ref(`post_images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("post_images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            db.collection("posts").add({
              title: title,
              body: body,
              imageURL: `${url}`,
              createdAt: new Date(),
            });
          });
      }
    );

    history.push("/latest_updates");
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <Typography variant="h4" align="center" sx={typography}>
          Create Post
        </Typography>
        <Paper sx={paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                id="Title"
                name="Title"
                label="Title"
                fullWidth
                size="small"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="Body"
                name="Body"
                label="Body"
                fullWidth
                multiline
                size="small"
                rows={10}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <LinearProgress variant="determinate" value={progress} />
              <br />
              <input type="file" onChange={handleChange} />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" onClick={handleCreate}>
                Create
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default Create_Post;
