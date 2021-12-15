import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "../firebase";
import { AuthProvider } from "../contexts/AuthContext";
import { CssBaseline } from "@mui/material";
import Home from "../home/home";
import Patient_Signup from "../patient/patient_signup";
import Patient_Signin from "../patient/patient_signin";
import Patient_Dashboard from "../patient/patient_dashboard/patient_dashboard";
import Patient_Profile from "../patient/patient_profile";
import View_Doctors from "../patient/view_doctors";
import Book_Appointment from "../patient/book_appointment";
import Doctor from "../patient/doctor";

const Patient_Routes = () => {
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
                    path="/patient/dashboard"
                    component={Patient_Dashboard}
                  />
                  <Route
                    exact
                    path="/patient/profile"
                    component={Patient_Profile}
                  />
                  <Route
                    exact
                    path="/patient/view_doctors"
                    component={View_Doctors}
                  />
                  <Route
                    exact
                    path="/patient/book_appointment"
                    component={Book_Appointment}
                  />
                  <Route exact path="/doctor/:uid" component={Doctor} />
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

export default Patient_Routes;
