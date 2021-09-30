import React, { useState, useEffect } from "react";
import CustomButton from "../shared/CustomButton";
import NoticeItem from "./NoticeItem";
import { List, TextField } from "@mui/material";
import Modal from "react-modal";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import firebase from "../../firebase";

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [modal, setModal] = useState(false);
  const [noticeName, setNoticeName] = useState("");
  const [noticeText, setNoticeText] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");

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

  const handleModal = () => {
    setModal(!modal);
  };

  // Fetch notices
  useEffect(() => {
    firebase.auth().onAuthStateChanged((cred) => {
      if (cred) {
        firebase
          .firestore()
          .collection("Users")
          .doc(cred.email)
          .collection("Notices")
          .onSnapshot((doc) => {
            console.log(cred.email);
            const temp = [];
            doc.forEach((n) => {
              temp.push(n.data());
            });
            setSchoolEmail(cred.email);
            setNotices(temp);
          });
      }
    });
  }, []);

  const createNotice = () => {
    firebase
      .firestore()
      .collection("Users")
      .doc(schoolEmail)
      .collection("Notices")
      .doc(noticeName)
      .set({
        name: noticeName,
        text: noticeText,
      })
      .then(() => {
        handleModal();
      });
  };

  return (
    <div>
      <h3>NOTICES PAGE</h3>
      <Modal
        isOpen={modal}
        onRequestClose={handleModal}
        style={customStyles}
        contentLabel="Add Student"
        ariaHideApp={false}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="notice"
          label="Notice name"
          name="notice name"
          autoComplete="notice name"
          onChange={(e) => {
            setNoticeName(e.target.value);
          }}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="notice"
          label="Notice text"
          name="notice text"
          autoComplete="notice text"
          onChange={(e) => {
            setNoticeText(e.target.value);
          }}
          autoFocus
        />
        <CustomButton onClick={() => createNotice()}>Add notice</CustomButton>
      </Modal>
      <Fab
        onClick={() => {
          handleModal();
        }}
      >
        <AddIcon sx={{ mr: 1 }} />
      </Fab>

      {notices.map((i) => {
        return (
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
              <NoticeItem heading={i.name} body={i.text} />;
            </List>
          </Box>
        );
      })}
    </div>
  );
}
