import React, { useEffect, useState } from "react";
import firebase from "../../firebase";

export default function AttendancePage() {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((cred) => {
      firebase
        .firestore()
        .collection("Users")
        .doc(cred.email)
        .collection("Students")
        .get()
        .then((doc) => {
          let temp = [];
          doc.forEach((d) => {
            temp.push({ name: d.data().name, date: d.data().attendance });
          });
          setAttendances(temp);
        });
    });
  }, []);

  return (
    <div>
      <h2> ATTENDANCE PAGE</h2>
    </div>
  );
}
