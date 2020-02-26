import React from "react";
import { Chip } from "@material-ui/core";
import getIcon from '../utils/tag_icons'



function Tag({ name, type }) {
  if (!name) return null;
  console.log(getIcon(type))
  return (
    <div>
      <Chip
        icon={getIcon(type)}
        label={name}
        onDelete={() => alert("delete")}
        variant="outlined"
        color="primary"
      />
    </div>
  );
}

export default Tag;
