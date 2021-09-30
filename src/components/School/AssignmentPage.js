import React from "react";
import CustomButtom from "../shared/CustomButton";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
export default function AssignmentPage() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          style={{ marginRight: "5%" }}
        >
          <AddIcon sx={{ mr: 1 }} />
          Create
        </Fab>
      </div>
    </div>
  );
}
