import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Paper,
  Container,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Navbar from "./navbar";
import { db } from "../firebase";
import { container, paper, transparentPaper, typography } from "./styles";

const Doctor_Latest_Updates = () => {
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
        <Grid container>
          <Grid item xs={12}>
            {/* LATEST UPDATES */}
            <Typography variant="h4" align="center" sx={typography}>
              Latest Updates
            </Typography>
            <Paper sx={transparentPaper}>
              {posts.map((post) => {
                return (
                  <div sx={{ width: "100%" }}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography
                          variant="h6"
                          sx={typography}
                          sx={{ width: "75%", flexShrink: 0 }}
                        >
                          {post.title}
                        </Typography>
                        <Typography variant="subtitle2">
                          {new Date(
                            post.createdAt.seconds * 1000
                          ).toLocaleDateString("en-US")}
                          , {new Date(post.createdAt.seconds * 1000).getHours()}
                          :
                          {new Date(post.createdAt.seconds * 1000).getMinutes()}{" "}
                          hrs
                        </Typography>
                      </AccordionSummary>

                      <AccordionDetails>
                        <img
                          src={`${post.imageURL}`}
                          height="150vh"
                          width="200vw"
                        />
                        <br />
                        <Typography variant="body">{post.body}</Typography>
                      </AccordionDetails>
                    </Accordion>

                    <br />
                  </div>
                );
              })}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Doctor_Latest_Updates;
