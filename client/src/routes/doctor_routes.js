import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "../firebase";
import { AuthProvider } from "../contexts/AuthContext";
import { CssBaseline } from "@mui/material";
import Home from "../home/home";
import Doctor_Signup from "../doctor/doctor_signup";
import Doctor_Signin from "../doctor/doctor_signin";
import Doctor_Details from "../doctor/doctor_details/doctor_details";
import Doctor_Dashboard from "../doctor/doctor_dashboard/doctor_dashboard";
import Doctor_Profile from "../doctor/doctor_profile";

const Doctor_Routes = () => {
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
              </Switch>
            </Router>
          </CssBaseline>
        </>
      )}
    </>
  );
};

export default Doctor_Routes;
