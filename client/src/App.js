import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "./firebase";
import { AuthProvider } from "./contexts/AuthContext";
import { CssBaseline } from "@mui/material";
// HOMEPAGE
import Home from "./home/home";
// DOCTOR'S PAGES
import Doctor_Signup from "./doctor/doctor_signup";
import Doctor_Signin from "./doctor/doctor_signin";
import Doctor_Dashboard from "./doctor/doctor_dashboard/doctor_dashboard";
import Doctor_Profile from "./doctor/doctor_profile";
import Appointments from "./doctor/appointments";
import Doctor_Scheduled_Meetings from "./doctor/doctor_scheduled_meetings";
import Doctor_Notifications from "./doctor/doctor_notifications";
import Doctor_Room from "./doctor/videoMeeting/room";
import Your_Patients from "./doctor/your_patients";
// PATIENT'S PAGES
import Patient_Signup from "./patient/patient_signup";
import Patient_Signin from "./patient/patient_signin";
import Patient_Dashboard from "./patient/patient_dashboard/patient_dashboard";
import Patient_Profile from "./patient/patient_profile";
import View_Doctors from "./patient/view_doctors";
import Book_Appointment from "./patient/book_appointment";
import Doctor from "./patient/doctor";
import Patient_Notifications from "./patient/patient_notifications";
import Patient_Scheduled_Meetings from "./patient/patient_scheduled_meetings";
import Patient_Room from "./patient/videoMeeting/room";
// ADMIN'S PAGES
import Admin_Signin from "./admin/admin_signin";
import Admin_Dashboard from "./admin/admin_dashboard";
import Doctors from "./admin/doctors";
import Patients from "./admin/patients";
import Create_Post from "./admin/create_post";
import Latest_Updates from "./admin/latest_updates";

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
                  {/* DOCTOR ROUTES */}
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
                    path="/doctor/appointments"
                    component={Appointments}
                  />
                  <Route
                    exact
                    path="/doctor/notifications"
                    component={Doctor_Notifications}
                  />
                  <Route
                    exact
                    path="/doctor/scheduled_meetings"
                    component={Doctor_Scheduled_Meetings}
                  />
                  <Route
                    exact
                    path="/doctor/room/:roomID"
                    component={Doctor_Room}
                  />
                  <Route
                    exact
                    path="/doctor/your_patients"
                    component={Your_Patients}
                  />
                  {/* PATIENT ROUTES */}
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
                  <Route exact path="/doctor_profile/:uid" component={Doctor} />
                  <Route
                    exact
                    path="/patient/notifications"
                    component={Patient_Notifications}
                  />
                  <Route
                    exact
                    path="/patient/scheduled_meetings"
                    component={Patient_Scheduled_Meetings}
                  />
                  <Route
                    exact
                    path="/patient/room/:roomID"
                    component={Patient_Room}
                  />

                  {/* ADMIN ROUTES */}
                  <Route
                    exact
                    path="/admin/dashboard"
                    component={Admin_Dashboard}
                  />
                  <Route exact path="/doctors" component={Doctors} />
                  <Route exact path="/patients" component={Patients} />
                  <Route exact path="/create_post" component={Create_Post} />
                  <Route
                    exact
                    path="/latest_updates"
                    component={Latest_Updates}
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
                <Route exact path="/admin_signin" component={Admin_Signin} />
              </Switch>
            </Router>
          </CssBaseline>
        </>
      )}
    </>
  );
};

export default App;
