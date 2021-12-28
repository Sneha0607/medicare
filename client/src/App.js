import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "./firebase";
import { AuthProvider } from "./contexts/AuthContext";
import { CssBaseline } from "@mui/material";
// HOMEPAGE
import Home from "./home/home";
import LoggedIn from "./home/loggedIn";
// DOCTOR'S PAGES
import Doctor_Signup from "./doctor/signup";
import Doctor_Signin from "./doctor/signin";
import Doctor_Dashboard from "./doctor/dashboard/dashboard";
import Doctor_Profile from "./doctor/profile";
import Appointments from "./doctor/appointments";
import Doctor_Scheduled_Meetings from "./doctor/scheduled_meetings";
import Patient from "./doctor/patient";
import Doctor_Notifications from "./doctor/doctor_notifications";
import Doctor_Room from "./doctor/videoMeeting/room";
import Your_Patients from "./doctor/your_patients";
import Doctor_Latest_Updates from "./doctor/latest_updates";
// PATIENT'S PAGES
import Patient_Signup from "./patient/signup";
import Patient_Signin from "./patient/signin";
import Patient_Dashboard from "./patient/dashboard/dashboard";
import Patient_Profile from "./patient/profile";
import View_Doctors from "./patient/view_doctors";
import Book_Appointment from "./patient/book_appointment";
import Doctor from "./patient/doctor";
import Patient_Notifications from "./patient/patient_notifications";
import Patient_Scheduled_Meetings from "./patient/scheduled_meetings";
import Patient_Room from "./patient/videoMeeting/room";
import Patient_Latest_Updates from "./patient/latest_updates";
import Past_Appointments from "./patient/past_appointments";
// ADMIN'S PAGES
import Admin_Signin from "./admin/signin";
import Admin_Dashboard from "./admin/dashboard";
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
                  {/* ROOT */}
                  <Route exact path="/" component={LoggedIn} />

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
                  <Route
                    exact
                    path="/patient_profile/:uid"
                    component={Patient}
                  />
                  <Route
                    exact
                    path="/doctor/latest_updates"
                    component={Doctor_Latest_Updates}
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
                  <Route
                    exact
                    path="/patient/latest_updates"
                    component={Patient_Latest_Updates}
                  />
                  <Route
                    exact
                    path="/patient/past_appointments"
                    component={Past_Appointments}
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
