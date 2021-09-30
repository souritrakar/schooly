import React, { useState } from "react";
import CustomButton from "../shared/CustomButton";
import NoticeItem from "./NoticeItem";
import TextField from "@mui/material/TextField";

export default function Notices() {
  const [data, setData] = useState([]);
  //const [email, setEmail] = useState("");
  const fetchData = () => {
    /**
     * firebase.collections(???).document(???).then((response) => {
     * let d = response.json(); //Get the array
     * setData(repsonse)})
     */
    return;
  };

  const createNotice = () => {
    // Display modal with text field
    return (
      <TextField
        margin="normal"
        required
        fullWidth
        id="notice"
        label="Email Address"
        name="email"
        autoComplete="email"
        onChange={(text) => {
          setData(text);
        }}
        autoFocus
      />
    );
  };

  return (
    <div>
      <h1>NOTICES PAGE</h1>
      <CustomButton></CustomButton>
      {data.map((i) => {
        return <NoticeItem heading={i.heading} body={i.body} />;
      })}
    </div>
  );
}
