import React, { useEffect } from "react";
import { Fab } from "@mui/material";
import Modal from "react-modal";
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
      <center>
        <h2>Student Dashboard</h2>
      </center>
      <Fab></Fab>
    </div>
  );
}
