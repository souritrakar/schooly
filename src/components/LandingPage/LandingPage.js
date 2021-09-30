import React from "react";
import "./LandingPage.css";
import "../../App.css";
import learningPic from "../../assets/learningPic.png";
// import { styled } from "@mui/material/styles";
// import Button from "@mui/material/Button";
import CustomButton from "../shared/CustomButton";
import { Link } from "react-router-dom";
export default function LandingPage() {
  //   const BootstrapButton = styled(Button)({
  //     boxShadow: "none",
  //     width: "10vw",
  //     textTransform: "none",
  //     fontSize: 20,
  //     padding: "9px 18px",
  //     border: "1px solid",
  //     lineHeight: 1.5,
  //     backgroundColor: "white",
  //     borderColor: "white",
  //     color: "black",
  //     fontFamily: [
  //       "-apple-system",
  //       "BlinkMacSystemFont",
  //       '"Segoe UI"',
  //       "Roboto",
  //       '"Helvetica Neue"',
  //       "Arial",
  //       "sans-serif",
  //       '"Apple Color Emoji"',
  //       '"Segoe UI Emoji"',
  //       '"Segoe UI Symbol"',
  //     ].join(","),
  //     "&:hover": {
  //       backgroundColor: "#fa4d56",
  //       borderColor: "#fa4d56",
  //       boxShadow: "none",
  //       color: "white",
  //     },
  //     "&:active": {
  //       boxShadow: "none",
  //       backgroundColor: "#fa4d56",
  //       borderColor: "#fa4d56",
  //     },
  //   });

  return (
    <div className="App">
      <header className="App-header">
        <div
          style={{
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <h3>Schooly</h3>
          <div style={{ display: "flex" }}>
            <CustomButton  onClick={() => {
              window.location.href = "/school-register";
            }} variant="contained" disableRipple>
              Schools
            </CustomButton>
            <CustomButton 
             onClick={() => {
              window.location.href = "/login";
            }}
              style={{ marginLeft: "5%" }}
              variant="contained"
              disableRipple
            >
              Students
            </CustomButton>
          </div>
        </div>
        <h1 style={{ marginTop: "3%", color: "white" }}>
          Learning made easier for all.
        </h1>

        <img
          src={learningPic}
          alt="loading..."
          style={{ width: "30%", alignSelf: "center", marginBottom: "1%" }}
        />

        <center>
          <CustomButton
            onClick={() => {
              window.location.href = "/school-register";
            }}
            variant="contained"
            disableRipple
          >
            <Link
              to="/school-register"
              style={{ textDecoration: "none", color: "black" }}
            >
              Get Started
            </Link>
          </CustomButton>
        </center>
      </header>
    </div>
  );
}
