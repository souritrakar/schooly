import React from "react";
import Notices from "./Notices";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
// import FolderIcon from "@mui/icons-material/Folder";
// import RestoreIcon from "@mui/icons-material/Restore";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssignmentPage from "./AssignmentPage";
import AttendancePage from "./AttendancePage";

export default function TeacherDashboard() {
  /*
        File upload: Grading of assignment (basically upload a file)
        Post notices and announcements: Just text, no file.
        View students' attendance: Just viewing. Fetch and display.
    */
  const [value, setValue] = React.useState("assignments");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <center>
        <BottomNavigation
          sx={{ width: "100%", boxShadow: 1 }}
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Assignments"
            value="assignments"
            icon={<AssignmentIcon />}
          />
          <BottomNavigationAction
            label="Notices"
            value="notices"
            icon={<NotificationImportantIcon />}
          />
          <BottomNavigationAction
            label="Attendance"
            value="attendance"
            icon={<ListAltIcon />}
          />
        </BottomNavigation>
        {value === "assignments" && <AssignmentPage />}
        {value === "notices" && <Notices />}
        {value === "attendance" && <AttendancePage />}
      </center>
    </div>
  );
}
