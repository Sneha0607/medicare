import React, { useState, useEffect } from "react";
import { Alert, Avatar, Button, LinearProgress } from "@mui/material";
import Title from "./title";
import { db, storage } from "../../firebase";
import { avatar } from "../styles";

const Upload = (props) => {
  const [patients, setPatients] = useState([]);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    db.collection("patients").onSnapshot((snapshot) => {
      setPatients(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image == null) {
      setImageError("Choose file before uploading!");
    } else {
      const uploadTask = storage
        .ref(`patient_profile_images/${image.name}`)
        .put(image);

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
            .ref("patient_profile_images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              db.collection("patients")
                .doc(props.uid)
                .update({
                  imageURL: `${url}`,
                });
            });
        }
      );
    }
  };

  return (
    <React.Fragment>
      {patients.map((patient) => {
        if (patient.uid === props.uid)
          return (
            <>
              <Title>{patient.name}</Title>

              <Avatar
                alt="Patient_Profile_Image"
                src={`${patient.imageURL}`}
                sx={avatar}
              />
              <br />
              {imageError && <Alert severity="error">{imageError}</Alert>}
              <br />
              <LinearProgress variant="determinate" value={progress} />
              <br />
              <input type="file" onChange={handleChange} />
              <br />
              <Button variant="contained" onClick={handleUpload}>
                Upload
              </Button>
            </>
          );
      })}
    </React.Fragment>
  );
};

export default Upload;
