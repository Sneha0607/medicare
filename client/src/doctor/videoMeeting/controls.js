import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../firebase";
import Chat from "./chat";
import Prescription from "./prescription";
import Update from "./update";
import View_Profile from "./view_profile";

const Controls = () => {
  const [meetings, setMeetings] = useState([]);
  var props = [];
  //FETCHING MEETING CODE FROM URL
  const location = useLocation();
  const meetingCode = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  //FETCHING ALL MEETINGS FROM DATABASE
  useEffect(() => {
    db.collection(`meetings`).onSnapshot((snapshot) => {
      setMeetings(snapshot.docs.map((doc) => doc.data()));
    });
  }, [meetingCode]);

  {
    meetings.map((meeting) => {
      if (meeting.meetingID === meetingCode)
        props = {
          meetingID: meeting.meetingID,
          doctorUID: meeting.doctorUID,
          patientUID: meeting.patientUID,
        };
    });
  }

  return (
    <>
      {meetings.map((meeting) => {
        if (meeting.meetingID === meetingCode)
          return (
            <>
              <Chat {...props} />
              <View_Profile {...props} />
              <Prescription {...props} />
              <Update {...props} />
            </>
          );
      })}
    </>
  );
};

export default Controls;
