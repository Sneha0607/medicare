import React from "react";
import Patient_Routes from "./routes/patient_routes";
import Doctor_Routes from "./routes/doctor_routes";

const App = () => {
  return (
    <>
      <Doctor_Routes />
      <Patient_Routes />
    </>
  );
};

export default App;
