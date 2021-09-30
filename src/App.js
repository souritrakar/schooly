import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  LandingPage,
  SchoolRegister,
  TeacherDashboard,
  StudentDashboard,
} from "./components";
import Login from "./Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/school-register">
            <SchoolRegister />
          </Route>
          <Route exact path="/teacher-dashboard">
            <TeacherDashboard />
          </Route>
          <Route exact path="/student-dashboard">
            <StudentDashboard />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
