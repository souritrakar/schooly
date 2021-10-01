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
  const [attendance, setAttendance] = useState([]);
  const [base64String, setString] = React.useState("");
  const [assignmentInstruction, setInstructions] = React.useState("");

  const getDate = () => {
    const d = new Date();
    return `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;
  };

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

        firebase
          .firestore()
          .collection("Users")
          .doc(cred.email)
          .get()
          .then((doc) => {
            if (doc.exists) {
              let tempAttendance = doc.data().attendance;
              if (tempAttendance.indexOf(getDate()) === -1) {
                tempAttendance.push(getDate());
                firebase
                  .firestore()
                  .collection("Users")
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

  const handleFile = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setAssignmentFile(e.target.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    console.log(e.target.files[0]);

    const file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        console.log("File Is", file);
        setString(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };
  const createAssignment = async () => {
    const fileid = v4();
    var date = new Date();

    let finaldate =
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    firebase
      .firestore()
      .collection("Users")
      .doc(schoolEmail)
      .collection("Assignments")
      .add({
        name: assignmentName,
        date: finaldate,
        file: base64String,
        instruction: assignmentInstruction,
      });

    setModal2(false);
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
          schoolEmail: schoolEmail,
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
          inputProps={{ maxLength: 60 }}
          onChange={(e) => {
            setAssignmentName(e.target.value);
          }}
          autoComplete="assignment-name"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="assignment-name"
          label="Assignment Instructions"
          type="text"
          inputProps={{ maxLength: 200 }}
          id="assignment-name"
          onChange={(e) => {
            setInstructions(e.target.value);
          }}
          autoComplete="assignment-name"
        />
        <h2>Choose file to submit</h2>
        <input
          onChange={(e) => {
            handleFileInputChange(e);
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
                      instruction={assignment.instruction}
                      fileurl={assignment.file}
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
