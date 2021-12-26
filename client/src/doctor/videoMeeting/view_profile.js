import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const View_Profile = (props) => {
  return (
    <div>
      {/* VIEW PATIENT PROFILE BUTTON */}

      <Tooltip title="View Patient Profile" placement="top">
        <IconButton
          target="_blank"
          href={`/patient_profile/${props.patientUID}`}
          style={{ color: "#ffffff" }}
        >
          <PersonIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default View_Profile;
