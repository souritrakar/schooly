import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomButton from "../shared/CustomButton";
import firebase from "../../firebase";
//import { v4 } from "uuid";

const theme = createTheme();

export default function SchoolRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showVerify, setShowVerify] = useState(false);

  const register = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        //const uid = v4();
        firebase
          .firestore()
          .collection("Users")
          .doc(email)
          .set({
            name: name,
            email: email,
            password: password,
            type: "school",
          })
          .then(() => {
            window.location.href = "/login";
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (showVerify === false) {
    return (
      <ThemeProvider theme={theme}>
        <center>
          <Grid
            container
            component="main"
            sx={{ height: "70vh", textAlign: "center" }}
          >
            <CssBaseline />
            <Grid sx={{ marginLeft: "30%" }} item xs={12} sm={8} md={5} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "#fa4d56" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Register your school.
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="School/Institution Name"
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
                    label="Official School Email Address"
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
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    autoComplete="current-password"
                  />
                  <br />
                  <br />
                  <CustomButton
                    onClick={() => {
                      //window.location.href = "/login";
                      register(email, password);
                    }}
                    style={{ backgroundColor: "#fa4d56", color: "white" }}
                    variant="primary"
                    disableRipple
                  >
                    Register
                  </CustomButton>
                </Box>
              </Box>
            </Grid>
            {/* <svg style={{marginTop:"-20%"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffc987" fill-opacity="1" d="M0,256L34.3,229.3C68.6,203,137,149,206,112C274.3,75,343,53,411,58.7C480,64,549,96,617,122.7C685.7,149,754,171,823,192C891.4,213,960,235,1029,224C1097.1,213,1166,171,1234,154.7C1302.9,139,1371,149,1406,154.7L1440,160L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg> */}
          </Grid>
        </center>
      </ThemeProvider>
    );
  } else {
    return (
      <center>
        <h3 style={{ marginTop: "30%" }}>
          Thanks for registering! A verification email has been sent to <br />{" "}
          {email}
        </h3>
      </center>
    );
  }
}
