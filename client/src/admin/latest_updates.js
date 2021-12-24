import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Container,
  Typography,
  ListItem,
  List,
  Button,
} from "@mui/material";
import Navbar from "./navbar";
import { db } from "../firebase";
import { container, listItem, paper, typography } from "./styles";

const Latest_Updates = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <Grid container spacing={3}>
          {/* LATEST UPDATES */}
          <Grid item xs={12}>
            <Typography variant="h5" align="center" sx={typography}>
              Latest Updates
            </Typography>
            <Paper sx={paper}>
              <List>
                {posts.map((post) => {
                  return (
                    <ListItem sx={listItem}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="h6" sx={typography}>
                            {post.title}
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <img src={`${post.imageURL}`} />
                        </Grid>

                        <Grid item xs={12}>
                          <Typography variant="body">{post.body}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <Typography variant="subtitle2">
                            Posted at:{" "}
                            {new Date(
                              post.createdAt.seconds * 1000
                            ).toLocaleDateString("en-US")}
                            , at{" "}
                            {new Date(post.createdAt.seconds * 1000).getHours()}
                            :
                            {new Date(
                              post.createdAt.seconds * 1000
                            ).getMinutes()}{" "}
                            hrs
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                  );
                })}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Latest_Updates;
