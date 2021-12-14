import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "./firebase";
import { AuthProvider } from "./contexts/AuthContext";
import { CssBaseline } from "@mui/material";
import Home from "./home/home";
import Doctor_Signup from "./register/doctor_signup";
import Doctor_Signin from "./register/doctor_signin";
import Patient_Signup from "./register/patient_signup";
import Patient_Signin from "./register/patient_signin";
import Doctor_Details from "./doctor/doctor_details/doctor_details";
import Doctor_Dashboard from "./doctor/doctor_dashboard/doctor_dashboard";
import Doctor_Profile from "./doctor/doctor_profile";
import Patient_Dashboard from "./patient/patient_dashboard/patient_dashboard";
import Patient_Profile from "./patient/patient_profile";

const App = () => {
  const [user, setUser] = useState("");

  //SETTING THE USER IF HE IS AUTHENTICATED
  const authlistener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authlistener();
  }, []);

  return (
    <>
      {user ? (
        // ROUTES AVAILABLE IF THE USER IS AUTHENTICATED
        <>
          <CssBaseline>
            <Router>
              <AuthProvider>
                <Switch>
                  <Route
                    exact
                    path="/doctor/dashboard"
                    component={Doctor_Dashboard}
                  />
                  <Route
                    exact
                    path="/doctor/profile"
                    component={Doctor_Profile}
                  />
                  <Route
                    exact
                    path="/patient/dashboard"
                    component={Patient_Dashboard}
                  />
                  <Route
                    exact
                    path="/patient/profile"
                    component={Patient_Profile}
                  />
                </Switch>
              </AuthProvider>
            </Router>
          </CssBaseline>
        </>
      ) : (
        // ROUTES AVAILABLE IF THE USER IS NOT AUTHENTICATED
        <>
          <CssBaseline>
            <Router>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/doctor_signup" component={Doctor_Signup} />
                <Route exact path="/doctor_signin" component={Doctor_Signin} />
                <Route
                  exact
                  path="/patient_signup"
                  component={Patient_Signup}
                />
                <Route
                  exact
                  path="/patient_signin"
                  component={Patient_Signin}
                />
              </Switch>
            </Router>
          </CssBaseline>
        </>
      )}
    </>
  );
};

export default App;
