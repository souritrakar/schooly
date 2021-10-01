import React, { useEffect } from "react";
import Notices from "./Notices";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssignmentPage from "./AssignmentPage";
import AttendancePage from "./AttendancePage";
import firebase from "../../firebase";
import { Fab } from "@mui/material";

import firebase from "../../firebase";

export default function StudentDashboard(props) {
  const getDate = () => {
    const d = new Date();
    return `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((cred) => {
      let schoolEmail = "";
      if (cred) {
        firebase
          .firestore()
          .collection("Users")
          .doc(cred.email)
          .get()
          .then((doc) => {
            schoolEmail = doc.data().schoolEmail;
          });
        firebase
          .firestore()
          .collection("Users")
          .doc(schoolEmail)
          .collection("Students")
          .doc(cred.email)
          .then((doc) => {
            if (doc.exists) {
              let tempAttendance = doc.data().attendance;
              if (tempAttendance.indexOf(getDate()) === -1) {
                tempAttendance.push(getDate());
                firebase
                  .firestore()
                  .collection("Users")
                  .doc(schoolEmail)
                  .collection("Students")
                  .doc(cred.email)
                  .set({ attendance: tempAttendance, ...cred });
              }
            }
          })
          .catch((error) => {
            console.log("ERROR: ", error);
          });
      }
    });
  }, []);

  return (
    <div>
      <div style={{ zIndex: 1000 }}>
        <center>
          <BottomNavigation
            sx={{ width: "100%", boxShadow: 1, zIndex: 15 }}
            value={value}
            onChange={handleChange}
          >
            <BottomNavigationAction
              label="Assignments"
              value="assignments"
              icon={<AssignmentIcon />}
            />
            <BottomNavigationAction
              label="Notices"
              value="notices"
              icon={<NotificationImportantIcon />}
            />
          </BottomNavigation>
          {value === "assignments" && <AssignmentPage />}
          {value === "notices" && <Notices />}
        </center>
      </div>
      <center>
        <h2>Student Dashboard</h2>
      </center>
    </div>
  );
}
