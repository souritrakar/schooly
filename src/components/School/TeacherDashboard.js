import React, { useState, useEffect } from "react";
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

export default function TeacherDashboard() {
  /*
        File upload: Grading of assignment (basically upload a file)
        Post notices and announcements: Just text, no file.
        View students' attendance: Just viewing. Fetch and display.
  */
  const [value, setValue] = useState("assignments");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((cred) => {
      if (cred) {
        firebase
          .firestore()
          .collection("Users")
          .doc(cred.email)
          .get()
          .then((doc) => {
            if (doc.data().type === "student") {
              window.location.href = "/";
            } else {
              return null;
            }
          });
      } else {
        window.location.href = "/login";
      }
    });
  }, []);

  return (
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
          <BottomNavigationAction
            label="Attendance"
            value="attendance"
            icon={<ListAltIcon />}
          />
        </BottomNavigation>
        {value === "assignments" && <AssignmentPage />}
        {value === "notices" && <Notices />}
        {value === "attendance" && <AttendancePage />}
      </center>
    </div>
  );
}
