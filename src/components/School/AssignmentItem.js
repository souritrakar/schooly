import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import Modal from "react-modal";
import { Document } from "react-pdf";
import "./AssignmentItem.css";

export default function AssignmentItem(props) {
  const [modal, setModal] = React.useState(false);

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

  return (
    <div>
      <ListItem>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="homework"
              src="https://www.iconbunny.com/icons/media/catalog/product/1/5/159.12-assignment-icon-iconbunny.jpg"
            />
          </ListItemAvatar>
          <ListItemText
            numberOfLines={1}
            primary={props.name}
            className="assignment_name"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  className="assignment_name"
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {props.date}
                </Typography>
              </React.Fragment>
            }
          />

          <IconButton
            onClick={() => {
              setModal(true);
            }}
            style={{
              backgroundColor: "transparent",
              color: "grey",
              marginRight: "10%",
              marginTop: "3%",
            }}
          >
            <VisibilityIcon />
          </IconButton>

          <Modal
            isOpen={modal}
            onRequestClose={handleModal}
            style={customStyles}
            contentLabel="Add assignment"
          >
            <center>
              <h3>{props.name}</h3>
            </center>
            <br />
            <center>
              <h4>{props.instruction}</h4>
            </center>
            <br />
            <iframe
              style={{ marginLeft: "10%", marginRight: "20%" }}
              src={props.fileurl}
              width="600"
              height="600"
            />
            <br />
            <center>
              <h5>{props.date}</h5>
            </center>
          </Modal>
        </ListItem>
        <Divider variant="middle" component="li" />
      </ListItem>
    </div>
  );
}
