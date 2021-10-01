import React, { useState } from "react";
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

export default function NoticeItem(props) {
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
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

  return (
    <div>
      <ListItem>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="notice"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrlwYZxDvdEnPdm89VfvyvlVXyuaJL3-YphobEMTb0KbzcD4a0fIEsR6LE_jicVUgVQFM&usqp=CAU"
            />
          </ListItemAvatar>
          <ListItemText
            numberOfLines={1}
            primary={props.name}
            className="notice_name"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  className="notice_name"
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {props.body}
                </Typography>
              </React.Fragment>
            }
          />

          {/* <IconButton
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
          </IconButton> */}

          {/* <Modal
            isOpen={modal}
            onRequestClose={handleModal}
            style={customStyles}
            contentLabel="Add assignment"
          >
            <Document file={props.file} />
          </Modal> */}
        </ListItem>
        <Divider variant="middle" component="li" />
      </ListItem>
    </div>
  );
}
