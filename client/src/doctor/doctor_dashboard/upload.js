import React, { useState, useEffect } from "react";
import { Avatar, Button } from "@mui/material";
import Title from "./title";
import { db, storage } from "../../firebase";

const Upload = (props) => {
  const [doctors, setPatients] = useState([]);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    db.collection("doctors").onSnapshot((snapshot) => {
      setPatients(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage
      .ref(`doctor_profile_images/${image.name}`)
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
          .ref("doctor_profile_images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            db.collection("doctors")
              .doc(props.uid)
              .update({
                imageURL: `${url}`,
              });
          });
      }
    );
  };

  return (
    <React.Fragment>
      <Title>Profile Photograph</Title>
      {doctors.map((doctor) => {
        if (doctor.uid === props.uid)
          return (
            <Avatar
              alt="Patient_Profile_Image"
              src={`${doctor.imageURL}`}
              sx={{ width: 100, height: 100 }}
            />
          );
      })}

      <progress value={progress} max="100" />
      <br />
      <input type="file" onChange={handleChange} />
      <Button variant="contained" onClick={handleUpload}>
        Upload
      </Button>
    </React.Fragment>
  );
};

export default Upload;
