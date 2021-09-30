import React, { useState, useEffect } from "react";
import CustomButton from "../shared/CustomButton";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AssignmentItem from "./AssignmentItem";
import firebase from "../../firebase";
import { List, TextField } from "@mui/material";
// import Divider from "@mui/material/Divider";
import Modal from "react-modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";
import { v4 } from "uuid";

export default function AssignmentPage() {
  const [assignments, setAssignments] = useState([]);
  const [schoolEmail, setSchoolEmail] = React.useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modal2, setModal2] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentFile, setAssignmentFile] = useState(null);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "40%",
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((cred) => {
      if (cred) {
        firebase
          .firestore()
          .collection("Users")
          .doc(cred.email)
          .collection("Assignments")
          .onSnapshot((doc) => {
            const assignments = [];
            doc.forEach((assignment) => {
              assignments.push(assignment.data());
            });
            setSchoolEmail(cred.email);
            setAssignments(assignments);
            console.log(assignments);
          });
      }
    });
  }, []);

  const handleFile = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setAssignmentFile(e.target.files[0]);
    }
  };

  const createAssignment = () => {
    const fileid = v4();
    const file = new Blob([assignmentFile], {
      type: "application/pdf",
      name: "assignment",
    });
    console.log();
    let myfileurl = URL.createObjectURL(file);
    firebase
      .storage()
      .ref(`files/${schoolEmail}/${fileid}`)
      .put(file)
      .then(() => {
        console.log("Put file!");
        firebase
          .storage()
          .ref("files")
          .child(`${schoolEmail}/${fileid}`)
          .getDownloadURL()
          .then((fileurl) => {
            console.log("Download URL: ", fileurl);
            firebase
              .firestore()
              .collection("Users")
              .doc(schoolEmail)
              .collection("Assignments")
              .add({
                name: assignmentName,
                date: "9th Sep",
                file: fileurl,
              });
          });
        setModal2(false);
      });
  };

  const addStudent = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.firestore().collection("Users").doc(email).set({
          name: name,
          email: email,
          password: password,
          type: "student",
        });
      })
      .then(() => {
        firebase
          .firestore()
          .collection("Users")
          .doc(schoolEmail)
          .collection("Students")
          .doc(email)
          .set({
            name: name,
            email: email,
            password: password,
            type: "student",
          });
        setIsOpen(false);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Student"
        ariaHideApp={false}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Add student</h2>
          <IconButton
            style={{ backgroundColor: "transparent" }}
            onClick={() => setIsOpen(false)}
          >
            <HighlightOffIcon />
          </IconButton>
        </div>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Student Name"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Student School Email Address"
          name="email"
          autoComplete="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Student Password"
          type="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          autoComplete="current-password"
        />
        <div style={{ width: "100%", justifyContent: "space-between" }}>
          <CustomButton
            onClick={() => {
              addStudent();
            }}
            style={{ backgroundColor: "#fa4d56", color: "white" }}
          >
            Add
          </CustomButton>
        </div>
      </Modal>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Fab
          onClick={() => {
            setIsOpen(true);
          }}
          variant="extended"
          color="primary"
          aria-label="add"
          style={{
            marginRight: "5%",
            marginTop: "2%",
            backgroundColor: "#fa4d56",
          }}
        >
          <AddIcon sx={{ mr: 1 }} />
          Add Student
        </Fab>
      </div>
      <Modal
        isOpen={modal2}
        onRequestClose={() => setModal2(false)}
        style={customStyles}
        contentLabel="Add Student"
        ariaHideApp={false}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          name="assignment-name"
          label="Assignment Name"
          type="text"
          id="assignment-name"
          onChange={(e) => {
            setAssignmentName(e.target.value);
          }}
          autoComplete="assignment-name"
        />
        <h2>Choose file to submit</h2>
        <input
          onChange={() => {
            handleFile;
          }}
          accept="application/pdf"
          type="file"
        ></input>
        <CustomButton onClick={(e) => createAssignment(e.target.value)}>
          Submit assignment
        </CustomButton>
      </Modal>
      <Fab
        style={{ backroundColor: "#fa4d56" }}
        onClick={() => setModal2(true)}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
      <br />
      <Box
        sx={{
          width: window.innerWidth / 2,

          bgcolor: "background.paper",
        }}
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {assignments.map((assignment) => {
            return (
              <div className="assignment_container">
                <Box
                  sx={{
                    border: 1,
                    borderRadius: 3,
                    width: "100%",
                  }}
                >
                  <List
                    sx={{
                      width: "120%",
                      border: "black",
                      minWidth: 300,
                      padding: "1%",
                    }}
                  >
                    <AssignmentItem
                      name={assignment.name}
                      date={assignment.date}
                    />
                  </List>
                </Box>
                <br />
              </div>
            );
          })}
        </List>
      </Box>
    </div>
  );
}
