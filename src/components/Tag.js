import React from "react";
import { Chip, FaceIcon } from "@material-ui/core";

function Tag({ name }) {
  if (!name) return null;

  return (
    <div>
      <Chip
        label={name}
        onDelete={() => alert("delete")}
        variant="outlined"
        color="primary"
      />
    </div>
  );
}

export default Tag;
